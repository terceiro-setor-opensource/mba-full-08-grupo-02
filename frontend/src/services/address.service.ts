export interface AddressByPostalCodeResponseT {
  cep: string
  address_type: string
  address_name: string
  address: string
  state: string
  district: string
  lat: string
  lng: string
  city: string
  city_ibge: string
  ddd: string
}

export const getAddressByPostalCode = async (postalcode: string) => {
  if(!postalcode) {
    return;
  }
  const validPostalCode = postalcode.replace(/\D/g, '');

  const response = await fetch(`https://cep.awesomeapi.com.br/json/${validPostalCode}`);

  if(!response.ok) {
    return;
  }

  const data = await response.json();

  return data as AddressByPostalCodeResponseT;
}