import { Activity } from './activity'
import { Benefit } from './benefit'

export interface ActivityBenefits {
  id: number
  activityId: number
  benefitId: number
  benefit?: Benefit
}
