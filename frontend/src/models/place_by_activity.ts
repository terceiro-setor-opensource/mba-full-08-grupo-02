import { Activity } from './activity'

export interface PlaceByActivity {
  id: number
  placeId: number
  activityId: number
  activity?: Activity
}
