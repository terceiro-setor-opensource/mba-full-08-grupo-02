import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react'

export const MapModal = ({
  isOpen,
  onClose,
  latitude,
  longitude,
  placeName,
}: {
  isOpen: boolean
  onClose: () => void
  latitude: number | null
  longitude: number | null
  placeName: string
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent height="80vh" maxWidth="80%">
        <ModalHeader>
          <Text>{placeName}</Text>
        </ModalHeader>
        <ModalBody>
          <iframe
            style={{ width: '100%', height: '100%' }}
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
            title="Map Location"
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
