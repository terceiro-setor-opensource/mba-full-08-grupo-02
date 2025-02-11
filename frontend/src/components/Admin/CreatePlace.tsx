import {
  Box, FormLabel, Input, Textarea, Button, Stack, IconButton, Text
} from "@chakra-ui/react";
import { useState } from "react";
import { BiPlus, BiTrash } from "react-icons/bi";
import { t } from "i18next";

type NewPlace = {
  name: string;
  description: string;
  address: {
      addressnumber: string;
      complement?: string;
      reference?: string;
      latitude?: number;
      longitude?: number;
      postalcode: string;
      streetname: string;
      neighborhood: string;
      city: string;
      state: string;
  };
  images: string[];
  activities: {
    id: string;
    name: string;
    benefits: {
      id: string;
      name: string;
    }[];
  }[];
};

export default function CreatePlace({ onCreate }: { onCreate: (place: NewPlace) => void }) {
  const [newPlace, setNewPlace] = useState<NewPlace>({
    name: "",
    description: "",
    address: { 
      city: "", streetname: "", addressnumber: "", postalcode: "", neighborhood: "", state: ""
    },
    images: [""],
    activities: [{ id: "1", name: "", benefits: [{ id: "1", name: "" }] }]
  });

  const handleChange = (field: string, value: any) => {
    setNewPlace((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setNewPlace((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...newPlace.images];
    updatedImages[index] = value;
    setNewPlace((prev) => ({ ...prev, images: updatedImages }));
  };

  const addImageField = () => {
    setNewPlace((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index: number) => {
    setNewPlace((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addActivity = () => {
    setNewPlace((prev) => ({
      ...prev,
      activities: [...prev.activities, { id: `${Date.now()}`, name: "", benefits: [{ id: `${Date.now()}`, name: "" }] }]
    }));
  };

  const removeActivity = (index: number) => {
    setNewPlace((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const handleActivityChange = (index: number, value: string) => {
    const updatedActivities = [...newPlace.activities];
    updatedActivities[index].name = value;
    setNewPlace((prev) => ({ ...prev, activities: updatedActivities }));
  };

  const handleBenefitChange = (activityIndex: number, benefitIndex: number, value: string) => {
    const updatedActivities = [...newPlace.activities];
    updatedActivities[activityIndex].benefits[benefitIndex].name = value;
    setNewPlace((prev) => ({ ...prev, activities: updatedActivities }));
  };

  const addBenefit = (activityIndex: number) => {
    setNewPlace((prev) => {
      const updatedActivities = [...prev.activities];
      updatedActivities[activityIndex].benefits.push({ id: `${Date.now()}`, name: "" });
      return { ...prev, activities: updatedActivities };
    });
  };

  const removeBenefit = (activityIndex: number, benefitIndex: number) => {
    setNewPlace((prev) => {
      const updatedActivities = [...prev.activities];
      updatedActivities[activityIndex].benefits = updatedActivities[activityIndex].benefits.filter((_, i) => i !== benefitIndex);
      return { ...prev, activities: updatedActivities };
    });
  };

  const handleSubmit = () => {
    onCreate(newPlace);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <Text fontSize="2xl" fontWeight="bold">{t("drawer.new_place")}</Text>

      {/* Name */}
      <FormLabel>{t("form.name")}</FormLabel>
      <Input value={newPlace.name} onChange={(e) => handleChange("name", e.target.value)} />

      {/* Description */}
      <FormLabel>{t("form.description")}</FormLabel>
      <Textarea value={newPlace.description} onChange={(e) => handleChange("description", e.target.value)} />

      {/* Address */}
      <FormLabel>{t("form.city")}</FormLabel>
      <Input value={newPlace.address.city} onChange={(e) => handleAddressChange("city", e.target.value)} />

      <FormLabel>{t("drawer.address")}</FormLabel>
      <Input value={newPlace.address.streetname} onChange={(e) => handleAddressChange("streetname", e.target.value)} />

      <FormLabel>{t("form.number")}</FormLabel>
      <Input value={newPlace.address.addressnumber} onChange={(e) => handleAddressChange("addressnumber", e.target.value)} />

      <FormLabel>{t("form.postal_code")}</FormLabel>
      <Input value={newPlace.address.postalcode} onChange={(e) => handleAddressChange("postalcode", e.target.value)} />

      <FormLabel>{t("form.neighborhood")}</FormLabel>
      <Input value={newPlace.address.neighborhood} onChange={(e) => handleAddressChange("neighborhood", e.target.value)} />

      <FormLabel>{t("form.state")}</FormLabel>
      <Input value={newPlace.address.state} onChange={(e) => handleAddressChange("state", e.target.value)} />
      

      {/* Images */}
      <Text fontWeight="bold" mt={4}>{t("drawer.images")}</Text>
      {newPlace.images.map((img, index) => (
        <Stack key={index} direction="row" align="center">
          <Input value={img} onChange={(e) => handleImageChange(index, e.target.value)} />
          <IconButton aria-label="Remove Image" icon={<BiTrash />} colorScheme="red" size="sm" onClick={() => removeImageField(index)} />
        </Stack>
      ))}
      <Button leftIcon={<BiPlus />} colorScheme="blue" size="sm" mt={2} onClick={addImageField}>
        {t("buttons.add_image")}
      </Button>

      {/* Activities & Benefits */}
      <Text fontWeight="bold" mt={4}>{t("drawer.activities")}</Text>
      {newPlace.activities.map((activity, activityIndex) => (
        <Box key={activity.id} borderWidth="1px" borderRadius="md" p={3} mt={2}>
          <Stack direction="row" align="center">
            <Input value={activity.name} onChange={(e) => handleActivityChange(activityIndex, e.target.value)} />
            <IconButton aria-label="Remove Activity" icon={<BiTrash />} colorScheme="red" size="sm" onClick={() => removeActivity(activityIndex)} />
          </Stack>

          <Text fontWeight="bold" mt={2}>{t("drawer.benefits")}</Text>
          {activity.benefits.map((benefit, benefitIndex) => (
            <Stack key={benefit.id} direction="row" align="center">
              <Input value={benefit.name} onChange={(e) => handleBenefitChange(activityIndex, benefitIndex, e.target.value)} />
              <IconButton aria-label="Remove Benefit" icon={<BiTrash />} colorScheme="red" size="sm" onClick={() => removeBenefit(activityIndex, benefitIndex)} />
            </Stack>
          ))}

          <Button leftIcon={<BiPlus />} colorScheme="blue" size="sm" mt={2} onClick={() => addBenefit(activityIndex)}>
            {t("buttons.add_benefit")}
          </Button>
        </Box>
      ))}

      <Button leftIcon={<BiPlus />} colorScheme="green" size="sm" mt={4} onClick={addActivity}>
        {t("buttons.add_activity")}
      </Button>

      {/* Submit Button */}
      <Button colorScheme="green" mt={6} onClick={handleSubmit}>
        {t("buttons.save")}
      </Button>
    </Box>
  );
}
