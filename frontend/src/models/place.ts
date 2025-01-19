import { Event } from './event'
import { Feedback } from './feedback'
import { PlaceByActivity } from './place_by_activity'

export interface Place {
  id: number
  name: string
  description: string
  address_id: number
  maps_link: string
  link_social: string
  opening_time: string
  closing_time: string
  is_24: boolean
  days_of_week: string
  restrictions: string | null
  observations: string | null
  created_at: string
  rating_avg: number | null
  image: string
  feedback: Feedback[]
  address: Address
  events?: Event[]
  place_by_activity?: PlaceByActivity[]
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
