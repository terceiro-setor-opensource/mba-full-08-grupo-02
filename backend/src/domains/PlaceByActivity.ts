import { BenefitResponse } from "./Benefit";

export interface PlaceByActivity {
  activity: {
    id: number;
    name: string;
    activity_benefit: {
      benefit: {
        id: number;
        name: string;
        description: string;
        icon: string;
      };
    }[]
  }
}

export interface BenefitsByPlaceIdResponse {
    id: number;
    place_by_activity: {
      activity: {
        id: number;
        name: string;
        activity_benefit: {
          benefit: {
            id: number;
            name: string;
            description: string;
            icon: string;
          };
        }[];
      };
    }[];
  }