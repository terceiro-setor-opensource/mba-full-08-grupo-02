import { ActivityBenefits } from './activity_benefit'
import { Benefit } from './benefit'

export interface Activity {
  id: number
  name: string
  description: string
  activity_benefit?: ActivityBenefits[]
}
