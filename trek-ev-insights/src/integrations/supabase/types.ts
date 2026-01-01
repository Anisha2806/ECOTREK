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
      braking_data: {
        Row: {
          braking_type: string
          created_at: string
          id: string
          intensity: number
          recovery_efficiency: number
          timestamp: string
          trip_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          braking_type: string
          created_at?: string
          id?: string
          intensity: number
          recovery_efficiency: number
          timestamp: string
          trip_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          braking_type?: string
          created_at?: string
          id?: string
          intensity?: number
          recovery_efficiency?: number
          timestamp?: string
          trip_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "braking_data_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "braking_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      braking_zones: {
        Row: {
          created_at: string
          description: string
          id: string
          latitude: number
          longitude: number
          potential_recovery: string
          recommendation: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          latitude: number
          longitude: number
          potential_recovery: string
          recommendation: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          latitude?: number
          longitude?: number
          potential_recovery?: string
          recommendation?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "braking_zones_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      energy_data: {
        Row: {
          battery_level: number
          charging_rate: number | null
          created_at: string
          energy_recovered: number | null
          estimated_range: number
          id: string
          timestamp: string
          trip_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          battery_level: number
          charging_rate?: number | null
          created_at?: string
          energy_recovered?: number | null
          estimated_range: number
          id?: string
          timestamp: string
          trip_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          battery_level?: number
          charging_rate?: number | null
          created_at?: string
          energy_recovered?: number | null
          estimated_range?: number
          id?: string
          timestamp?: string
          trip_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "energy_data_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "energy_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          accessibility_preferences: Json
          created_at: string
          dark_mode: boolean
          display_name: string | null
          id: string
          notification_preferences: Json
          updated_at: string
        }
        Insert: {
          accessibility_preferences?: Json
          created_at?: string
          dark_mode?: boolean
          display_name?: string | null
          id: string
          notification_preferences?: Json
          updated_at?: string
        }
        Update: {
          accessibility_preferences?: Json
          created_at?: string
          dark_mode?: boolean
          display_name?: string | null
          id?: string
          notification_preferences?: Json
          updated_at?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          created_at: string
          description: string
          id: string
          is_implemented: boolean
          potential_savings: string
          priority: string
          title: string
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_implemented?: boolean
          potential_savings: string
          priority: string
          title: string
          type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_implemented?: boolean
          potential_savings?: string
          priority?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          created_at: string
          distance: number | null
          efficiency_score: number | null
          end_location: string | null
          end_time: string | null
          energy_consumed: number | null
          energy_recovered: number | null
          id: string
          route_data: Json | null
          start_location: string | null
          start_time: string
          updated_at: string
          user_id: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          distance?: number | null
          efficiency_score?: number | null
          end_location?: string | null
          end_time?: string | null
          energy_consumed?: number | null
          energy_recovered?: number | null
          id?: string
          route_data?: Json | null
          start_location?: string | null
          start_time: string
          updated_at?: string
          user_id: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          distance?: number | null
          efficiency_score?: number | null
          end_location?: string | null
          end_time?: string | null
          energy_consumed?: number | null
          energy_recovered?: number | null
          id?: string
          route_data?: Json | null
          start_location?: string | null
          start_time?: string
          updated_at?: string
          user_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          battery_capacity: number
          created_at: string
          id: string
          make: string
          max_range: number
          model: string
          name: string
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          battery_capacity: number
          created_at?: string
          id?: string
          make: string
          max_range: number
          model: string
          name: string
          updated_at?: string
          user_id: string
          year: number
        }
        Update: {
          battery_capacity?: number
          created_at?: string
          id?: string
          make?: string
          max_range?: number
          model?: string
          name?: string
          updated_at?: string
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_queries: {
        Row: {
          created_at: string
          id: string
          query: string
          response: string | null
          sentiment: string | null
          success: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          query: string
          response?: string | null
          sentiment?: string | null
          success?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          query?: string
          response?: string | null
          sentiment?: string | null
          success?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_queries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
