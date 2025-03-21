import React, { useState, useEffect } from "react";
import { City, PropertyStatus, PropertyType, PropertyTypeDetail, State } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useFormContext } from "react-hook-form";
import { AddPropertyFormReplicaSchema } from "./AddPropertyForm";
import clsx from "clsx";
import { BadgeCheck, Building, CheckCircle, Home } from 'lucide-react';

interface Props {
  className?: string;
  statuses: PropertyStatus[];
  types: PropertyType[];
  details: PropertyTypeDetail[];
  cities: City[];
  states: State[];
}

const Basic = (props: Props) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
  } = useFormContext<AddPropertyFormReplicaSchema>();

  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  // Watch the selected values
  const selectedTypeId = watch("typeId");
  const selectedStatus = watch("statusId");
  const selectedDetailId = watch('DetailId');

  const typeId = Number(selectedTypeId);

  // Filter details based on the selected typeId
  const filteredDetails = props.details.filter(
    (detail) => detail.propertyTypeId === typeId
  );

  const selectedStateId = watch("location.state");
  const stateType = Number(selectedStateId);

  // Update cities whenever the state changes
  useEffect(() => {
    if (stateType) {
      setFilteredCities(props.cities.filter((item) => item.stateId === stateType));
    }
  }, [stateType, props.cities]);

  return (
    <div className={clsx("p-6 rounded-lg bg-[#111827] border border-[#1f2937] flex flex-col gap-4 shadow-lg", props.className)}>
      {/* Type Input */}
      <div className="relative mb-2 border-b border-[#374151] pb-4">
        <span className="flex items-center gap-2 text-base font-medium text-green-400 mb-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          Property Type
        </span>

        {/* Status Select */}
        <div className="mt-3 mb-2">
          <select 
            {...register("statusId", {
              setValueAs: (value) => value === "" ? undefined : Number(value)
            })}
            className="w-full bg-[#1f2937] text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm"
          > 
            <option value="" className="text-gray-500">Select Status</option>
            {props.statuses?.map((item) => (
              <option key={item.id} value={item.id} className="text-white">
                {item.value === "Sell" ? "🏠 Sell" : "🌐 Rent"}
              </option>
            ))}
          </select>
          {errors.statusId && (
            <p className="text-sm text-red-400 mt-1">{errors.statusId?.message}</p>
          )}
        </div>
      </div>

      {/* Property Type Input */}
      <div className="relative mb-2 w-full border-b border-[#374151] pb-4">
        <span className="flex items-center gap-2 text-base font-medium text-green-400 mb-3">
          <Building className="w-6 h-6 text-green-500" />
          Property Details
        </span>

        {/* Property Type Select */}
        <div className="mt-3 mb-2">
          <select 
            {...register("typeId", {
              setValueAs: (value) => value === "" ? undefined : Number(value)
            })}
            className="w-full bg-[#1f2937] text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm"
          >
            <option value="" className="text-gray-500">Select Property Type</option>
            {props.types?.map((item) => (
              <option key={item.id} value={item.id} className="text-white">
                {item.value === "Home" ? "🏠 Home" : 
                 item.value === "Plots" ? "🌐 Plot" : 
                 item.value === "Commercial" ? "🏢 Commercial" : 
                 "🏢 CO-Work Space"}
              </option>
            ))}
          </select>
          {errors.typeId && (
            <p className="text-sm text-red-400 mt-1">{errors.typeId?.message}</p>
          )}
        </div>
      </div>

      {/* Property Details Input */}
      <div className="relative mb-2 w-full">
        {filteredDetails.length > 0 && (
          <div className="w-full">
            <select 
              {...register("DetailId", {
                setValueAs: (value) => value === "" ? undefined : Number(value)
              })}
              className="w-full bg-[#1f2937] text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm"
            >
              <option value="" className="text-gray-500">Select Property Details</option>
              {filteredDetails.map((item) => (
                <option key={item.id} value={item.id} className="text-white">
                  {item.value}
                </option>
              ))}
            </select>
            {errors.DetailId && (
              <p className="text-sm text-red-400 mt-1">{errors.DetailId?.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Basic;
