export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      hosts: {
        Row: {
          created_at: string
          hostName: string
          hostUrl: string | null
          id: number
        }
        Insert: {
          created_at?: string
          hostName: string
          hostUrl?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          hostName?: string
          hostUrl?: string | null
          id?: number
        }
        Relationships: []
      }
      songs: {
        Row: {
          created_at: string
          id: number
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          url?: string
        }
        Relationships: []
      }
      tokens: {
        Row: {
          app_name: string | null
          created_at: string
          id: string
          token: string
          valid_time_in_seconds: number
        }
        Insert: {
          app_name?: string | null
          created_at?: string
          id?: string
          token: string
          valid_time_in_seconds: number
        }
        Update: {
          app_name?: string | null
          created_at?: string
          id?: string
          token?: string
          valid_time_in_seconds?: number
        }
        Relationships: []
      }
      uSongs: {
        Row: {
          addedTimes: number | null
          artist: string | null
          created_at: string
          dailyVotesMinus: number
          dailyVotesPlus: number
          duration: string | null
          explicit: boolean | null
          hostId: number | null
          id: string
          songId: string | null
          status: string | null
          thumbnail: string | null
          title: string | null
          updatedAt: string | null
          url: string
          votesMinus: number
          votesPlus: number
        }
        Insert: {
          addedTimes?: number | null
          artist?: string | null
          created_at?: string
          dailyVotesMinus?: number
          dailyVotesPlus?: number
          duration?: string | null
          explicit?: boolean | null
          hostId?: number | null
          id?: string
          songId?: string | null
          status?: string | null
          thumbnail?: string | null
          title?: string | null
          updatedAt?: string | null
          url: string
          votesMinus?: number
          votesPlus?: number
        }
        Update: {
          addedTimes?: number | null
          artist?: string | null
          created_at?: string
          dailyVotesMinus?: number
          dailyVotesPlus?: number
          duration?: string | null
          explicit?: boolean | null
          hostId?: number | null
          id?: string
          songId?: string | null
          status?: string | null
          thumbnail?: string | null
          title?: string | null
          updatedAt?: string | null
          url?: string
          votesMinus?: number
          votesPlus?: number
        }
        Relationships: [
          {
            foreignKeyName: "uSongs_hostId_fkey"
            columns: ["hostId"]
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          }
        ]
      },
      uUsers: {
        Row: {
          created_at: string
          id: string
          userActions: Json | null
          userIP: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          userActions?: Json | null
          userIP?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          userActions?: Json | null
          userIP?: string | null
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



// It's convenient to have shorthands for your most-used types.
export type Song = Database["public"]["Tables"]["songs"]["Row"]
export type Host = Database["public"]["Tables"]["hosts"]["Row"]
export type USong = Database["public"]["Tables"]["uSongs"]["Row"]


// ----
export type SongInsert = Database["public"]["Tables"]["songs"]["Insert"]
export type HostInsert = Database["public"]["Tables"]["hosts"]["Insert"]
export type USongInsert = Database["public"]["Tables"]["uSongs"]["Insert"]
export type SongUpdate = Database["public"]["Tables"]["songs"]["Update"]
export type HostUpdate = Database["public"]["Tables"]["hosts"]["Update"]
export type USongUpdate = Database["public"]["Tables"]["uSongs"]["Update"]
export type SongRelationships = Database["public"]["Tables"]["songs"]["Relationships"]
export type HostRelationships = Database["public"]["Tables"]["hosts"]["Relationships"]
export type USongRelationships = Database["public"]["Tables"]["uSongs"]["Relationships"]


