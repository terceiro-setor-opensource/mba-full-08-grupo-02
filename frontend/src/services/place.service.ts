import { Place } from '@/models/place'
import api from './api'

export interface SelectFilter {
  pg?: number
  order_by?: string
  order?: string
  searchByNameDescription?: string
  searchBySportId?: number
  searchByCity?: string
  city?: string
  name?: string
  sport?: number
}

class PlaceService {
  private basePath = '/places'

  public async getPlaces({
    filter = {},
  }: {
    filter: SelectFilter
  }): Promise<Place[]> {
    try {
      const response = await api.get(this.basePath, {
        params: { ...filter },
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
  public async getDetails(id: number): Promise<Place> {
    if(!id) {
      throw new Error('Id is required')
    }
    try {
      const response = await api.get(`${this.basePath}/${id}/details`)
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

  public async createPlace(newPlace: Place): Promise<Place> {
    try {
      const response = await api.post(this.basePath, newPlace);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  public async updatePlace(place: Place): Promise<Place> {
    try {
      const response = await api.put(`${this.basePath}/${place.id}`, place);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  public async deletePlace(id: number): Promise<void> {
    try {
      await api.delete(`${this.basePath}/${id}`);
    } catch (error: any) {
      this.handleError(error
      );
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
