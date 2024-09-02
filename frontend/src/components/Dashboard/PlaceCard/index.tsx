import { Image, Text } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import StarRating from '@/components/commons/StarRating'

const PlaceCard: React.FC<PlaceCardProps> = ({
  imageUrl,
  title,
  address,
  rating,
  reviewCount,
}: PlaceCardProps) => {
  return (
    <Card>
      <CardHeader padding={0} borderTopEndRadius={4} borderTopStartRadius={4}>
        <Image
          src={imageUrl}
          alt={title}
          objectFit="cover"
          width="100%"
          height="200px"
          borderTopEndRadius={4}
          borderTopStartRadius={4}
        />
      </CardHeader>
      <CardBody textAlign={'start'} paddingBottom={0}>
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text color="gray.600" fontSize="sm">
          {address}
        </Text>
      </CardBody>
      <CardFooter>
        <StarRating rating={rating} reviewCount={reviewCount} />
      </CardFooter>
    </Card>
  )
}

export default PlaceCard
