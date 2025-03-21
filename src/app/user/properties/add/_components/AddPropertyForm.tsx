"use client"
import { useState } from "react"
import Basic from "./basic"
import {
  AreaType,
  type City,
  type Prisma,
  type PropertyImage,
  type PropertyStatus,
  type PropertyType,
  type PropertyTypeDetail,
  type State,
} from "@prisma/client"
import Location from "./Location"
import Features from "./Features"
import Picture from "./Picture"
import Contact from "./Contact"
import { AddPropertyFormReplicaSchema } from "@/lib/zodSchema"
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { uploadImages } from "@/lib/upload"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { editProperty, saveProperty } from "@/lib/actions/property"
import Loader from "@/components/ui/loader"
import type { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { removeLocalStorageItem } from "@/lib/localStorage"
import { propertiesDataLocalStorage } from "@/lib/constant"
import PreviewCard from "./Stepper"
import type { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  details: PropertyTypeDetail[]
  city: City[]
  state: State[]
  types: PropertyType[]
  statuses: PropertyStatus[]
  property?: Prisma.PropertyGetPayload<{
    include: {
      location: true
      feature: true
      contact: true
      images: true
    }
  }>
  isEdit?: boolean
}

export type AddPropertyFormReplicaSchema = z.infer<typeof AddPropertyFormReplicaSchema>

const AddPropertyForm = ({ isEdit = false, ...props }: Props) => {
  const router = useRouter()
  const methods = useForm<AddPropertyFormReplicaSchema>({
    resolver: zodResolver(AddPropertyFormReplicaSchema),
    defaultValues: {
      contact: props.property?.contact ?? {
        name: "",
        phone: "",
        email: "",
      },
      location: props.property?.location
        ? {
          state: props.property.location.stateId.toString(),
          city: props.property.location.cityId.toString(),
          streetAddress: props.property.location.streetAddress,
        }
        : undefined,
      name: props.property?.name ?? "",
      price: props.property?.price ?? 0,
      description: props.property?.description ?? "",
      propertyFeature: props.property?.feature ?? {
        hasBalcony: false,
        hasSwimmingPool: false,
        hasGardenYard: false,
        bedrooms: 1,
        bathrooms: 1,
        parkingSpots: 1,
        area: 1,
        areaType: AreaType.SQUARE_METER,
      },
      statusId: props.property?.statusId ?? undefined,
      typeId: props.property?.typeId ?? undefined,
      DetailId: props.property?.DetailId ?? undefined,
    },
  })

  const userDetails = useSelector((state: RootState) => state.auth)
  const { user } = useKindeBrowserClient()

  const [images, setImages] = useState<File[]>([])
  const [savedImagesUrl, setSavedImagesUrl] = useState<PropertyImage[]>(props.property?.images ?? [])
  const [isLoading, setIsLoading] = useState(false)

  const onsubmit: SubmitHandler<AddPropertyFormReplicaSchema> = async (data) => {
    setIsLoading(true)
    const imageUrls = await uploadImages(images)

    try {
      if (isEdit && props.property) {
        const deleteImagesIDs = props.property?.images
          .filter((item) => !savedImagesUrl.includes(item))
          .map((item) => item.id)
        await editProperty(props.property.id, data, imageUrls, deleteImagesIDs)
        removeLocalStorageItem(propertiesDataLocalStorage)
        toast.success("Property updated successfully")
      } else {
        await saveProperty(data, imageUrls, user)
        toast.success("Property added successfully")
      }
      router.push("/user/properties")
      removeLocalStorageItem(propertiesDataLocalStorage)
    } catch (error) {
      console.error("Error saving property:", error)
      toast.error("Failed to add property. Please try again.")
    } finally {
      setIsLoading(false)
      removeLocalStorageItem(propertiesDataLocalStorage)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">
            {isEdit ? "Edit Property" : "Add Property"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FormProvider {...methods}>
                <form
                  className="space-y-8"
                  onSubmit={methods.handleSubmit(onsubmit, (error) => console.log({ error }))}
                >
                  {isLoading && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                      <Loader />
                    </div>
                  )}
                  <div className="space-y-6">
                    <Card className="bg-black border-gray-700">
                      <CardContent className="pt-6">
                        <Features />
                      </CardContent>
                    </Card>
                    <Card className="bg-black border-gray-700">
                      <CardContent className="pt-6">
                        <Basic
                          cities={props.city}
                          states={props.state}
                          statuses={props.statuses}
                          types={props.types}
                          details={props.details}
                        />
                      </CardContent>
                    </Card>
                    <Card className="bg-black border-gray-700">
                      <CardContent className="pt-6">
                        <Location
                          cities={props.city}
                          states={props.state}
                          statuses={props.statuses}
                          types={props.types}
                          details={props.details}
                        />
                      </CardContent>
                    </Card>
                    <Card className="bg-black border-gray-700">
                      <CardContent className="pt-6">
                        <Picture
                          {...(props.property && {
                            savedImagesUrl: savedImagesUrl,
                            setSavedImagesUrl: setSavedImagesUrl,
                          })}
                          images={images}
                          setImages={setImages}
                        />
                      </CardContent>
                    </Card>
                    <Card className="bg-black border-gray-700">
                      <CardContent className="pt-6">
                        <Contact />
                      </CardContent>
                    </Card>
                  </div>
                </form>
              </FormProvider>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Card className="bg-black border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-white">Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PreviewCard
                      savedImagesUrl={savedImagesUrl}
                      formData={{
                        name: methods.watch("name"),
                        price: methods.watch("price"),
                        description: methods.watch("description"),
                        propertyFeature: methods.watch("propertyFeature"),
                        typeId: methods.watch("typeId"),
                        DetailId: methods.watch("DetailId"),
                        location: methods.watch("location"),
                        statusId: methods.watch("statusId")
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddPropertyForm

