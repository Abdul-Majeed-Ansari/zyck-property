import { AreaType } from "@prisma/client";
import validator from "validator";
import { z } from "zod";

export const AddPropertyFormSchema = z.object({
  name: z.string().min(1, "Please Enter The Name"),
  description: z.string().min(2, "Enter the description"),
  DetailId: z
  .string()
  .min(1, "Select the Details for your Type")
  .transform((data: unknown) => Number(data)),
  typeId: z
    .string()
    .min(1, "Select the type of your property")
    .transform((data: unknown) => Number(data)),
  statusId: z
    .string()
    .min(1, "Select the status of your property")
    .transform((data: unknown) => Number(data)),
  price: z
    .string()
    .min(1, "Enter the price")
    .regex(new RegExp("^[0-9]+$"), "Please Enter Number")
    .transform((data: unknown) => Number(data)),
  location: z.object({
    streetAddress: z.string().min(1, "Enter the street address"),
    city: z.string().min(1, "Enter the city name"),
    state: z.string().min(1, "Enter the state name")
  }),
  propertyFeature: z.object({
    bedrooms: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter number of the bedrooms")
      .transform((data: unknown) => Number(data)),
    bathrooms: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter number of the bathrooms")
      .transform((data: unknown) => Number(data)),
    parkingSpots: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter number of the parking spots")
      .transform((data: unknown) => Number(data)),
    area: z
      .string()
      .regex(new RegExp("^[0-9]+$"), "Please enter the area")
      .transform((data: unknown) => Number(data)),
    areaType: z.nativeEnum(AreaType),
    hasSwimmingPool: z.boolean(),
    hasGardenYard: z.boolean(),
    hasBalcony: z.boolean(),
  }),
  contact: z.object({
    name: z.string().min(1, "Please enter the contact name"),
    phone: z.string().refine(validator.isMobilePhone, "Please enter a valid phone number"),
    email: z.string().email(),
  }),
});
export const AddPropertyFormReplicaSchema = z.object({
  name: z.string().min(1, "Please Enter The Name"),
  description: z.string().min(2, "Enter the description"),
  DetailId: z
  .number()
  .min(1, "Select the Details for your Type")
  .transform((data: unknown) => Number(data)),
  typeId: z
    .number()
    .min(1, "Select the type of your property")
    .transform((data: unknown) => Number(data)),
  statusId: z
    .number()
    .min(1, "Select the status of your property")
    .transform((data: unknown) => Number(data)),
  price: z
    .number()
    .min(1, "Enter the price")
    .min(6, "Please Enter Number")
    .transform((data: unknown) => Number(data)),
  location: z.object({
    streetAddress: z.string().min(1, "Enter the street address"),
    city: z.string().min(1, "Enter the city name"),
    state: z.string().min(1, "Enter the state name")
  }),
  propertyFeature: z.object({
    bedrooms: z
      .number()
      .min(1, "Please enter number of the bedrooms")
      .transform((data: unknown) => Number(data)),
    bathrooms: z
      .number()
      .min(1, "Please enter number of the bathrooms")
      .transform((data: unknown) => Number(data)),
    parkingSpots: z
      .number()
      .min(1, "Please enter number of the parking spots")
      .transform((data: unknown) => Number(data)),
    area: z
      .number()
      .min(50, "Please enter the area")
      .transform((data: unknown) => Number(data)),
    areaType: z.nativeEnum(AreaType),
    hasSwimmingPool: z.boolean(),
    hasGardenYard: z.boolean(),
    hasBalcony: z.boolean(),
  }),
  contact: z.object({
    name: z.string().min(1, "Please enter the contact name"),
    phone: z.string().refine(validator.isMobilePhone, "Please enter a valid phone number"),
    email: z.string().email(),
  }),
});
