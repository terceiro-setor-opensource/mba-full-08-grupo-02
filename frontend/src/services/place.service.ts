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
  private basePath = '/places'
  private baseFavoritePlacePath = '/favorite_places'

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

  public async getByPlaceIdAndUserId(userid: number, placeid: number): Promise<Place> {
    try {
      const response = await api.get(`${this.basePath}/${userid}/${placeid}`)
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

  public async postFavoritePlace({
    placeid,
    userid,
  }: {
    placeid: string
    userid: string
  }): Promise<Place[]> {
    try {
      let response
      response = await api.post(this.baseFavoritePlacePath, {
        placeid: parseInt(placeid,10), 
        userid: parseInt(userid,10), 
      })

      localStorage.setItem("favoriteid", response.data.data[0].id)

      return response.data
    } catch (error: any) {
      localStorage.setItem("ERRO", error)
      this.handleError(error)
    }
  }

  public async removeFavoritePlace({
    favoriteId,
  }: {
    favoriteId: string
  }): Promise<Place[]> {
    try {
      const response = await api.delete(this.baseFavoritePlacePath, {
        data: { favoriteId: parseInt(favoriteId, 10) }
      })
      return response.data
    } catch (error: any) {
      this.handleError(error)
    }
  }

  public async isFavoritePlace({
    placeid,
    userid,
  }: {
    placeid: string;
    userid: string;
  }): Promise<boolean> {
    try {
      const response = await api.get(this.baseFavoritePlacePath + "/isFavorite/" + placeid + "/",  {
        params: { userid },
      });
      if(!response.data){
        console.error('Retorno da API inválido')
      }
      // Retorna diretamente o valor de "isFavorite" (isFavorite)
      localStorage.setItem("favoriteid", response.data.id)
      return response.data.isFavorite
    } catch (error: any) {
      this.handleError(error);
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
