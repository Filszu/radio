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
      uSongs: {
        Row: {
          artist: string | null
          created_at: string
          dailyVotesMinus: number | null
          dailyVotesPlus: number | null
          duration: string | null
          explicit: boolean | null
          hostId: number | null
          id: string
          songId: string | null
          thumbnail: number | null
          title: string | null
          url: string
          votesMinus: number | null
          votesPlus: number | null
        }
        Insert: {
          artist?: string | null
          created_at?: string
          dailyVotesMinus?: number | null
          dailyVotesPlus?: number | null
          duration?: string | null
          explicit?: boolean | null
          hostId?: number | null
          id?: string
          songId?: string | null
          thumbnail?: number | null
          title?: string | null
          url: string
          votesMinus?: number | null
          votesPlus?: number | null
        }
        Update: {
          artist?: string | null
          created_at?: string
          dailyVotesMinus?: number | null
          dailyVotesPlus?: number | null
          duration?: string | null
          explicit?: boolean | null
          hostId?: number | null
          id?: string
          songId?: string | null
          thumbnail?: number | null
          title?: string | null
          url?: string
          votesMinus?: number | null
          votesPlus?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "uSongs_hostId_fkey"
            columns: ["hostId"]
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          }
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
