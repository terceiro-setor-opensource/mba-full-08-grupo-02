export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account: {
        Row: {
          account_type_id: number | null
          email: string
          id: number
          password: string
          phone_number: string | null
        }
        Insert: {
          account_type_id?: number | null
          email: string
          id?: never
          password: string
          phone_number?: string | null
        }
        Update: {
          account_type_id?: number | null
          email?: string
          id?: never
          password?: string
          phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_account_type_id_fkey"
            columns: ["account_type_id"]
            isOneToOne: false
            referencedRelation: "account_type"
            referencedColumns: ["id"]
          },
        ]
      }
      account_type: {
        Row: {
          id: number
          permissions: string | null
          type: string
        }
        Insert: {
          id?: never
          permissions?: string | null
          type: string
        }
        Update: {
          id?: never
          permissions?: string | null
          type?: string
        }
        Relationships: []
      }
      activity: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: never
          name: string
        }
        Update: {
          description?: string | null
          id?: never
          name?: string
        }
        Relationships: []
      }
      activity_benefit: {
        Row: {
          activity_id: number | null
          benefit_id: number | null
          id: number
        }
        Insert: {
          activity_id?: number | null
          benefit_id?: number | null
          id?: never
        }
        Update: {
          activity_id?: number | null
          benefit_id?: number | null
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "activity_benefit_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_benefit_benefit_id_fkey"
            columns: ["benefit_id"]
            isOneToOne: false
            referencedRelation: "benefit"
            referencedColumns: ["id"]
          },
        ]
      }
      address: {
        Row: {
          addressnumber: string
          city: string
          complement: string | null
          id: number
          latitude: number | null
          longitude: number | null
          neighborhood: string
          postalcode: string
          reference: string | null
          state: string
          streetname: string
        }
        Insert: {
          addressnumber: string
          city: string
          complement?: string | null
          id?: never
          latitude?: number | null
          longitude?: number | null
          neighborhood: string
          postalcode: string
          reference?: string | null
          state: string
          streetname: string
        }
        Update: {
          addressnumber?: string
          city?: string
          complement?: string | null
          id?: never
          latitude?: number | null
          longitude?: number | null
          neighborhood?: string
          postalcode?: string
          reference?: string | null
          state?: string
          streetname?: string
        }
        Relationships: []
      }
      benefit: {
        Row: {
          description: string
          id: number
          name: string
        }
        Insert: {
          description: string
          id?: never
          name: string
        }
        Update: {
          description?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      event: {
        Row: {
          id: number
          name: string | null
          placeid: number | null
          url: string | null
        }
        Insert: {
          id?: never
          name?: string | null
          placeid?: number | null
          url?: string | null
        }
        Update: {
          id?: never
          name?: string | null
          placeid?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_placeid_fkey"
            columns: ["placeid"]
            isOneToOne: false
            referencedRelation: "place"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_place: {
        Row: {
          id: number
          placeid: number | null
          userid: number | null
        }
        Insert: {
          id?: never
          placeid?: number | null
          userid?: number | null
        }
        Update: {
          id?: never
          placeid?: number | null
          userid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "favorite_place_placeid_fkey"
            columns: ["placeid"]
            isOneToOne: false
            referencedRelation: "place"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_place_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          description: string | null
          id: number
          placeid: number | null
          rating: number
          userid: number | null
        }
        Insert: {
          description?: string | null
          id?: never
          placeid?: number | null
          rating: number
          userid?: number | null
        }
        Update: {
          description?: string | null
          id?: never
          placeid?: number | null
          rating?: number
          userid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_placeid_fkey"
            columns: ["placeid"]
            isOneToOne: false
            referencedRelation: "place"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback_image: {
        Row: {
          feedbackid: number | null
          id: number
          imageid: number | null
        }
        Insert: {
          feedbackid?: number | null
          id?: never
          imageid?: number | null
        }
        Update: {
          feedbackid?: number | null
          id?: never
          imageid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_image_feedbackid_fkey"
            columns: ["feedbackid"]
            isOneToOne: false
            referencedRelation: "feedback"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_image_imageid_fkey"
            columns: ["imageid"]
            isOneToOne: false
            referencedRelation: "image"
            referencedColumns: ["id"]
          },
        ]
      }
      image: {
        Row: {
          description: string | null
          id: number
          name: string
          recommendations: string | null
        }
        Insert: {
          description?: string | null
          id?: never
          name: string
          recommendations?: string | null
        }
        Update: {
          description?: string | null
          id?: never
          name?: string
          recommendations?: string | null
        }
        Relationships: []
      }
      place: {
        Row: {
          addressId: number
          closingTime: string
          created_at: string
          daysOfWeek: string
          description: string
          id: number
          is24: boolean | null
          linkSocial: string | null
          mapsLink: string | null
          name: string
          observations: string | null
          openingTime: string
          restrictions: string | null
        }
        Insert: {
          addressId: number
          closingTime: string
          created_at?: string
          daysOfWeek: string
          description: string
          id?: number
          is24?: boolean | null
          linkSocial?: string | null
          mapsLink?: string | null
          name: string
          observations?: string | null
          openingTime: string
          restrictions?: string | null
        }
        Update: {
          addressId?: number
          closingTime?: string
          created_at?: string
          daysOfWeek?: string
          description?: string
          id?: number
          is24?: boolean | null
          linkSocial?: string | null
          mapsLink?: string | null
          name?: string
          observations?: string | null
          openingTime?: string
          restrictions?: string | null
        }
        Relationships: []
      }
      place_by_activity: {
        Row: {
          activityid: number | null
          id: number
          placeid: number | null
        }
        Insert: {
          activityid?: number | null
          id?: never
          placeid?: number | null
        }
        Update: {
          activityid?: number | null
          id?: never
          placeid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "place_by_activity_activityid_fkey"
            columns: ["activityid"]
            isOneToOne: false
            referencedRelation: "activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "place_by_activity_placeid_fkey"
            columns: ["placeid"]
            isOneToOne: false
            referencedRelation: "place"
            referencedColumns: ["id"]
          },
        ]
      }
      place_image: {
        Row: {
          id: number
          imageid: number | null
          placeid: number | null
        }
        Insert: {
          id?: never
          imageid?: number | null
          placeid?: number | null
        }
        Update: {
          id?: never
          imageid?: number | null
          placeid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "place_image_imageid_fkey"
            columns: ["imageid"]
            isOneToOne: false
            referencedRelation: "image"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "place_image_placeid_fkey"
            columns: ["placeid"]
            isOneToOne: false
            referencedRelation: "place"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          accountid: number | null
          addressid: number | null
          birthdate: string | null
          id: number
          name: string
        }
        Insert: {
          accountid?: number | null
          addressid?: number | null
          birthdate?: string | null
          id?: never
          name: string
        }
        Update: {
          accountid?: number | null
          addressid?: number | null
          birthdate?: string | null
          id?: never
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_accountid_fkey"
            columns: ["accountid"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_addressid_fkey"
            columns: ["addressid"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
