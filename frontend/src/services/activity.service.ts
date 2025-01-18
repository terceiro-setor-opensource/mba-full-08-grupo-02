import api from './api'
import { Activity } from '@/models/activity'

export interface SelectFilter {
  pg?: number
  order_by?: string
  order?: string
  searchByNameDescription?: string
  searchBySportId?: number
  searchByCity?: string
}

class ActivityService {
  private basePath = '/activity' // Base path for activities

  public async getActivities(): Promise<Activity[]> {
    try {
      const response = await api.get(this.basePath)
      return response.data
    } catch (error: any) {
      this.handleError(error)
    }
  }

  public async getById(id: number): Promise<Activity> {
    try {
      const response = await api.get(`${this.basePath}/${id}`)
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

export const activityService = new ActivityService()
