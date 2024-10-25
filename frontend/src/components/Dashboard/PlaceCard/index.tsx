import { Image, Text } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import StarRating from '@/components/commons/StarRating'
import { Place } from '@/models/place'

type PlaceCardProps = {
  place: Place
  onClick?: () => void
}
const PlaceCard = ({ place, onClick }: PlaceCardProps) => {
  return (
    <Card onClick={onClick}>
      <CardHeader padding={0} borderTopEndRadius={4} borderTopStartRadius={4}>
        <Image
          src={place.image}
          alt={place.name}
          objectFit="cover"
          width="100%"
          height="200px"
          borderTopEndRadius={4}
          borderTopStartRadius={4}
        />
      </CardHeader>
      <CardBody textAlign={'start'} paddingBottom={0}>
        <Text fontWeight="bold" fontSize="lg">
          {place.name}
        </Text>
        <Text color="gray.600" fontSize="sm">
          {place.address.streetname} - {place.address.neighborhood},{' '}
          {place.address.addressnumber}
        </Text>
      </CardBody>
      <CardFooter>
        <StarRating
          rating={place.rating_avg || 0}
          reviewCount={place.feedback.length}
        />
      </CardFooter>
    </Card>
  )
}

export default PlaceCard
