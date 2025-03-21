"use client"
import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { updateProfile } from "@/lib/actions/user/updateProfile"
import { toast } from "react-toastify"

const provinceCityMap: Record<string, string[]> = {
  "Sindh": [
    
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Mirpur Khas",
    "Nawabshah",
    "Jacobabad",
    "Shikarpur",
    "Dadu",
    "Thatta",
    "Badin",
    "Tando Adam",
    "Tando Allahyar",
    "Khairpur",
    "Kotri",
    "Umerkot",
    "Tando Muhammad K",
    "Ghotki",
    "Sanghar",
    "Kashmore",
    "Qambar Shahdadkot",
    "Matiari",
    "Jamshoro",
    "Tharparkar (Mithi)",
    "Hala",
    "Mehar",
    "Shahdadpur",
    "Mirpur Mathelo",
    "Ratodero",
    "Sehwan"
  ],
  "Punjab": [
    "Islamabad",
    "Lahore",
    "Multan",
    "Faisalabad",
    "Rawalpindi",
    "Gujranwala",
    "Sialkot",
    "Bahawalpur",
    "Sargodha",
    "Sheikhupura",
    "Gujrat",
    "Sahiwal",
    "Jhelum",
    "Rahim Yar Khan",
    "Kasur",
    "Okara",
    "Gujar Khan",
    "Bhawal Nagar",
    "Wah Cantonment",
    "Dera Ghazi Khan",
    "Chiniot",
    "Kamoke",
    "Hafizabad",
    "Mandi Bahauddin",
    "Muzaffargarh",
    "Layyah",
    "Toba Tek Singh",
    "Pakpattan",
    "Lodhran",
    "Narowal",
    "Mianwali",
    "Attock",
    "Chakwal",
    "Nankana Sahib",
    "Khushab"
  ],
  "Khyber Pakhtunkhwa": [
    "Peshawar",
    "Abbottabad",
    "Mardan",
    "Mingora",
    "Kohat",
    "Dera Ismail Khan",
    "Swabi",
    "Nowshera",
    "Bannu",
    "Charsadda",
    "Mansehra",
    "Tank",
    "Chitral",
    "Hangu",
    "Karak",
    "Lower Dir (Timergara)",
    "Upper Dir",
    "Buner",
    "Shangla",
    "Torghar",
    "Malakand",
    "Khyber",
    "Mohmand",
    "Orakzai",
    "South Waziristan (Wana)",
    "North Waziristan (Miranshah)",
    "Bajaur (Khar)"
  ],
  "Balochistan": [
    "Quetta",
    "Gwadar",
    "Turbat",
    "Khuzdar",
    "Chaman",
    "Sibi",
    "Zhob",
    "Pishin",
    "Loralai",
    "Mastung",
    "Kalat",
    "Dera Murad Jamali",
    "Hub",
    "Dera Allah Yar",
    "Nushki",
    "Lasbela",
    "Panjgur",
    "Kharan",
    "Awaran",
    "Musakhel",
    "Washuk",
    "Qila Saifullah",
    "Qila Abdullah",
    "Pasni",
    "Ormara",
    "Uthal",
    "Ziarat",
    "Gandawah",
    "Surab",
    "Kech",
    "Chagai"
  ],
  "Gilgit-Baltistan": [
    "Gilgit",
    "Skardu",
    "Hunza",
    "Chilas",
    "Ghizer",
    "Aliabad",
    "Yasin",
    "Gahkuch",
    "Khaplu",
    "Shigar",
    "Astore",
    "Danyore",
    "Juglot",
    "Karimabad",
    "Nagar"
  ]
};


const profileSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileCompletionDialogProps {
  isOpen: boolean
  onClose: () => void
}

const ProfileCompletionDialog: React.FC<ProfileCompletionDialogProps> = ({ isOpen, onClose }) => {
  const { user } = useSelector((state: RootState) => state.auth)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phoneNumber: user?.phoneNumber || "",
      address: user?.streetAddress || "",
      city: user?.city || "",
      province: user?.province || "",
    },
  })

  const selectedProvince = watch("province")

  React.useEffect(() => {
    if (selectedProvince) {
      setValue("city", "") // Reset city when province changes
    }
  }, [selectedProvince, setValue])

  const onSubmit = async (data: ProfileFormData) => {
    const response = await updateProfile(data)

    if (response.success) {
      toast.success("Profile updated successfully")
      onClose()
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      toast.error("Something went wrong")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kindly complete your profile first, then add your property.</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Controller
              name="province"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a province" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(provinceCityMap).map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="city">City</Label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={!selectedProvince}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent className="" >
                    {provinceCityMap[selectedProvince]?.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Complete Address</Label>
            <Input id="address" placeholder="House No, Street No,Area" {...register("address")} />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" placeholder="Enter your phone number" {...register("phoneNumber")} />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileCompletionDialog

