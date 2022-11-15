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
        }
        Insert: {
          created_at?: string
          content?: string | null
          last_updated?: string
          user_id: string
          id?: string
          title?: string | null
        }
        Update: {
          created_at?: string
          content?: string | null
          last_updated?: string
          user_id?: string
          id?: string
          title?: string | null
        }
      }
      users: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
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
