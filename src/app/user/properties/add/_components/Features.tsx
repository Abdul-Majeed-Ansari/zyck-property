import type React from "react"
import { useFormContext } from "react-hook-form"
import type { AddPropertyFormReplicaSchema } from "./AddPropertyForm"
import { Bed, Bath, Car, AreaChartIcon as ChartArea, Home } from "lucide-react"
import { AreaType } from "@prisma/client"
import { MdDescription } from "react-icons/md"
import { HiCurrencyRupee } from "react-icons/hi2"

const Features = () => {
  const {
    register,
    formState: { errors },
    watch,
    getValues,
  } = useFormContext<AddPropertyFormReplicaSchema>()

  const defaultValues = getValues()

  const price = watch("price")
  const formatPriceWithCommas = (price: number | null | undefined): string => {
    if (price === null || price === undefined) return ""
    return new Intl.NumberFormat("en-US").format(price)
  }

  const numberToWords = (num: number): string => {
    const units = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ]
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
    const scales = ["", "Thousand", "Lakh", "Crore"]
    const scaleValues = [1, 1000, 100000, 10000000] // Corresponds to "", Thousand, Lakh, Crore

    const getWords = (n: number, index = 0): string => {
      if (n === 0) return ""

      if (n < 20) return units[n] + (scales[index] && index > 0 ? ` ${scales[index]}` : "")

      if (n < 100) {
        const rem = n % 10
        return (
          tens[Math.floor(n / 10)] +
          (rem ? ` ${units[rem]}` : "") +
          (scales[index] && index > 0 ? ` ${scales[index]}` : "")
        )
      }

      if (n < 1000) {
        const rem = n % 100
        return (
          units[Math.floor(n / 100)] +
          " Hundred" +
          (rem ? ` ${getWords(rem)}` : "") +
          (scales[index] && index > 0 ? ` ${scales[index]}` : "")
        )
      }

      for (let i = scales.length - 1; i >= 0; i--) {
        const scaleValue = scaleValues[i]
        if (n >= scaleValue) {
          const quotient = Math.floor(n / scaleValue)
          const remainder = n % scaleValue
          return getWords(quotient, i) + (remainder ? ` ${getWords(remainder)}` : "")
        }
      }
      return ""
    }

    return getWords(num).trim()
  }

  const formatChequeAmount = (price: number): string => {
    if (!price) return ""

    const formattedPrice = formatPriceWithCommas(price)
    const priceInWords = numberToWords(price)

    return `RS ${formattedPrice}\n(${priceInWords} Rupees Only)`
  }

  const enterPriceValue = formatChequeAmount(price)

  const generateSelectOptions = (count = 10, startFrom = 0) => {
    return Array.from({ length: count }, (_, i) => i + startFrom).map((value) => (
      <option key={value} value={value} className="text-white">
        {value}
      </option>
    ))
  }

  return (
    <div className="p-6 rounded-lg bg-[#111827] border border-[#1f2937] flex flex-col gap-4 shadow-lg">
      {/* Property Name */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
          <Home className="w-6 h-6 text-green-500" />
          Property
        </label>
        <input
          {...register("name")}
          defaultValue={getValues().name}
          id="name"
          placeholder="Enter Your Title"
          className={`peer w-full bg-[#1f2937] placeholder:text-gray-500 text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name?.message}</p>}
      </div>

      {/* Price */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
          <HiCurrencyRupee className="w-6 h-6 text-green-500" />
          Price in Rupees
        </label>
        <input
          {...register("price", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          defaultValue={Number(getValues().price)}
          id="price"
          type="number"
          placeholder="Enter Your Price"
          className={`peer w-full bg-[#1f2937] placeholder:text-gray-500 text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm ${errors.price ? "border-red-500" : ""}`}
        />
        {enterPriceValue && <p className="text-sm mt-1 text-green-400 font-medium">{enterPriceValue}</p>}
        {errors.price && <p className="text-sm text-red-400 mt-1">{errors.price?.message}</p>}
      </div>

      {/* Description */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
          <MdDescription className="w-6 h-6 text-green-500" />
          Description
        </label>
        <textarea
          {...register("description")}
          defaultValue={getValues().description}
          id="description"
          placeholder="Enter Your Description"
          rows={4}
          onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            e.target.style.height = "auto"
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          className={`peer w-full bg-[#1f2937] placeholder:text-gray-500 text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm min-h-[100px] ${errors.description ? "border-red-500" : ""}`}
        />
        {errors.description && <p className="text-sm text-red-400 mt-1">{errors.description?.message}</p>}
      </div>

      {/* Bedrooms */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
          <Bed className="w-6 h-6 text-green-500" />
          Bedrooms
        </label>
        <select
          {...register("propertyFeature.bedrooms", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          defaultValue={defaultValues?.propertyFeature?.bedrooms || 1}
          className="w-full bg-[#1f2937] text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm"
        >
          {generateSelectOptions(10)}
        </select>
        {errors.propertyFeature?.bedrooms && (
          <p className="text-red-400 mt-1">{errors.propertyFeature?.bedrooms?.message}</p>
        )}
      </div>

      {/* Bathrooms */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
          <Bath className="w-6 h-6 text-green-500" />
          Bathrooms
        </label>
        <select
          {...register("propertyFeature.bathrooms", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          defaultValue={defaultValues?.propertyFeature?.bathrooms || 1}
          className="w-full bg-[#1f2937] text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm"
        >
          {generateSelectOptions(10)}
        </select>
        {errors.propertyFeature?.bathrooms && (
          <p className="text-red-400 mt-1">{errors.propertyFeature?.bathrooms?.message}</p>
        )}
      </div>

      {/* Parking Spots */}
      <div className="input-group">
        <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
          <Car className="w-6 h-6 text-green-500" />
          Parking Spots
        </label>
        <select
          {...register("propertyFeature.parkingSpots", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          defaultValue={defaultValues?.propertyFeature?.parkingSpots || 1}
          className="w-full bg-[#1f2937] text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm"
        >
          {generateSelectOptions(10)}
        </select>
        {errors.propertyFeature?.parkingSpots && (
          <p className="text-red-400 mt-1">{errors.propertyFeature?.parkingSpots?.message}</p>
        )}
      </div>

      {/* Area */}
      <label className="flex items-center text-base font-medium text-green-400 mb-2">
        <ChartArea className="text-green-500" />
        Area In SQ/F
      </label>
      <div className="w-full flex items-center justify-start mt-2 gap-3">
        <div className="w-full">
          <input
            {...register("propertyFeature.area", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            id="contact-name"
            defaultValue={getValues("propertyFeature.area")}
            placeholder="Area"
            type="number"
            className={`peer w-full bg-[#1f2937] placeholder:text-gray-500 text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm ${errors.contact?.name ? "border-red-500" : ""}`}
          />
        </div>
        <div className="">
          <select
            {...register("propertyFeature.areaType")}
            defaultValue={getValues().propertyFeature.areaType}
            id="state"
            className={`peer w-full bg-white hover:bg-green-700 text-white text-sm border border-[#374151] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm ${errors.propertyFeature?.areaType ? "border-red-500" : ""}`}
          >
            <option className="text-white hover:bg-green-700" key={1} value={AreaType.SQUARE_METER}>
              Square Meter
            </option>
            <option className="text-white" key={2} value={AreaType.SQUARE_FEET}>
              Square Feet
            </option>
            <option className="text-white" key={3} value={AreaType.SQUARE_YARD}>
              Square Yard
            </option>
            <option className="text-white" key={4} value={AreaType.MARLA}>
              Marla
            </option>
            <option className="text-white" key={5} value={AreaType.KANAL}>
              Kanal
            </option>
          </select>
          {errors.location?.state && <p className="text-sm text-red-500">{errors.location?.state?.message}</p>}
        </div>
      </div>
      {errors.propertyFeature?.area && <p className="text-red-400 mt-1">{errors.propertyFeature?.area?.message}</p>}

      {/* Checkboxes for additional features */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center bg-[#1f2937] p-3 rounded-md border border-[#374151] hover:border-[#4b5563] transition-colors">
          <input
            type="checkbox"
            {...register("propertyFeature.hasSwimmingPool")}
            defaultChecked={defaultValues?.propertyFeature?.hasSwimmingPool}
            id="hasSwimmingPool"
          />
          <label htmlFor="hasSwimmingPool" className="ml-2 text-white">
            Has Swimming Pool
          </label>
        </div>

        <div className="flex items-center bg-[#1f2937] p-3 rounded-md border border-[#374151] hover:border-[#4b5563] transition-colors">
          <input
            type="checkbox"
            {...register("propertyFeature.hasGardenYard")}
            defaultChecked={defaultValues?.propertyFeature?.hasGardenYard}
            id="hasGardenYard"
          />
          <label htmlFor="hasGardenYard" className="ml-2 text-white">
            Has Garden/Yard
          </label>
        </div>

        <div className="flex items-center bg-[#1f2937] p-3 rounded-md border border-[#374151] hover:border-[#4b5563] transition-colors">
          <input
            type="checkbox"
            {...register("propertyFeature.hasBalcony")}
            defaultChecked={defaultValues?.propertyFeature?.hasBalcony}
            id="hasBalcony"
          />
          <label htmlFor="hasBalcony" className="ml-2 text-white">
            Has Balcony/Patio
          </label>
        </div>
      </div>
    </div>
  )
}

export default Features

