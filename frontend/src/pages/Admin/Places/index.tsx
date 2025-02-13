import {
  Box, HStack, Stack, Text, Button, IconButton,
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter,
 Table, Thead, Tbody, Tr, Th, Td, Tfoot, Skeleton,
} from "@chakra-ui/react";
import { BiPlusCircle, BiTrash } from "react-icons/bi";
import { useAdminPlacesManager } from "@/hooks/useAdminPlacesManager";
import { t } from "i18next";
import EditablePlace from "@/components/Admin/EditablePlace";
import CreatePlace from "@/components/Admin/CreatePlace";
import { FaEye } from "react-icons/fa";

const stackStyles = {
  width: { base: "100%", md: "90%", lg: "80%" },
  margin: "auto",
};

export const ManagePlaces = () => {
  const {
    places, loading, error, isOpen, onClose, selectedPlace, 
    fetchPlaceDetails, handleAddPlace, handleCreatePlace, handleDeletePlace
  } = useAdminPlacesManager();

  return (
    <Box paddingY={"2rem"}>
      <Stack sx={stackStyles}>
        <HStack justifyContent="space-between" width="100%" paddingBottom={4}>
          <Text fontSize="2xl" fontWeight="bold">{t("managePlaces.title")}</Text>
          <Button leftIcon={<BiPlusCircle />} colorScheme="blue" onClick={handleAddPlace}>
            {t("buttons.add_place")}
          </Button>
        </HStack>

        <Stack spacing={8} alignItems={"start"} width="100%">
          {error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%" bg="white" shadow="md">
              <Table variant="simple" size="md">
                <Thead bg="gray.100">
                  <Tr>
                    <Th>{t("table.name")}</Th>
                    <Th>{t("table.description")}</Th>
                    <Th>{t("table.city")}</Th>
                    <Th isNumeric>{t("table.actions")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {false ? (
                    // Skeleton rows while loading
                    [...Array(5)].map((_, index) => (
                      <Tr key={index}>
                        <Td><Skeleton height="20px" width="100px" /></Td>
                        <Td><Skeleton height="20px" width="150px" /></Td>
                        <Td><Skeleton height="20px" width="80px" /></Td>
                        <Td isNumeric>
                          <Skeleton height="30px" width="40px" display="inline-block" mr={2} />
                          <Skeleton height="30px" width="40px" display="inline-block" />
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    places.map((place) => (
                      <Tr key={place.id} _hover={{ bg: "gray.50" }}>
                        <Td fontWeight="bold">{place.name}</Td>
                        <Td>{place.description.substring(0, 50) + "..." || "N/A"}</Td>
                        <Td>{place.address?.city || "N/A"}</Td>
                        <Td isNumeric gap={2}>
                          <IconButton
                            aria-label={t("buttons.view")}
                            icon={<FaEye />}
                            colorScheme="blue"
                            size="sm"
                            onClick={() => fetchPlaceDetails(place.id)}
                          />
                          <IconButton
                            aria-label={t("buttons.delete")}
                            icon={<BiTrash />}
                            colorScheme="red"
                            size="sm"
                            onClick={() => handleDeletePlace(place.id)}
                          />
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>{t("table.name")}</Th>
                    <Th>{t("table.description")}</Th>
                    <Th>{t("table.city")}</Th>
                    <Th isNumeric>{t("table.actions")}</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </Box>
          )}
        </Stack>
      </Stack>

      {/* Drawer for Viewing/Editing Place */}
      <Drawer isOpen={isOpen} onClose={onClose} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            {selectedPlace ? `${t("drawer.edit")} ${selectedPlace.name}` : t("drawer.new_place")}
          </DrawerHeader>
          <DrawerBody>
            {selectedPlace ? (
              <EditablePlace selectedPlace={selectedPlace} loading={loading} onEdit={console.log}/>
            ) : (
              <CreatePlace onCreate={handleCreatePlace} />
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="green" isDisabled={loading}>{t("buttons.save")}</Button>
            <Button ml={3} onClick={onClose}>{t("buttons.close")}</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
