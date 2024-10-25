import { Database } from "./database.types";

type PlaceRow = Database["public"]["Tables"]["place"]["Row"];
type AddressRow = Database["public"]["Tables"]["address"]["Row"];

export type ExtendedPlace = PlaceRow & {
  imageUrl: string | null; 
  rating: number | null; 
  address: AddressRow
};

export default PlaceRow;
