import { Event } from './event'
import { PlaceByActivity } from './place_by_activity'

export interface Place {
  id: number
  name: string
  description: string
  addressId: number
  mapsLink: string
  linkSocial: string
  openingTime: string
  closingTime: string
  is24: boolean
  daysOfWeek: string
  restrictions: string | null
  observations: string | null
  created_at: string
  rating_avg: number | null
  image: string
  feedback: Rating[]
  address: Address
  events?: Event[]
  place_by_activity?: PlaceByActivity[]
}

type Rating = {
  rating: number
}
type Address = {
  addressnumber: string
  city: string
  complement: string | null
  id: number
  latitude: number | null
  longitude: number | null
  neighborhood: string
  postalcode: string
  reference: string | null
  state: string
  streetname: string
}
