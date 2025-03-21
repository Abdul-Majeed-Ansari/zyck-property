"use client"

import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import type { AddPropertyFormReplicaSchema } from "./AddPropertyForm"
import type { City, PropertyStatus, PropertyType, PropertyTypeDetail, State } from "@prisma/client"
import { Building2, Earth, MapPin } from "lucide-react"

interface Props {
  className?: string
  statuses: PropertyStatus[]
  types: PropertyType[]
  details: PropertyTypeDetail[]
  cities: City[]
  states: State[]
}

const Location = (props: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useFormContext<AddPropertyFormReplicaSchema>()

  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const selectedState = watch("location.state")

  useEffect(() => {
    const locationData = getValues().location

    if (locationData?.state) {
      const stateId = Number(locationData.state)
      setValue("location.state", stateId.toString())

      const stateCities = props.cities.filter((city) => city.stateId === stateId)
      setFilteredCities(stateCities)

      if (locationData.city) {
        setValue("location.city", locationData.city.toString())
      }
    }
  }, [getValues, props.cities, setValue])

  useEffect(() => {
    if (selectedState) {
      const stateId = Number(selectedState)
      const stateCities = props.cities.filter((city) => city.stateId === stateId)
      setFilteredCities(stateCities)

      const currentCity = getValues().location.city
      const cityExists = stateCities.some((city) => city.id === Number(currentCity))
      if (!cityExists) {
        setValue("location.city", "")
      }
    } else {
      setFilteredCities([])
      setValue("location.city", "")
    }
  }, [selectedState, props.cities, setValue, getValues])

  return (
    <div
      className={`p-6 rounded-lg bg-[#111827] border border-[#1f2937] flex flex-col gap-4 shadow-lg ${props.className}`}
    >
      {/* Province */}
      <div className="relative">
        <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
          <Earth className="w-6 h-6 text-green-500" />
          Which city is your property in?
        </label>
        <select
          {...register("location.state", {
            setValueAs: (value) => (value === "" ? undefined : value.toString()),
          })}
          className={`w-full bg-[#1f2937] text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm ${errors.location?.state ? "border-red-500" : ""}`}
        >
          <option value="" className="text-gray-500">
            Select a Province
          </option>
          {props.states.map((state) => (
            <option key={state.id} value={state.id} className="text-white">
              {state.value}
            </option>
          ))}
        </select>
        {errors.location?.state && <p className="text-sm text-red-400 mt-1">{errors.location.state.message}</p>}
      </div>

      {/* City */}
      <div className="relative">
        <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
          <Building2 className="w-6 h-6 text-green-500" />
          City
        </label>
        <select
          {...register("location.city", {
            setValueAs: (value) => (value === "" ? undefined : value.toString()),
          })}
          className={`w-full bg-[#1f2937] text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm ${errors.location?.city ? "border-red-500" : ""}`}
          disabled={!selectedState}
        >
          <option value="" className="text-gray-500">
            Select a City
          </option>
          {filteredCities.map((city) => (
            <option key={city.id} value={city.id} className="text-white">
              {city.value}
            </option>
          ))}
        </select>
        {errors.location?.city && <p className="text-sm text-red-400 mt-1">{errors.location.city.message}</p>}
      </div>

      {/* Street Address */}
      <div className="relative">
        <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
          <MapPin className="w-6 h-6 text-green-500" />
          Which area is your property in?
        </label>
        <input
          {...register("location.streetAddress")}
          type="text"
          placeholder="Address, block, phase, city, etc."
          className={`w-full bg-[#1f2937] placeholder:text-gray-500 text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm ${errors.location?.streetAddress ? "border-red-500" : ""}`}
        />
        {errors.location?.streetAddress && (
          <p className="text-sm text-red-400 mt-1">{errors.location.streetAddress.message}</p>
        )}
      </div>
    </div>
  )
}

export default Location

