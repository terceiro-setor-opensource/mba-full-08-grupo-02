import api from './api'

export interface getBenefitsByPlaceIdResponse {
  activities: string[],
  benefits: {
    id: number,
    name: string,
    description: string,
    activity: string
    icon: string
    color: string
  }[]
}
class BenefitService {
  public async getBenefitsByPlaceId(id: string): Promise<getBenefitsByPlaceIdResponse> {
    try {
      const response = await api.get(`/places/${id}/benefits`)
      return response.data
    } catch (error: any) {
      this.handleError(error)
    }
  }
  private handleError(error: any): never {
    if (error.response) {
      throw new Error(error.response.data?.message || error.response.statusText)
    } else if (error.request) {
      throw new Error('No response from server')
    } else {
      throw new Error(error.message)
    }
  }
}

export const benefitService = new BenefitService()
