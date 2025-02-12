import { User } from './user'

export interface Feedback {
  id?: number
  placeid: number
  userid: number
  rating: number
  description: string
  users?: User
}
