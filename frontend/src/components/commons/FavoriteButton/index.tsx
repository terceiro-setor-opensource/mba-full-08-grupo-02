import { IconButton } from '@chakra-ui/react'
import { TiHeartOutline } from 'react-icons/ti'

export const FavoriteButton = () => {
  return (
    <IconButton aria-label="Favorite" rounded="full" variant="outline">
      <TiHeartOutline width="100%" />
    </IconButton>
  )
}
