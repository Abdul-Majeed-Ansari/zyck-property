import React from "react";
import AddPropertyForm from "./_components/AddPropertyForm";
import { prisma } from "@/lib/prisma";

const AddPropertyPage = async () => {
  const [propertyTypes, propertyStatuses, propertyTypeDetail, Cites, State] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
    prisma.propertyTypeDetail.findMany(),
    prisma.city.findMany(),
    prisma.state.findMany(),
  ]);

  console.log("property");



  return <div>
    <div className="bg-green-500 flex justify-between items-center p-2">
      <h2 className="text-white text-xl font-semibold px-2">User Properties</h2>
    </div>
    <AddPropertyForm state={State} city={Cites} types={propertyTypes} statuses={propertyStatuses} details={propertyTypeDetail} />
  </div>;
};

export default AddPropertyPage;
