import React, { Dispatch, SetStateAction, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { Radio, HStack, Box } from '@chakra-ui/react'
interface Props {
  rating: number
  setRating: Dispatch<SetStateAction<number>>
  count?: number
  size?: number
}
export default function StarRatingSelection({
  rating,
  setRating,
  count = 0,
  size = 20,
}: Props) {
  // count:  number of stars you want, pass as props
  //size: size of star that you want

  const [hover, setHover] = useState<null | number>(null)
  return (
    <HStack spacing={'2px'}>
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1
        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <FaStar
              onClick={() => setRating(ratingValue)}
              cursor={'pointer'}
              size={size || 20}
            />
          </Box>
        )
      })}
    </HStack>
  )
}
