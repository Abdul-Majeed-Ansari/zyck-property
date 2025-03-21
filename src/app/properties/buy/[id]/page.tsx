"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Car, Ruler, Mail, Phone, X, Heart, Share2, CheckCircle, MapPin, User } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import React from "react"
import type { AreaType } from "@prisma/client"
import { unitAbbreviations } from "@/lib/constant"
import SkeletonOpenProperty from "@/components/custom/skeleton/skeletonOpenPorperty"
interface Contact {
  email: string
  name: string
  phone: string
}

interface Features {
  area: number
  bathrooms: number
  bedrooms: number
  hasBalcony: boolean
  hasGarage: boolean
  hasGarden: boolean
  hasPool: boolean
  hasGardenYard: boolean
  hasSwimmingPool: boolean
  parkingSpots: number
  propertyId: number
  areaType: AreaType
}

interface Images {
  id: number
  url: string
  propertyId: number
}

interface Location {
  city: string
  stateId: number
}

export interface Property {
  price: string
  description: string
  name: string
  feature: Features
  status: {
    value: string
  }
  type: {
    value: string
  }
  images: Images[]
  location: Location
  contact: Contact
}

async function fetchProperty(id: string): Promise<Property> {
  const response = await fetch(`/api/properties/${id}`)
  if (!response.ok) {
    if (response.status === 404) throw new Error("Property not found")
    throw new Error("An error occurred while fetching the property")
  }
  return response.json()
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { id } = React.use(params)
  const [property, setProperty] = useState<Property | null>(null)
  const [error, setError] = useState<string | null>(null)

  function formatPhoneNumber(phone: string): string {
    const formatted = phone.replace(/^0/, "+92")
    return formatted.replace(/(\+92)(\d{3})(\d{4})(\d{3})/, "$1 $2 $3 $4")
  }
  console.log(property?.location.city, "city")

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-PK", {
      maximumFractionDigits: 0,
    }).format(price)
  }

  useEffect(() => {
    if (id) {
      fetchProperty(id)
        .then(setProperty)
        .catch((err) => setError(err.message || "Something went wrong"))
    }
  }, [id])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Error</h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="">
        <SkeletonOpenProperty />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <span>Properties</span>
          <span>/</span>
          <span>{property.location.city}</span>
          <span>/</span>
          <span className="text-emerald-500">{property.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
              <div className="relative aspect-[16/9]">
                <Image
                  src={property.images[activeImageIndex]?.url || "/placeholder.svg"}
                  alt={property.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 grid grid-cols-5 gap-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 
                      ${activeImageIndex === index ? "border-emerald-500" : "border-gray-700"}`}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={`View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex gap-2 mb-3">
                    <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">{property.status.value}</Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {property.type.value}
                    </Badge>
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">{property.name}</h1>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.location.city}, pakistan</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-emerald-500">PKR {formatPrice(Number(property.price))}</p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-700">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-gray-400">Bedrooms</p>
                    <p className="font-semibold text-white">{property.feature.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-gray-400">Bathrooms</p>
                    <p className="font-semibold text-white">{property.feature.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-gray-400">Area</p>
                    <p className="font-semibold text-white">
                      {property.feature.area}{" "}
                      {unitAbbreviations[property.feature.areaType] || property.feature.areaType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-gray-400">Parking</p>
                    <p className="font-semibold text-white">{property.feature.parkingSpots}</p>
                  </div>
                </div>
              </div>

              {/* Additional Features */}
              <div className="py-6">
                <h2 className="text-lg font-semibold mb-4 text-white">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {property.feature.hasBalcony && (
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      Balcony
                    </Badge>
                  )}
                  {property.feature.hasGarage && (
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      Garage
                    </Badge>
                  )}
                  {property.feature.hasSwimmingPool && (
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      Swimming Pool
                    </Badge>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="py-6 border-t border-gray-700">
                <h2 className="text-lg font-semibold mb-4 text-white">Description</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 sticky top-6">
              <div className="flex items-center  gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500">
                  <User />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{property.contact.name}</h3>
                  <p className="text-sm text-gray-400">{property.status.value} </p>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
              onClick={() => setIsModalOpen(false)}
            />

            <div className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-gray-700">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-xl font-semibold leading-6 text-white mb-4">Contact Information</h3>

                  <div className="mt-2 space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
                      <Phone className="h-5 w-5 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="font-medium text-white">{formatPhoneNumber(property.contact.phone)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
                      <Mail className="h-5 w-5 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="font-medium text-white">{property.contact.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-emerald-900/50 rounded-lg border border-emerald-500/20">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <div>
                        <p className="text-sm text-emerald-300">Verified Agent</p>
                        <p className="text-xs text-emerald-400">Response time: Within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

