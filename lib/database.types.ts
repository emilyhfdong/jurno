export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      entries: {
        Row: {
          created_at: string
          content: string | null
          last_updated: string
          user_id: string
          id: string
          title: string | null
          finished_at: string | null
        }
        Insert: {
          created_at?: string
          content?: string | null
          last_updated?: string
          user_id: string
          id?: string
          title?: string | null
          finished_at?: string | null
        }
        Update: {
          created_at?: string
          content?: string | null
          last_updated?: string
          user_id?: string
          id?: string
          title?: string | null
          finished_at?: string | null
        }
      }
      users: {
        Row: {
          id: string
          pin: string | null
        }
        Insert: {
          id: string
          pin?: string | null
        }
        Update: {
          id?: string
          pin?: string | null
        }
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
  }
}
