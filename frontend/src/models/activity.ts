import { ActivityBenefits } from './activity_benefit'

export interface Activity {
  id: number
  name: string
  description: string
  activity_benefit?: ActivityBenefits[]
}
