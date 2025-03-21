import React, { useState, useEffect } from "react";
import { Battery, Signal, Wifi } from "lucide-react";

interface PropertyFeature {
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  areaType?: string;
  hasBalcony?: boolean;
  hasSwimmingPool?: boolean;
  hasGardenYard?: boolean;
}

interface FormData {
  name?: string;
  price?: number;
  description?: string;
  propertyFeature?: PropertyFeature;
  typeId?: number;
  DetailId?: number;
  location?: any;
  statusId?: number;
}

interface ImageUrl {
  id: number;
  url: string;
  propertyId: number;
  createdAt: Date | null;
}

interface Props {
  savedImagesUrl: ImageUrl[];
  formData?: FormData;
}

const PreviewCard = ({ savedImagesUrl, formData }: Props) => {
  const images = savedImagesUrl.map((image) => image.url);
  
  // Use provided form data
  const name = formData?.name || "Property title";
  const price = formData?.price || 0;
  const description = formData?.description || "Description comes here";
  const propertyFeature = formData?.propertyFeature;
  const typeId = formData?.typeId;
  const statusId = formData?.statusId;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR" }).format(price);
  };

  // State for dynamic time
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", { 
        hour: "numeric", 
        minute: "2-digit", 
        hour12: true 
      });
      setTime(formattedTime);
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // Get property type label
  const getPropertyTypeLabel = () => {
    switch (typeId) {
      case 1: return "Home";
      case 2: return "Plot";
      case 3: return "Commercial";
      case 4: return "CO Work-Space";
      default: return "Property Type";
    }
  };

  // Get property status label
  const getPropertyStatusLabel = () => {
    switch (statusId) {
      case 1: return "Sell";
      case 2: return "Rent";
      default: return "Status";
    }
  };

  return (
    <div className="w-[300px] h-[550px] bg-black rounded-[40px] shadow-xl overflow-hidden border-8 border-gray-800 relative mx-auto">
      {/* Phone Status Bar */}
      <div className="bg-black h-7 flex items-center justify-between px-5 pt-1">
        <span className="text-white text-xs">{time}</span>
        <div className="flex items-center gap-1">
          <Signal className="w-3.5 h-3.5 text-white" />
          <Wifi className="w-3.5 h-3.5 text-white" />
          <Battery className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-28px)] overflow-y-auto bg-black">
        {/* Property Image */}
        <div className="w-full h-48 bg-gray-900 flex items-center justify-center overflow-hidden">
          {images[0] ? (
            <img src={images[0]} alt="Property" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-500 text-sm">Property Image</div>
          )}
        </div>

        <div className="p-4 space-y-4">
          {/* Price and Tags */}
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-white truncate max-w-[150px]">
              {price ? formatPrice(price) : "Price"}
            </div>
            <div className="flex flex-col gap-1 flex-shrink-0">
              <span className="bg-red-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {getPropertyStatusLabel()}
              </span>
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {getPropertyTypeLabel()}
              </span>
            </div>
          </div>

          {/* Property Title */}
          <h2 className="text-lg font-semibold text-white truncate">{name}</h2>

          {/* Description */}
          <p className="text-sm text-gray-300 line-clamp-3 overflow-hidden">{description}</p>

          {/* Features */}
          {propertyFeature && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Features</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-900 p-2 rounded">
                  <div className="text-sm font-semibold text-white">{propertyFeature.bedrooms || 0}</div>
                  <div className="text-xs text-gray-500">Beds</div>
                </div>
                <div className="bg-gray-900 p-2 rounded">
                  <div className="text-sm font-semibold text-white">{propertyFeature.bathrooms || 0}</div>
                  <div className="text-xs text-gray-500">Baths</div>
                </div>
                <div className="bg-gray-900 p-2 rounded">
                  <div className="text-[11px] font-semibold text-white truncate overflow-hidden">
                    {propertyFeature.area || 0} {propertyFeature.areaType || ""}
                  </div>
                  <div className="text-xs text-gray-500">Area</div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Features */}
          <div className="flex flex-wrap gap-2">
            {propertyFeature?.hasBalcony && (
              <span className="bg-gray-900 text-xs px-2 py-1 rounded text-white">Balcony</span>
            )}
            {propertyFeature?.hasSwimmingPool && (
              <span className="bg-gray-900 text-xs px-2 py-1 rounded text-white">Swimming Pool</span>
            )}
            {propertyFeature?.hasGardenYard && (
              <span className="bg-gray-900 text-xs px-2 py-1 rounded text-white">Garden</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;