interface Contact {
  email: string;
  name: string;
  phone: string;
}

interface Features {
  area: number;
  bathrooms: number;
  bedrooms: number;
  hasBalcony: boolean;
  hasGarage: boolean;
  hasGarden: boolean;
  hasPool: boolean;
  hasGardenYard: boolean;
  hasSwimmingPool: boolean;
  parkingSpots: number;
  propertyId: number;
}

interface Images {
  id: number;
  url: string;
  propertyId: number;
}

interface Location {
  city: {
    id: number;
    value: string;
    stateId: number;
  };
  stateId: number;
}

export interface Property {
  price: string;
  description: string;
  name: string;
  feature: Features;
  status: {
    value: string;
  };
  type: {
    value: string;
  };
  images: Images[];
  location: Location;
  contact: Contact;
}
