import { Text } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import StarRating from '@/components/commons/StarRating'
import { Place } from '@/models/place'
import { ImageGallery } from '../ImageGallery'

type PlaceCardProps = {
  place: Place
  onClick?: () => void
}
const PlaceCard = ({ place, onClick }: PlaceCardProps) => {
  return (
    <Card>
      <CardHeader padding={0} borderTopEndRadius={4} borderTopStartRadius={4}>
        <ImageGallery
          imageList={place.place_image || []}
          fixedImageHeight="150px"
          imageClick={onClick}
        />
      </CardHeader>
      <CardBody textAlign={'start'} paddingBottom={0} onClick={onClick}>
        <Text fontWeight="bold" fontSize="lg">
          {place.name}
        </Text>
        <Text color="gray.600" fontSize="sm">
          {place.address.streetname} - {place.address.neighborhood},{' '}
          {place.address.addressnumber}
        </Text>
      </CardBody>
      <CardFooter onClick={onClick}>
        <StarRating
          rating={place.rating_avg || 0}
          reviewCount={place.feedback.length}
        />
      </CardFooter>
    </Card>
  )
}

export default PlaceCard
