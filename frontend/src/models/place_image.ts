import { Image } from './image'

export interface PlaceImage {
  id: number
  placeId: number
  imageId: number
  image?: Image
}
