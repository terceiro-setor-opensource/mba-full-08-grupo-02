import { NewPlace } from "@/components/Admin/CreatePlace";
import { Place } from "@/models/place";
import { placeService } from "@/services/place.service";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function useAdminPlacesManager() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const response = await placeService.getPlaces({
        filter: {
          order: "asc",
          order_by: "name",
        },
      });
      setPlaces(response);
    } catch (err) {
      setError((err as Error).message || "Error fetching places.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaceDetails = async (placeId: number) => {
    setLoading(true);
    try {
      const response = await placeService.getDetails(placeId);
      setSelectedPlace(response);
      onOpen();
    } catch (err) {
      console.error("Error fetching place details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlace = () => {
    setSelectedPlace(null);
    onOpen();
  };

  const handleCreatePlace = async (newPlace: NewPlace) => {
    try {
      const createdPlace = await placeService.createPlace(newPlace);
      console.log("New place created:", createdPlace);
      
      fetchPlaces(); 
    } catch (error) {
      console.error("Error creating place:", error);
    }
  };

  const handleDeletePlace = async (placeId: number) => {
    try {
      await placeService.deletePlace(placeId);
      console.log("Place deleted:", placeId);
      
      // Optionally refresh places list
      fetchPlaces();
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  }
 
  useEffect(() => {
    fetchPlaces();
  }, []);

  return {
    places,
    loading,
    error,
    isOpen,
    onOpen,
    onClose,
    selectedPlace,
    fetchPlaces,
    fetchPlaceDetails,
    handleAddPlace,
    handleCreatePlace,
    handleDeletePlace
  };
}
