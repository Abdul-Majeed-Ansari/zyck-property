

const BgShadow  = "box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;"
// const propertiesDataLocalStorage = "propertiesData"
const province  = ["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan", "Gilgit-Baltistan"];
const unitAbbreviations: Record<string, string> = {
    SQUARE_METER: "Sq M",
    SQUARE_FEET: "Sq Ft",
    SQUARE_YARD: "Sq Yd",
    MARLA: "Marla",
    KANAL: "Kanal",
  };
  
// const testData = [
//   {
//       "id": 1,
//       "name": "asdasd",
//       "description": "sadsa",
//       "price": 3123,
//       "userId": "kp_19bbcfeb47bb4292a3b65710995582fe",
//       "typeId": 1,
//       "statusId": 2,
//       "DetailId": 3,
//       "createdAt": "2025-02-03T07:36:44.412Z",
//       "type": {
//           "id": 1,
//           "value": "Home",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 2,
//           "value": "Rent",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 7,
//               "value": "Jacobabad",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 1,
//           "bedrooms": 1,
//           "bathrooms": 1,
//           "parkingSpots": 1,
//           "area": 3232,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 1,
//           "areaType": "SQUARE_METER",
//           "created": "2025-02-03T07:45:54.585Z"
//       },
//       "images": [
//           {
//               "id": 1,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/514752281-800x600.webp_1738568202407",
//               "propertyId": 1,
//               "createdAt": "2025-02-03T08:17:59.612Z"
//           }
//       ],
//       "contact": {
//           "id": 1,
//           "name": "sad",
//           "phone": "1321321312",
//           "email": "ranazaeem@gmail.com",
//           "propertyId": 1,
//           "createdAt": "2025-02-03T08:17:59.495Z"
//       }
//   },
//   {
//       "id": 2,
//       "name": "1sadsda",
//       "description": "dasdas",
//       "price": 111212121,
//       "userId": "kp_19bbcfeb47bb4292a3b65710995582fe",
//       "typeId": 1,
//       "statusId": 2,
//       "DetailId": 2,
//       "createdAt": "2025-02-03T09:00:32.143Z",
//       "type": {
//           "id": 1,
//           "value": "Home",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 2,
//           "value": "Rent",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 2,
//               "value": "Hyderabad",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 2,
//           "bedrooms": 1,
//           "bathrooms": 1,
//           "parkingSpots": 1,
//           "area": 11212,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 2,
//           "areaType": "SQUARE_FEET",
//           "created": "2025-02-03T09:00:32.143Z"
//       },
//       "images": [
//           {
//               "id": 2,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/514752281-800x600.webp_1738573230393",
//               "propertyId": 2,
//               "createdAt": "2025-02-03T09:00:32.143Z"
//           }
//       ],
//       "contact": {
//           "id": 2,
//           "name": "sad",
//           "phone": "1321321312",
//           "email": "raadsas@gmail.com",
//           "propertyId": 2,
//           "createdAt": "2025-02-03T09:00:32.143Z"
//       }
//   },
//   {
//       "id": 3,
//       "name": "asdsa",
//       "description": "asdsad",
//       "price": 2000022000,
//       "userId": "kp_19bbcfeb47bb4292a3b65710995582fe",
//       "typeId": 1,
//       "statusId": 1,
//       "DetailId": 1,
//       "createdAt": "2025-02-03T09:19:57.259Z",
//       "type": {
//           "id": 1,
//           "value": "Home",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 1,
//           "value": "Sell",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 1,
//               "value": "Karachi",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 3,
//           "bedrooms": 3,
//           "bathrooms": 3,
//           "parkingSpots": 3,
//           "area": 300,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 3,
//           "areaType": "SQUARE_FEET",
//           "created": "2025-02-03T09:19:57.259Z"
//       },
//       "images": [
//           {
//               "id": 3,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/514752281-800x600.webp_1738574394798",
//               "propertyId": 3,
//               "createdAt": "2025-02-03T09:19:57.259Z"
//           }
//       ],
//       "contact": {
//           "id": 3,
//           "name": "dasd",
//           "phone": "1321321312",
//           "email": "raadsas@gmail.com",
//           "propertyId": 3,
//           "createdAt": "2025-02-03T09:19:57.259Z"
//       }
//   },
//   {
//       "id": 4,
//       "name": "Abdul Majeed",
//       "description": "chinioti Bedroom Set\nking size bed with mattress \nside tables\nhuge 4 compartment wardrobe\ndressing table\ndivider",
//       "price": 120000,
//       "userId": "kp_205dafe7fda240b783481cbe4c3128a8",
//       "typeId": 1,
//       "statusId": 2,
//       "DetailId": 6,
//       "createdAt": "2025-02-04T08:57:33.595Z",
//       "type": {
//           "id": 1,
//           "value": "Home",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 2,
//           "value": "Rent",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 4,
//               "value": "Larkana",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 4,
//           "bedrooms": 1,
//           "bathrooms": 1,
//           "parkingSpots": 1,
//           "area": 120,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 4,
//           "areaType": "SQUARE_METER",
//           "created": "2025-02-04T08:57:33.595Z"
//       },
//       "images": [
//           {
//               "id": 4,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/safe%20locker.webp_1738659449876",
//               "propertyId": 4,
//               "createdAt": "2025-02-04T08:57:33.595Z"
//           },
//           {
//               "id": 5,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/bed1.webp_1738659449877",
//               "propertyId": 4,
//               "createdAt": "2025-02-04T08:57:33.595Z"
//           },
//           {
//               "id": 6,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/bed.webp_1738659449877",
//               "propertyId": 4,
//               "createdAt": "2025-02-04T08:57:33.595Z"
//           }
//       ],
//       "contact": {
//           "id": 4,
//           "name": "Abdul Majeed",
//           "phone": "03191312367",
//           "email": "abdulmajeed32@gmail.com",
//           "propertyId": 4,
//           "createdAt": "2025-02-04T08:57:33.595Z"
//       }
//   },
//   {
//       "id": 5,
//       "name": "Imarat",
//       "description": "Shop for sale in DHA phase 2 (In Marriott hotel ). \nDHA Allotment letter . \nRented + Own brand option . \nAlso available on 1 year installment plan . \nIts a ready Mall ,Visit any time . \nCommercial shop + Marriot hotel rooms available for sale . \nDirect deal through company ,No commission/ no miss commitment .",
//       "price": 51975000,
//       "userId": "kp_205dafe7fda240b783481cbe4c3128a8",
//       "typeId": 1,
//       "statusId": 1,
//       "DetailId": 1,
//       "createdAt": "2025-02-04T09:02:05.377Z",
//       "type": {
//           "id": 1,
//           "value": "Home",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 1,
//           "value": "Sell",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 1,
//               "value": "Karachi",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 5,
//           "bedrooms": 1,
//           "bathrooms": 1,
//           "parkingSpots": 1,
//           "area": 1200,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 5,
//           "areaType": "SQUARE_METER",
//           "created": "2025-02-04T09:02:05.377Z"
//       },
//       "images": [
//           {
//               "id": 7,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/2.webp_1738659722105",
//               "propertyId": 5,
//               "createdAt": "2025-02-04T09:02:05.377Z"
//           },
//           {
//               "id": 8,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/1.webp_1738659722106",
//               "propertyId": 5,
//               "createdAt": "2025-02-04T09:02:05.377Z"
//           }
//       ],
//       "contact": {
//           "id": 5,
//           "name": "Ahmed",
//           "phone": "1234567890",
//           "email": "test@gmail.com",
//           "propertyId": 5,
//           "createdAt": "2025-02-04T09:02:05.377Z"
//       }
//   },
//   {
//       "id": 6,
//       "name": "p10b",
//       "description": "4 bedrooms\n4 washrooms\n2 kitchen\n1 store",
//       "price": 12800000,
//       "userId": "kp_515d0562222e4a6c92c9eae6ff9b39b1",
//       "typeId": 1,
//       "statusId": 1,
//       "DetailId": 1,
//       "createdAt": "2025-02-04T09:12:17.484Z",
//       "type": {
//           "id": 1,
//           "value": "Home",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 1,
//           "value": "Sell",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 1,
//               "value": "Karachi",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 6,
//           "bedrooms": 4,
//           "bathrooms": 4,
//           "parkingSpots": 1,
//           "area": 150,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 6,
//           "areaType": "SQUARE_METER",
//           "created": "2025-02-04T09:12:17.484Z"
//       },
//       "images": [
//           {
//               "id": 9,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/1.webp_1738660333436",
//               "propertyId": 6,
//               "createdAt": "2025-02-04T09:12:17.484Z"
//           }
//       ],
//       "contact": {
//           "id": 6,
//           "name": "Ali Gul",
//           "phone": "+923069067141",
//           "email": "aligul@gmail.com",
//           "propertyId": 6,
//           "createdAt": "2025-02-04T09:12:17.484Z"
//       }
//   },
//   {
//       "id": 7,
//       "name": "3Bed DDL 125sq yd Villa FOR SALE at ALI BLOCK All amenities nearby including MOSQUE, General Store & Parks",
//       "description": "125 Sq. Yards, 3 Bedrooms Modern Style Luxurious Ali Block Villa For Sale Is Available In Bahria Town Karachi\n\nAli Block Villa Is One Of The Best And Luxurious Villa Located On A Prime Location Of Bahria Town At Very Reasonable Price. \n\nAli Block Villa Has Three-Bedrooms With Attached Bathrooms Which Is Designed With The Setting Of Tv Loung, Drawing, Modern Style Kitchen, Car Parking. \n\nAli Block Villa Is An Elegant Addition To The Landscape Of Bahria Town, Karachi. Designed With The Finest Materials And Imported Fixtures, These Homes Reflect True Comfort And Practicality, Comfortable And Spacious Bedrooms, Stunning Ceramics And Designer Kitchen Cabinetry Combine To Create The Exceptional Attributes Of These Beautiful 125 Sq. Yards Villa. \n\nPrice Of Ali Block Villa Is Very Reasonable And Negotiable. \n\nYou Can Contact Us By E-Mail, Call Or Whatsapp\nWe Are Available 24 7, So Don t Hesitate To Contact Us. \n\nHIGHLIGHTS & ATTRACTIONS \n Ideal Location\n Economical Price\n Profitable\n Suitable Living Option Customized As Per Your Needs\n Ready To Live\n Bahria Town s Trademark Lavish Living Amenities\n Secure Environment Integrated With International Standards\n All Basic Facilities Within The Boundary Wall Of Bahria",
//       "price": 12999999,
//       "userId": "kp_515d0562222e4a6c92c9eae6ff9b39b1",
//       "typeId": 1,
//       "statusId": 1,
//       "DetailId": 1,
//       "createdAt": "2025-02-04T09:16:19.171Z",
//       "type": {
//           "id": 1,
//           "value": "Home",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 1,
//           "value": "Sell",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 1,
//               "value": "Karachi",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 7,
//           "bedrooms": 3,
//           "bathrooms": 3,
//           "parkingSpots": 2,
//           "area": 125,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 7,
//           "areaType": "SQUARE_METER",
//           "created": "2025-02-04T09:16:19.171Z"
//       },
//       "images": [
//           {
//               "id": 10,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/4.webp_1738660575729",
//               "propertyId": 7,
//               "createdAt": "2025-02-04T09:16:19.171Z"
//           },
//           {
//               "id": 11,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/3.webp_1738660575730",
//               "propertyId": 7,
//               "createdAt": "2025-02-04T09:16:19.171Z"
//           },
//           {
//               "id": 12,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/2.webp_1738660575730",
//               "propertyId": 7,
//               "createdAt": "2025-02-04T09:16:19.171Z"
//           }
//       ],
//       "contact": {
//           "id": 7,
//           "name": "Arsalan",
//           "phone": "+923123456789",
//           "email": "arsalan@gmail.com",
//           "propertyId": 7,
//           "createdAt": "2025-02-04T09:16:19.171Z"
//       }
//   },
//   {
//       "id": 8,
//       "name": "Ali block sami corner villa for sale bahria town Karachi",
//       "description": "Ali block sami corner villa for sale \n3 bed rooms \nDrawing dinning \nTv lounge \n\n03,09,,,,300(6562)\nFarooque chandio \n\n\n#sale #purchase #rent",
//       "price": 15500000,
//       "userId": "kp_515d0562222e4a6c92c9eae6ff9b39b1",
//       "typeId": 1,
//       "statusId": 1,
//       "DetailId": 1,
//       "createdAt": "2025-02-04T09:19:44.031Z",
//       "type": {
//           "id": 1,
//           "value": "Home",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 1,
//           "value": "Sell",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 1,
//               "value": "Karachi",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 8,
//           "bedrooms": 3,
//           "bathrooms": 4,
//           "parkingSpots": 0,
//           "area": 149,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 8,
//           "areaType": "SQUARE_METER",
//           "created": "2025-02-04T09:19:44.031Z"
//       },
//       "images": [
//           {
//               "id": 13,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/6.webp_1738660778445",
//               "propertyId": 8,
//               "createdAt": "2025-02-04T09:19:44.031Z"
//           },
//           {
//               "id": 14,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/5.webp_1738660778445",
//               "propertyId": 8,
//               "createdAt": "2025-02-04T09:19:44.031Z"
//           },
//           {
//               "id": 15,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/4.webp_1738660778445",
//               "propertyId": 8,
//               "createdAt": "2025-02-04T09:19:44.031Z"
//           }
//       ],
//       "contact": {
//           "id": 8,
//           "name": "bilal",
//           "phone": "+923091234300",
//           "email": "bilal@gmail.com",
//           "propertyId": 8,
//           "createdAt": "2025-02-04T09:19:44.031Z"
//       }
//   },
//   {
//       "id": 9,
//       "name": "Urgent Aliblock 4Bedrooms villa available for Sale",
//       "description": "Ali Block Villa Precinct 12\nBahria Town Karachi\n4 Bedrooms \n4 Washrooms \nStore room\n2 Kitchen \nLounge\nTerrace \nCar porch \nGrills installed \nFan & Stove Installed \nReady to move\n\nContact \n0/30/73/15/19/84",
//       "price": 13000000,
//       "userId": "kp_515d0562222e4a6c92c9eae6ff9b39b1",
//       "typeId": 1,
//       "statusId": 1,
//       "DetailId": 1,
//       "createdAt": "2025-02-04T09:22:20.506Z",
//       "type": {
//           "id": 1,
//           "value": "Home",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 1,
//           "value": "Sell",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 1,
//               "value": "Karachi",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 9,
//           "bedrooms": 4,
//           "bathrooms": 4,
//           "parkingSpots": 1,
//           "area": 125,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 9,
//           "areaType": "SQUARE_METER",
//           "created": "2025-02-04T09:22:20.506Z"
//       },
//       "images": [
//           {
//               "id": 16,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/9.webp_1738660937249",
//               "propertyId": 9,
//               "createdAt": "2025-02-04T09:22:20.506Z"
//           },
//           {
//               "id": 17,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/8.webp_1738660937250",
//               "propertyId": 9,
//               "createdAt": "2025-02-04T09:22:20.506Z"
//           },
//           {
//               "id": 18,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/7.webp_1738660937250",
//               "propertyId": 9,
//               "createdAt": "2025-02-04T09:22:20.506Z"
//           }
//       ],
//       "contact": {
//           "id": 9,
//           "name": "safiullah",
//           "phone": "03073151984",
//           "email": "safiullah@gmail.com",
//           "propertyId": 9,
//           "createdAt": "2025-02-04T09:22:20.506Z"
//       }
//   },
//   {
//       "id": 10,
//       "name": "Available On Easy Installments 3Bed DDL 125 sq yd Villa FOR SALE at Precicnt-11B (All Amenities Nearby) Heighted Location Investor Rates, Details On Call.",
//       "description": "Luxury 3 Bedrooms Precinct 11B Villa Is Available For Sale In Bahria Town Karachi\nThis Villa Is Located In Precinct-1B, Bahria Town, Karachi\n\nSize Of Villa Is 125 Sq. Yards\nGround Plus One Villa\nNear To Park\nNear To Masjid\nNear To Commercial Area\n\nHas 3 Bedrooms With Attached Bathrooms\nDrawing Room\nDining Room\nT. V Lounge\nServant Quarter\nStore Room\nCar Porch\n\nYou Can Contact Us By E-Mail, Call Or Whatsapp\nWe Are Available 24/7, So Dont Hesitate To Contact Us.",
//       "price": 15000000,
//       "userId": "kp_515d0562222e4a6c92c9eae6ff9b39b1",
//       "typeId": 1,
//       "statusId": 1,
//       "DetailId": 1,
//       "createdAt": "2025-02-04T09:27:58.862Z",
//       "type": {
//           "id": 1,
//           "value": "Home",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 1,
//           "value": "Sell",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 1,
//               "value": "Karachi",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 10,
//           "bedrooms": 3,
//           "bathrooms": 3,
//           "parkingSpots": 1,
//           "area": 124,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 10,
//           "areaType": "SQUARE_METER",
//           "created": "2025-02-04T09:27:58.862Z"
//       },
//       "images": [
//           {
//               "id": 19,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/12.webp_1738661267349",
//               "propertyId": 10,
//               "createdAt": "2025-02-04T09:27:58.862Z"
//           },
//           {
//               "id": 20,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/11.webp_1738661267350",
//               "propertyId": 10,
//               "createdAt": "2025-02-04T09:27:58.862Z"
//           },
//           {
//               "id": 21,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/10.webp_1738661267350",
//               "propertyId": 10,
//               "createdAt": "2025-02-04T09:27:58.862Z"
//           }
//       ],
//       "contact": {
//           "id": 10,
//           "name": "Shoaib",
//           "phone": "+923123456789",
//           "email": "shoaib@gmail.com",
//           "propertyId": 10,
//           "createdAt": "2025-02-04T09:27:58.862Z"
//       }
//   },
//   {
//       "id": 11,
//       "name": "2 BED DD NORTH TOWN RESIDENCY PHASE 1",
//       "description": "Flat for Sale in North Town Residency - Phase 1!\n\n 2-Bed DD Flat\n 1080 Sq. Ft. \n Superior Block, North Town Residency - Phase 1\n\n Key Features:\n Fully secured, 24/7 security\n Boundary-wall project ensuring safety and peace of mind\n Prime location before Saima Arabian Villas, Surjani Town\n\n North Town Residency offers a modern and peaceful living experience in a well-planned, family-friendly community. \n\n Demand: 62 Lacs Only\n\n Contact Now: Dont miss this amazing opportunity! Secure your dream home today.",
//       "price": 6200000,
//       "userId": "kp_d583be71d75a4d41ba428b2650204e74",
//       "typeId": 1,
//       "statusId": 1,
//       "DetailId": 2,
//       "createdAt": "2025-02-04T14:16:48.692Z",
//       "type": {
//           "id": 1,
//           "value": "Home",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 1,
//           "value": "Sell",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 1,
//               "value": "Karachi",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 11,
//           "bedrooms": 4,
//           "bathrooms": 3,
//           "parkingSpots": 1,
//           "area": 1080,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 11,
//           "areaType": "SQUARE_METER",
//           "created": "2025-02-04T14:16:48.692Z"
//       },
//       "images": [
//           {
//               "id": 22,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/515866429-800x600.jpg_1738678595632",
//               "propertyId": 11,
//               "createdAt": "2025-02-04T14:16:48.692Z"
//           },
//           {
//               "id": 23,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/515866430-800x600.jpg_1738678595633",
//               "propertyId": 11,
//               "createdAt": "2025-02-04T14:16:48.692Z"
//           },
//           {
//               "id": 24,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/515866431-800x600.jpg_1738678595633",
//               "propertyId": 11,
//               "createdAt": "2025-02-04T14:16:48.692Z"
//           },
//           {
//               "id": 25,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/515866435-800x600.jpg_1738678595633",
//               "propertyId": 11,
//               "createdAt": "2025-02-04T14:16:48.692Z"
//           },
//           {
//               "id": 26,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/515866439-800x600.jpg_1738678595633",
//               "propertyId": 11,
//               "createdAt": "2025-02-04T14:16:48.692Z"
//           }
//       ],
//       "contact": {
//           "id": 11,
//           "name": "Danish",
//           "phone": "03350011123",
//           "email": "bilal.insurance@gmail.com",
//           "propertyId": 11,
//           "createdAt": "2025-02-04T14:16:48.692Z"
//       }
//   },
//   {
//       "id": 12,
//       "name": "R-3065 - GFS Seven Wonders City Phase 1",
//       "description": "Builder & Project: GFS Seven Wonders City\nLocation: M9 Super Highway \nPlot location in society: \nR-3065 West Open Corner China Cluster Extension 2\nTotal Price: 2200000\n4 years program \n2 years remaining \nMonthly installment: 15000\nYearly installment: 1,35,000\n\nFile transfer Price: 12,38000",
//       "price": 1238000,
//       "userId": "kp_9a23448673f14589a5183d3156dfc248",
//       "typeId": 2,
//       "statusId": 1,
//       "DetailId": 12,
//       "createdAt": "2025-02-04T14:47:23.834Z",
//       "type": {
//           "id": 2,
//           "value": "Plots",
//           "created": "2025-02-03T07:45:54.859Z"
//       },
//       "status": {
//           "id": 1,
//           "value": "Sell",
//           "created": "2025-02-03T07:45:54.773Z"
//       },
//       "location": {
//           "city": {
//               "id": 1,
//               "value": "Karachi",
//               "stateId": 1,
//               "createdAt": "2025-02-03T08:17:59.374Z"
//           },
//           "stateId": 1
//       },
//       "feature": {
//           "id": 12,
//           "bedrooms": 0,
//           "bathrooms": 0,
//           "parkingSpots": 0,
//           "area": 120,
//           "hasSwimmingPool": false,
//           "hasGardenYard": false,
//           "hasBalcony": false,
//           "propertyId": 12,
//           "areaType": "SQUARE_YARD",
//           "created": "2025-02-04T14:47:23.834Z"
//       },
//       "images": [
//           {
//               "id": 27,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/5.jpg_1738680436434",
//               "propertyId": 12,
//               "createdAt": "2025-02-04T14:47:23.834Z"
//           },
//           {
//               "id": 28,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/3.jpg_1738680436434",
//               "propertyId": 12,
//               "createdAt": "2025-02-04T14:47:23.834Z"
//           },
//           {
//               "id": 29,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/2.jpg_1738680436434",
//               "propertyId": 12,
//               "createdAt": "2025-02-04T14:47:23.834Z"
//           },
//           {
//               "id": 30,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/7.jpeg_1738680436434",
//               "propertyId": 12,
//               "createdAt": "2025-02-04T14:47:23.834Z"
//           },
//           {
//               "id": 31,
//               "url": "https://jaghufeohfcrwkhqisxt.supabase.co/storage/v1/object/public/propertyimages/1.png_1738680436434",
//               "propertyId": 12,
//               "createdAt": "2025-02-04T14:47:23.834Z"
//           }
//       ],
//       "contact": {
//           "id": 12,
//           "name": "Talha Khan",
//           "phone": "03422630693",
//           "email": "talha.k2625@gmail.com",
//           "propertyId": 12,
//           "createdAt": "2025-02-04T14:47:23.834Z"
//       }
//   }
// ]

export {BgShadow,province,unitAbbreviations}
