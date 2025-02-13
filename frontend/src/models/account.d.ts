export interface Account {
  id: string
  name: string
  email: string
  phone_number?: string
  account_type_id: number
}

export interface Profile {
  id: string
  name: string
  email: string
  phone_number?: string
  account_type_id: number
  profile_image?: string
  birthdate?: string
  address?: {
    streetname: string
    addressnumber: string
    reference: string
    latitude: string
    longitude: string
    neighborhood: string
    city: string
    state: string
    postalcode: string
  }
}
