import React from "react";
import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { useFormContext } from "react-hook-form";
import { AddPropertyFormReplicaSchema } from "./AddPropertyForm";
import { Mail, Phone, User } from 'lucide-react';

interface Props {
  // prev: () => void;
  className?: string;
}

const Contact: React.FC<Props> = ({ className }) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<AddPropertyFormReplicaSchema>();

  return (
    <div className={`w-full max-w-[1200px] mx-auto ${className || ""}`}>
      <div className="p-6 rounded-lg bg-[#111827] border border-[#1f2937] flex flex-col gap-4 shadow-lg">
        {/* Contact Name */}
        <div className="relative">
          <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
            <User className="w-6 h-6 text-green-500" />
            Contact Name
          </label>
          <input
            {...register("contact.name")}
            id="contact-name"
            defaultValue={getValues("contact.name")}
            placeholder="Contact Name"
            className={`peer w-full bg-[#1f2937] placeholder:text-gray-500 text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm ${
              errors.contact?.name ? "border-red-500" : ""
            }`}
          />
        
          {errors.contact?.name && (
            <div className="text-red-400 text-sm mt-1">{errors.contact.name.message}</div>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
          <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
            <Phone className="w-6 h-6 text-green-500" />
            Phone
          </label>
          <input
            {...register("contact.phone")}
            id="contact-phone"
            defaultValue={getValues("contact.phone")}
            placeholder="Phone"
            className={`peer w-full bg-[#1f2937] placeholder:text-gray-500 text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm ${
              errors.contact?.phone ? "border-red-500" : ""
            }`}
          />
          
          {errors.contact?.phone && (
            <div className="text-red-400 text-sm mt-1">{errors.contact.phone.message}</div>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <label className="flex items-center gap-2 text-base font-medium text-green-400 mb-2">
            <Mail className="w-6 h-6 text-green-500" />
            Email
          </label>
          <input
            {...register("contact.email")}
            id="contact-email"
            type="email"
            defaultValue={getValues("contact.email")}
            placeholder="Email"
            className={`peer w-full bg-[#1f2937] placeholder:text-gray-500 text-white text-sm border border-[#374151] rounded-md px-3 py-2.5 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-[#4b5563] shadow-sm ${
              errors.contact?.email ? "border-red-500" : ""
            }`}
          />
          
          {errors.contact?.email && (
            <div className="text-red-400 text-sm mt-1">{errors.contact.email.message}</div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-green-500 text-white rounded-md py-3 px-4 flex items-center justify-center gap-2 transition-colors hover:bg-green-600 font-medium"
        >
          <PlusCircleIcon className="w-5 h-5" />
          <span>Save Property</span>
        </button>
      </div>
    </div>
  );
};

export default Contact;
