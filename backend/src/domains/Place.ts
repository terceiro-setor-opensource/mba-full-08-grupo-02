type PlaceResponse = {
  id: number;
  name: string;
  description: string;
  addressId: number;
  mapsLink?: string;
  linkSocial?: string;
  openingTime: string;
  closingTime: string;
  is24?: boolean;
  daysOfWeek: string;
  restrictions?: string;
  observations?: string;
};

export default PlaceResponse;
