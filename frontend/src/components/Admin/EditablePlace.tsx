import {
  Editable, EditableInput, EditablePreview, FormLabel, Input, Textarea, 
  Skeleton, Text, Stack, Box
} from "@chakra-ui/react";
import { t } from "i18next";

// ✅ Define Props Correctly
type PlaceDetailsProps = {
  selectedPlace: PlaceDetails | null;
  loading: boolean;
  onEdit: (updatedPlace: PlaceDetails) => void;
};

// ✅ Type for PlaceDetails
type PlaceDetails = {
  name: string;
  description: string;
  address: {
    city: string;
    streetname: string;
  };
  images: string[]; // Image URLs as text input
  events: {
    id: string;
    name: string;
  }[];
  feedback: {
    id: string;
    description: string;
    users: {
      name: string;
    };
  }[];
  activities: {
    id: string;
    name: string;
    benefits: {
      id: string;
      name: string;
    }[];
  }[];
};

// ✅ Skeleton Loader Component
function LoadingSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} height="20px" width="100%" my={3} />
      ))}
    </>
  );
}

// ✅ Fully Editable Component
export default function EditablePlace({ selectedPlace, loading, onEdit }: PlaceDetailsProps) {
  if (loading) return <LoadingSkeleton />;
  if (!selectedPlace) return <Text>{t("drawer.no_details")}</Text>;

  // ✅ Function to handle field changes
  const handleChange = (field: string, value: any) => {
    onEdit({ ...selectedPlace, [field]: value });
  };

  return (
    <Stack spacing={4}>
      {/* 📌 Editable Name */}
      <FormLabel>{t("form.name")}</FormLabel>
      <Skeleton isLoaded={!loading}>
        <Editable defaultValue={selectedPlace.name} onChange={(val) => handleChange("name", val)} 
          >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Skeleton>

      {/* 📌 Editable Description */}
      <FormLabel>{t("form.description")}</FormLabel>
      <Skeleton isLoaded={!loading}>
        <Editable defaultValue={selectedPlace.description} onChange={(val) => handleChange("description", val)}>
          <EditablePreview />
          <Textarea as={EditableInput} />
        </Editable>
      </Skeleton>

      {/* 📌 Editable Address */}
      <FormLabel>{t("form.city")}</FormLabel>
      <Skeleton isLoaded={!loading}>
        <Editable defaultValue={selectedPlace.address.city} onChange={(val) => handleChange("address", { ...selectedPlace.address, city: val })}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Skeleton>

      <FormLabel>{t("drawer.address")}</FormLabel>
      <Skeleton isLoaded={!loading}>
        <Editable defaultValue={selectedPlace.address.streetname} onChange={(val) => handleChange("address", { ...selectedPlace.address, streetname: val })}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Skeleton>

      {/* 📌 Editable Images as URL Text Inputs */}
      <Text fontWeight="bold" mt={4}>{t("drawer.images")}</Text>
      {selectedPlace.images.map((img, index) => (
        <Skeleton key={index} isLoaded={!loading}>
          <Editable defaultValue={img} onChange={(val) => {
            const updatedImages = [...selectedPlace.images];
            updatedImages[index] = val;
            handleChange("images", updatedImages);
          }}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Skeleton>
      ))}

      {/* 📌 Editable Events */}
      <Text fontWeight="bold" mt={4}>{t("drawer.events")}</Text>
      {selectedPlace.events.map((event, index) => (
        <Skeleton key={event.id} isLoaded={!loading}>
          <Editable defaultValue={event.name} onChange={(val) => {
            const updatedEvents = [...selectedPlace.events];
            updatedEvents[index].name = val;
            handleChange("events", updatedEvents);
          }}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Skeleton>
      ))}

      {/* 📌 Editable Feedback */}
      <Text fontWeight="bold" mt={4}>{t("drawer.feedback")}</Text>
      {selectedPlace.feedback.map((feedback, index) => (
        <Skeleton key={feedback.id} isLoaded={!loading}>
          <Editable defaultValue={feedback.description} onChange={(val) => {
            const updatedFeedback = [...selectedPlace.feedback];
            updatedFeedback[index].description = val;
            handleChange("feedback", updatedFeedback);
          }}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Skeleton>
      ))}

      {/* 📌 Editable Activities & Nested Benefits */}
      <Text fontWeight="bold" mt={4}>{t("drawer.activities")}</Text>
      {selectedPlace.activities.map((activity, activityIndex) => (
        <Box key={activity.id} borderWidth="1px" borderRadius="md" p={3}>
          <Skeleton isLoaded={!loading}>
            <Editable defaultValue={activity.name} onChange={(val) => {
              const updatedActivities = [...selectedPlace.activities];
              updatedActivities[activityIndex].name = val;
              handleChange("activities", updatedActivities);
            }}>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Skeleton>

          <Text fontWeight="bold" mt={2}>{t("drawer.benefits")}</Text>
          {activity.benefits.map((benefit, benefitIndex) => (
            <Skeleton key={benefit.id} isLoaded={!loading}>
              <Editable defaultValue={benefit.name} onChange={(val) => {
                const updatedActivities = [...selectedPlace.activities];
                updatedActivities[activityIndex].benefits[benefitIndex].name = val;
                handleChange("activities", updatedActivities);
              }}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Skeleton>
          ))}
        </Box>
      ))}
    </Stack>
  );
}
