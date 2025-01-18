import { Place } from '@/models/place'
import api from './api'

export interface SelectFilter {
  pg?: number
  order_by?: string
  order?: string
  searchByNameDescription?: string
  searchBySportId?: number
  searchByCity?: string
}

class PlaceService {
  private basePath = '/places' // Base path for places

  public async getPlaces({
    filter = {},
  }: {
    filter: SelectFilter
  }): Promise<Place[]> {
    try {
      const response = await api.get(this.basePath, {
        params: { filter },
      })
      return response.data
    } catch (error: any) {
      this.handleError(error)
    }
  }

  public async getById(id: number): Promise<Place> {
    try {
      const response = await api.get(`${this.basePath}/${id}`)
      return response.data
    } catch (error: any) {
      this.handleError(error)
    }
  }

  public async getByUserLocation({
    latitude,
    longitude,
    radius,
  }: {
    latitude: number
    longitude: number
    radius: number
  }): Promise<Place[]> {
    try {
      const response = await api.get(this.basePath, {
        params: { latitude, longitude, radius },
      })
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

export const placeService = new PlaceService()
