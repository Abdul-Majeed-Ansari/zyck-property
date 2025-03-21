"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import type { Property } from "@/lib/type"
import Loader from "@/components/ui/loader"
import PropertyCardsecond from "@/components/views/secondPropertyCard"
import { X, Filter, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortOption, setSortOption] = useState<string>("priceLowToHigh")
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // State for additional filters
  const [bedrooms, setBedrooms] = useState<number>(0)
  const [bathrooms, setBathrooms] = useState<number>(0)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000])
  const [maxPrice, setMaxPrice] = useState<number>(1000000)

  // New state for city filtering
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])

  // New state for property type filtering
  const [propertyTypes, setPropertyTypes] = useState<string[]>([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/properties/list?statusProperty=ACCEPTED")
        if (!response.ok) {
          throw new Error(`Error fetching properties`)
        }
        const data = await response.json()
        setProperties(data)

        // Find the highest price to set as max for the slider
        if (data.length > 0) {
          const highestPrice = Math.max(...data.map((p: any) => Number(p.price)))
          setMaxPrice(highestPrice > 0 ? highestPrice : 1000000)
          setPriceRange([0, highestPrice > 0 ? highestPrice : 1000000])

          // Extract unique cities from the data
          const cities = [...new Set(data.map((p: any) => p.location.city.value))] as string[]
          setAvailableCities(cities.sort())

          // Extract unique property types
          const types = [...new Set(data.map((p: any) => p.type.value))] as string[]
          setPropertyTypes(types.sort())
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSearch = () => {
    // This function could be used to trigger API-based filtering if needed
    console.log("Search term:", searchTerm)
    console.log("Sort by:", sortOption)
    console.log("Bedrooms:", bedrooms)
    console.log("Bathrooms:", bathrooms)
    console.log("Price Range:", priceRange)
    console.log("Selected Cities:", selectedCities)
    console.log("Selected Property Types:", selectedPropertyTypes)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSortOption("priceLowToHigh")
    setBedrooms(0)
    setBathrooms(0)
    setPriceRange([0, maxPrice])
    setSelectedCities([])
    setSelectedPropertyTypes([])
  }

  const toggleCity = (city: string) => {
    setSelectedCities((prev) => (prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]))
  }

  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const filteredProperties = properties
    .filter((property) => {
      // Text search filter (name or city)
      const status = property.status.value === "Rent"
      const nameMatch = property.name.toLowerCase().includes(searchTerm.toLowerCase())
      const cityMatch = property.location.city.value.toLowerCase().includes(searchTerm.toLowerCase())
      const textMatch = nameMatch || cityMatch

      // Bedrooms and bathrooms filters
      const bedroomsMatch = bedrooms === 0 || property.feature.bedrooms >= bedrooms
      const bathroomsMatch = bathrooms === 0 || property.feature.bathrooms >= bathrooms

      // Price range filter
      const propertyPrice = Number(property.price)
      const priceMatch = propertyPrice >= priceRange[0] && propertyPrice <= priceRange[1]

      // City filter
      const cityFilterMatch = selectedCities.length === 0 || selectedCities.includes(property.location.city.value)

      // Property type filter
      const typeFilterMatch = selectedPropertyTypes.length === 0 || selectedPropertyTypes.includes(property.type.value)

      // All filters must match
      return status && textMatch && bedroomsMatch && bathroomsMatch && priceMatch && cityFilterMatch && typeFilterMatch
    })
    .sort((a, b) => {
      if (sortOption === "priceLowToHigh") {
        return Number(a.price) - Number(b.price)
      }
      if (sortOption === "priceHighToLow") {
        return Number(b.price) - Number(a.price)
      }
      return 0
    })

  const activeFilterCount = [
    bedrooms > 0,
    bathrooms > 0,
    priceRange[0] > 0 || priceRange[1] < maxPrice,
    selectedCities.length > 0,
    selectedPropertyTypes.length > 0,
  ].filter(Boolean).length

  return (
    <>
      <div className="relative w-full min-h-[280px] flex items-center bg-gradient-to-r from-emerald-500 to-rose-50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 w-full h-full">
          {/* Diamond */}
          <div className="absolute top-10 left-10 w-16 h-16 bg-emerald-200/20 rotate-45" />

          {/* Circle */}
          <div className="absolute top-40 right-20 w-20 h-20 rounded-full border-2 border-emerald-200/20" />

          {/* Dots pattern */}
          <div className="absolute bottom-10 left-1/4 w-40 h-40">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-emerald-200/30"
                style={{
                  top: `${Math.floor(i / 4) * 20}px`,
                  left: `${(i % 4) * 20}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative w-full px-[10%] py-[3%]">
          <div className="max-w-4xl">
            <div className="text-sm text-slate-600 mb-2">ZYCK Property &gt; Properties for Rent</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-600 sm:leading-tight">Properties on Rent</h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
              Your Trusted Platform for Buying, Renting, and Selling Properties in Pakistan – ZYCK Property."
            </p>
          </div>
        </div>

        {/* Right side decorative elements */}
        <div className="absolute right-0 top-0 h-full w-1/3">
          <div className="relative h-full w-full">
            <div className="absolute right-10 top-20 w-32 h-32 opacity-20">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-emerald-400">
                <path
                  d="M9 12l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="absolute right-20 bottom-20 w-40 h-40 opacity-20">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-emerald-400">
                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter toggle */}
      <div className="md:hidden sticky top-0 z-10  p-4 border-b flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        <div className="text-sm text-muted-foreground">
          {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"}
        </div>
      </div>

      <div className="mt-5 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div
          className={`
          md:w-1/4 w-full p-3 space-y-4 rounded-lg
          ${showMobileFilters ? "block" : "hidden md:block"}
          md:sticky md:top-4 md:h-[calc(100vh-2rem)] md:overflow-auto
        `}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3 mr-1" /> Reset
            </Button>
          </div>

          <Input
            placeholder="Search by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-full p-2 border border-gray-300 rounded">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Accordion type="multiple" defaultValue={["cities", "bedrooms", "price"]}>
            {/* City filter */}
            <AccordionItem value="cities">
              <AccordionTrigger className="text-sm font-medium py-2">
                Cities {selectedCities.length > 0 && `(${selectedCities.length})`}
              </AccordionTrigger>
              <AccordionContent>
                <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                  {availableCities.map((city) => (
                    <div key={city} className="flex items-center space-x-2">
                      <Checkbox
                        id={`city-${city}`}
                        checked={selectedCities.includes(city)}
                        onCheckedChange={() => toggleCity(city)}
                      />
                      <label htmlFor={`city-${city}`} className="text-sm flex items-center cursor-pointer">
                        <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                        {city}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Property type filter */}
            <AccordionItem value="propertyTypes">
              <AccordionTrigger className="text-sm font-medium py-2">
                Property Types {selectedPropertyTypes.length > 0 && `(${selectedPropertyTypes.length})`}
              </AccordionTrigger>
              <AccordionContent>
                <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                  {propertyTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedPropertyTypes.includes(type)}
                        onCheckedChange={() => togglePropertyType(type)}
                      />
                      <label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Bedrooms filter */}
            <AccordionItem value="bedrooms">
              <AccordionTrigger className="text-sm font-medium py-2">
                Bedrooms {bedrooms > 0 && `(${bedrooms}+)`}
              </AccordionTrigger>
              <AccordionContent>
                <Select value={bedrooms.toString()} onValueChange={(value) => setBedrooms(Number(value))}>
                  <SelectTrigger className="w-full p-2 border border-gray-300 rounded">
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            {/* Bathrooms filter */}
            <AccordionItem value="bathrooms">
              <AccordionTrigger className="text-sm font-medium py-2">
                Bathrooms {bathrooms > 0 && `(${bathrooms}+)`}
              </AccordionTrigger>
              <AccordionContent>
                <Select value={bathrooms.toString()} onValueChange={(value) => setBathrooms(Number(value))}>
                  <SelectTrigger className="w-full p-2 border border-gray-300 rounded">
                    <SelectValue placeholder="Bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            {/* Price range filter */}
            <AccordionItem value="price">
              <AccordionTrigger className="text-sm font-medium py-2">Price Range</AccordionTrigger>
              <AccordionContent>
                <Slider
                  min={0}
                  max={maxPrice}
                  step={1000}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mt-2"
                />
                <div className="flex justify-between mt-2 text-sm">
                  <span>Rs {priceRange[0].toLocaleString()}</span>
                  <span>Rs {priceRange[1].toLocaleString()}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="pt-4 flex gap-2">
            <Button onClick={handleSearch} className="flex-1 text-white">
              Apply Filters
            </Button>

            <Button variant="outline" onClick={() => setShowMobileFilters(false)} className="md:hidden">
              Close
            </Button>
          </div>

          {/* Active filters */}
          {activeFilterCount > 0 && (
            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2">Active Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {bedrooms > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {bedrooms}+ Bedrooms
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setBedrooms(0)} />
                  </Badge>
                )}

                {bathrooms > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {bathrooms}+ Bathrooms
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setBathrooms(0)} />
                  </Badge>
                )}

                {selectedCities.map((city) => (
                  <Badge key={city} variant="secondary" className="flex items-center gap-1">
                    {city}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCity(city)} />
                  </Badge>
                ))}

                {selectedPropertyTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="flex items-center gap-1">
                    {type}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => togglePropertyType(type)} />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Property Listings */}
        <div className="md:w-3/4 w-full p-6 border-l-2">
          <div className="hidden md:flex justify-between items-center md:px-10 py-4">
            <h1 className="text-2xl text-primary">Listing Results</h1>
            <p className="text-sm text-muted-foreground">
              {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property, index) => (
                  <PropertyCardsecond
                    key={index}
                    image={property.images[0]?.url || "/Peshawar.jpg"}
                    title={property.name}
                    price={property.price}
                    location={property.location}
                    status={property.status.value}
                    features={property.feature}
                    onContact={property.contact}
                    id={property.feature.propertyId}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-lg font-medium">No properties match your filters</p>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                  <Button variant="outline" onClick={resetFilters} className="mt-4">
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

