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
      hosts: {
        Row: {
          created_at: string
          hostDescription: string
          hostName: string
          hostUrl: string
          id: number
        }
        Insert: {
          created_at?: string
          hostDescription?: string
          hostName: string
          hostUrl: string
          id?: number
        }
        Update: {
          created_at?: string
          hostDescription?: string
          hostName?: string
          hostUrl?: string
          id?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          id: string
          message: string | null
          partyId: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          partyId?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          partyId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_messages_partyId_fkey"
            columns: ["partyId"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          }
        ]
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
      uPartySongs: {
        Row: {
          created_at: string
          id: string
          partyId: number
          status: string
          USongId: string
          votesMinus: number
          votesPlus: number
        }
        Insert: {
          created_at?: string
          id?: string
          partyId: number
          status?: string
          USongId: string
          votesMinus?: number
          votesPlus?: number
        }
        Update: {
          created_at?: string
          id?: string
          partyId?: number
          status?: string
          USongId?: string
          votesMinus?: number
          votesPlus?: number
        }
        Relationships: [
          {
            foreignKeyName: "uPartySongs_partyId_fkey"
            columns: ["partyId"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "uPartySongs_USongId_fkey"
            columns: ["USongId"]
            isOneToOne: false
            referencedRelation: "uSongs"
            referencedColumns: ["id"]
          }
        ]
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
          id: string
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
          id?: string
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
          id?: string
          status?: string | null
          thumbnail?: string | null
          title?: string | null
          updatedAt?: string | null
          url?: string
          votesMinus?: number
          votesPlus?: number
        }
        Relationships: []
      }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never




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

export type UPartySong = Database["public"]["Tables"]["uPartySongs"]["Row"]


