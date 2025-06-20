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
      addresses: {
        Row: {
          city: string | null
          country: string | null
          id: string
          number: number | null
          state: string | null
          street: string | null
          userId: string | null
          zipCode: number | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          id: string
          number?: number | null
          state?: string | null
          street?: string | null
          userId?: string | null
          zipCode?: number | null
        }
        Update: {
          city?: string | null
          country?: string | null
          id?: string
          number?: number | null
          state?: string | null
          street?: string | null
          userId?: string | null
          zipCode?: number | null
        }
        Relationships: []
      }
      devices: {
        Row: {
          created_at: string
          id: number
          name: string | null
          numeration: string | null
          setup_date: string | null
          status: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          numeration?: string | null
          setup_date?: string | null
          status?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          numeration?: string | null
          setup_date?: string | null
          status?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "devices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plant_recommendations: {
        Row: {
          basedOn: string | null
          created_at: string
          id: number
          plantId: number | null
          text: string | null
        }
        Insert: {
          basedOn?: string | null
          created_at?: string
          id?: number
          plantId?: number | null
          text?: string | null
        }
        Update: {
          basedOn?: string | null
          created_at?: string
          id?: number
          plantId?: number | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plant_recommendations_plantId_fkey"
            columns: ["plantId"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
        ]
      }
      plants: {
        Row: {
          createdAt: string
          deviceId: number | null
          friendlyName: string | null
          id: number
          idealHumidity: number | null
          idealLuminosity: number | null
          idealLuminosityLx: number | null
          imageUri: string | null
          irrigationsPerDay: number | null
          maxTemperatureCelsius: number | null
          minTemperatureCelsius: number | null
          mlPerIrrigation: number | null
          name: string
          plantingDate: string
          species: string
          status: string | null
          updatedAt: string | null
          user_id: string | null
        }
        Insert: {
          createdAt?: string
          deviceId?: number | null
          friendlyName?: string | null
          id?: number
          idealHumidity?: number | null
          idealLuminosity?: number | null
          idealLuminosityLx?: number | null
          imageUri?: string | null
          irrigationsPerDay?: number | null
          maxTemperatureCelsius?: number | null
          minTemperatureCelsius?: number | null
          mlPerIrrigation?: number | null
          name: string
          plantingDate: string
          species: string
          status?: string | null
          updatedAt?: string | null
          user_id?: string | null
        }
        Update: {
          createdAt?: string
          deviceId?: number | null
          friendlyName?: string | null
          id?: number
          idealHumidity?: number | null
          idealLuminosity?: number | null
          idealLuminosityLx?: number | null
          imageUri?: string | null
          irrigationsPerDay?: number | null
          maxTemperatureCelsius?: number | null
          minTemperatureCelsius?: number | null
          mlPerIrrigation?: number | null
          name?: string
          plantingDate?: string
          species?: string
          status?: string | null
          updatedAt?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plants_deviceId_fkey"
            columns: ["deviceId"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sensor_data: {
        Row: {
          deviceId: number | null
          id: number
          plantId: number | null
          recordedAt: string | null
          sensorType: string | null
          value: number
        }
        Insert: {
          deviceId?: number | null
          id?: number
          plantId?: number | null
          recordedAt?: string | null
          sensorType?: string | null
          value: number
        }
        Update: {
          deviceId?: number | null
          id?: number
          plantId?: number | null
          recordedAt?: string | null
          sensorType?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "sensor_data_deviceId_fkey"
            columns: ["deviceId"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sensor_data_plantId_fkey"
            columns: ["plantId"]
            isOneToOne: false
            referencedRelation: "plants"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatarUrl: string | null
          createdAt: string | null
          email: string | null
          gender: string | null
          id: string
          name: string | null
          password: string | null
          phone: string | null
          updatedAt: string | null
          username: string | null
        }
        Insert: {
          avatarUrl?: string | null
          createdAt?: string | null
          email?: string | null
          gender?: string | null
          id: string
          name?: string | null
          password?: string | null
          phone?: string | null
          updatedAt?: string | null
          username?: string | null
        }
        Update: {
          avatarUrl?: string | null
          createdAt?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          name?: string | null
          password?: string | null
          phone?: string | null
          updatedAt?: string | null
          username?: string | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
