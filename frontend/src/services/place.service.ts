import { Place } from '@/models/place'

class PlaceService {
  private url = 'http://localhost:3000/places'

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
    } as HeadersInit
  }

  private async getData(response: Response) {
    if (response.status >= 200 && response.status < 300) {
      return await response.json()
    }
    throw new Error(response.statusText, {
      cause: response.status,
    })
  }

  public async getPlaces({ search = '' }: { search?: string }) {
    const urlWithSearch = search
      ? `${this.url}?search=${encodeURIComponent(search)}`
      : this.url

    const response = await fetch(urlWithSearch, {
      method: 'GET',
      headers: this.getHeaders(),
    })

    return (await this.getData(response)) as Place[]
  }

  public async getById(id: number) {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    })
    return (await this.getData(response)) as Place
  }

  public async getByUserLocation({
    latitude,
    longitude,
    radius,
  }: {
    latitude: number
    longitude: number
    radius: number
  }) {
    const response = await fetch(
      `${this.url}?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
      {
        method: 'GET',
        headers: this.getHeaders(),
      },
    )
    return (await this.getData(response)) as Place[]
  }
}

export const placeService = new PlaceService()
