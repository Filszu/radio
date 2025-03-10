export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      hosts: {
        Row: {
          created_at: string
          creatorId: string
          featured: number | null
          hostDescription: string
          hostName: string
          hostUrl: string
          id: number
          keyWords: string | null
          logoUrl: string | null
          premiumStatus: number
          repeat: string
          supportedMusicServices: number[]
          votingFinishAt: string | null
        }
        Insert: {
          created_at?: string
          creatorId: string
          featured?: number | null
          hostDescription?: string
          hostName: string
          hostUrl: string
          id?: number
          keyWords?: string | null
          logoUrl?: string | null
          premiumStatus?: number
          repeat?: string
          supportedMusicServices?: number[]
          votingFinishAt?: string | null
        }
        Update: {
          created_at?: string
          creatorId?: string
          featured?: number | null
          hostDescription?: string
          hostName?: string
          hostUrl?: string
          id?: number
          keyWords?: string | null
          logoUrl?: string | null
          premiumStatus?: number
          repeat?: string
          supportedMusicServices?: number[]
          votingFinishAt?: string | null
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
          },
        ]
      }
      partyCreators: {
        Row: {
          created_at: string
          id: string
          premiumStatus: number | null
          premiumUntil: string | null
          promoCode: string | null
          ref: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          premiumStatus?: number | null
          premiumUntil?: string | null
          promoCode?: string | null
          ref?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          premiumStatus?: number | null
          premiumUntil?: string | null
          promoCode?: string | null
          ref?: string | null
          username?: string | null
        }
        Relationships: []
      }
      playlists: {
        Row: {
          created_at: string
          id: number
          party_id: number
          song_id: string
        }
        Insert: {
          created_at: string
          id?: number
          party_id: number
          song_id: string
        }
        Update: {
          created_at?: string
          id?: number
          party_id?: number
          song_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlists_party_id_fkey"
            columns: ["party_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlists_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "uSongs"
            referencedColumns: ["id"]
          },
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
      timeTable: {
        Row: {
          created_at: string
          currentPlaylistId: number
          hostid: number
          id: string
          isOn: boolean
          timeRules: Json
        }
        Insert: {
          created_at?: string
          currentPlaylistId?: number
          hostid: number
          id?: string
          isOn?: boolean
          timeRules: Json
        }
        Update: {
          created_at?: string
          currentPlaylistId?: number
          hostid?: number
          id?: string
          isOn?: boolean
          timeRules?: Json
        }
        Relationships: [
          {
            foreignKeyName: "timeTable_hostid_fkey"
            columns: ["hostid"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
        ]
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
          updated_at: string | null
          USongId: string
          votesMinus: number
          votesPlus: number
        }
        Insert: {
          created_at?: string
          id?: string
          partyId: number
          status?: string
          updated_at?: string | null
          USongId: string
          votesMinus?: number
          votesPlus?: number
        }
        Update: {
          created_at?: string
          id?: string
          partyId?: number
          status?: string
          updated_at?: string | null
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
          },
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
      party_aggregates: {
        Row: {
          total_hosts: number | null
          total_party_creators: number | null
          total_songs: number | null
          total_votes: number | null
          total_votes_minus: number | null
          total_votes_plus: number | null
        }
        Relationships: []
      }
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
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
