"use server";

import { AddPropertyFormReplicaSchema } from "@/app/user/properties/add/_components/AddPropertyForm";
import {prisma} from "../prisma";
import { error } from "console";

interface user {
  id: string;
  email: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;
} 
// Custom error class for more specific error handling
class PropertyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PropertyError";
  }
}

interface Property {
  name: string,
  description: string,
  price: number;
  statusId: number;
  typeId: number;
  DetailId: number;
  user:user | null,
}

export async function saveProperty(
  propertyData: AddPropertyFormReplicaSchema,
  imagesUrls: string[],
  user:user | null
) {
  const basic: Omit<Property, "id"> = {
    name: propertyData.name,
    description: propertyData.description,
    price: propertyData.price,
    statusId: propertyData.statusId,
    typeId: propertyData.typeId,
    DetailId: propertyData.DetailId,
    user,
  };

  
  if(!user?.id){
    throw new PropertyError("Unauthorized: User Id not exited");
  }

  const result = await prisma.property.create({
    data: {
      name: basic.name,
      description: basic.description,
      price: basic.price,
      statusId: basic.statusId,
      typeId: basic.typeId,
      DetailId: basic.DetailId,
      userId:user.id,
      location: {
        create: {
          ...propertyData.location,
          city: {
            connect: { id: parseInt(propertyData.location.city) }
          },
          state: {
            connect: { id: parseInt(propertyData.location.state) }
          }
        },
      },
      feature: {
        create: propertyData.propertyFeature,
      },
      contact: {
        create: propertyData.contact,
      },
      images: {
        create: imagesUrls.map((img) => ({
          url: img,
        })),
      },
    },
  });
  return result;
}

export async function editProperty(
  propertyId: number,
  propertyData: AddPropertyFormReplicaSchema,
  newImagesUrls: string[],
  deletedImageIDs: number[]
) {
  const result = await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      name: propertyData.name,
      price: propertyData.price,
      statusId: propertyData.statusId,
      typeId: propertyData.typeId,
      description: propertyData.description,
      DetailId: propertyData.DetailId,
      contact: {
        update: {
          ...propertyData.contact,
        },
      },
      feature: {
        update: {
          ...propertyData.propertyFeature,
        },
      },
      location: {
        update: {
          ...propertyData.location,
          city: {
            connect: { id: parseInt(propertyData.location.city) }
          },
          state: {
            connect: { id: parseInt(propertyData.location.state) }
          }
        },
      },
      images: {
        create: newImagesUrls.map((img) => ({
          url: img,
        })),
        deleteMany: {
          id: { in: deletedImageIDs },
        },
      },
    },
  });

  return result;
}


// export async function getProperty(id: number){
//   const result = await prisma.property.findUnique({
//     where: { id },
//     include: {
//       type : true,
//       images : true,
//       status: true,
//       feature: true,
//     }
//   })
//   return result;
// }
