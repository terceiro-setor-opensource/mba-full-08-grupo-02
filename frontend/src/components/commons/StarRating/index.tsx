import { HStack, Icon, Text } from '@chakra-ui/react'
import { AiFillStar } from 'react-icons/ai'

interface StarRatingProps {
  rating: number
  reviewCount?: number
  maxRating?: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating, reviewCount, maxRating = 5 }) => {
  return (
    <HStack spacing="1" alignItems="center">
      <HStack spacing="0.5" color="yellow.400">
        {Array.from({ length: maxRating }, (_, i) => (
          <Icon as={AiFillStar} key={i} color={i < rating ? 'yellow.400' : 'gray.300'} />
        ))}
      </HStack>
      {reviewCount !== undefined && (
        <Text fontSize="sm" color="gray.600">
          ({reviewCount})
        </Text>
      )}
    </HStack>
  )
}

export default StarRating
