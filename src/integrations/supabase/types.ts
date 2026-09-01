export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17";
  };
  public: {
    Tables: {
      audit_events: {
        Row: {
          action: string;
          actor_email: string | null;
          created_at: string;
          detail: string | null;
          id: string;
          target_id: string | null;
          target_table: string;
        };
        Insert: {
          action: string;
          actor_email?: string | null;
          created_at?: string;
          detail?: string | null;
          id?: string;
          target_id?: string | null;
          target_table: string;
        };
        Update: {
          action?: string;
          actor_email?: string | null;
          created_at?: string;
          detail?: string | null;
          id?: string;
          target_id?: string | null;
          target_table?: string;
        };
        Relationships: [];
      };
      capabilities: {
        Row: {
          ar_name: string;
          created_at: string;
          en_name: string;
          id: string;
          slug: string;
          updated_at: string;
        };
        Insert: {
          ar_name: string;
          created_at?: string;
          en_name: string;
          id?: string;
          slug: string;
          updated_at?: string;
        };
        Update: {
          ar_name?: string;
          created_at?: string;
          en_name?: string;
          id?: string;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      claims: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          locale: string;
          project_id: string;
          updated_at: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          locale: string;
          project_id: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          locale?: string;
          project_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "claims_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "claims_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "vw_public_projects";
            referencedColumns: ["project_id"];
          },
        ];
      };
      evidence: {
        Row: {
          claim_id: string;
          created_at: string;
          id: string;
          internal_description: string | null;
          internal_link: string | null;
          updated_at: string;
        };
        Insert: {
          claim_id: string;
          created_at?: string;
          id?: string;
          internal_description?: string | null;
          internal_link?: string | null;
          updated_at?: string;
        };
        Update: {
          claim_id?: string;
          created_at?: string;
          id?: string;
          internal_description?: string | null;
          internal_link?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "evidence_claim_id_fkey";
            columns: ["claim_id"];
            isOneToOne: false;
            referencedRelation: "claims";
            referencedColumns: ["id"];
          },
        ];
      };
      leads: {
        Row: {
          audience_type: string;
          created_at: string;
          email: string;
          id: string;
          location_text: string | null;
          message: string;
          need_type: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          audience_type: string;
          created_at?: string;
          email: string;
          id?: string;
          location_text?: string | null;
          message: string;
          need_type: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          audience_type?: string;
          created_at?: string;
          email?: string;
          id?: string;
          location_text?: string | null;
          message?: string;
          need_type?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      locations: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
          lat: number;
          lng: number;
          project_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
          lat: number;
          lng: number;
          project_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
          lat?: number;
          lng?: number;
          project_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "locations_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "locations_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "vw_public_projects";
            referencedColumns: ["project_id"];
          },
        ];
      };
      media_assets: {
        Row: {
          alt_ar: string | null;
          alt_en: string | null;
          created_at: string;
          id: string;
          is_public: boolean;
          project_id: string;
          storage_path: string;
          updated_at: string;
        };
        Insert: {
          alt_ar?: string | null;
          alt_en?: string | null;
          created_at?: string;
          id?: string;
          is_public?: boolean;
          project_id: string;
          storage_path: string;
          updated_at?: string;
        };
        Update: {
          alt_ar?: string | null;
          alt_en?: string | null;
          created_at?: string;
          id?: string;
          is_public?: boolean;
          project_id?: string;
          storage_path?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "media_assets_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "media_assets_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "vw_public_projects";
            referencedColumns: ["project_id"];
          },
        ];
      };
      project_capabilities: {
        Row: {
          capability_id: string;
          created_at: string;
          project_id: string;
        };
        Insert: {
          capability_id: string;
          created_at?: string;
          project_id: string;
        };
        Update: {
          capability_id?: string;
          created_at?: string;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_capabilities_capability_id_fkey";
            columns: ["capability_id"];
            isOneToOne: false;
            referencedRelation: "capabilities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_capabilities_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_capabilities_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "vw_public_projects";
            referencedColumns: ["project_id"];
          },
        ];
      };
      projects: {
        Row: {
          classification: string;
          created_at: string;
          featured: boolean;
          id: string;
          internal_notes: string | null;
          slug: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          classification?: string;
          created_at?: string;
          featured?: boolean;
          id?: string;
          internal_notes?: string | null;
          slug: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          classification?: string;
          created_at?: string;
          featured?: boolean;
          id?: string;
          internal_notes?: string | null;
          slug?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      public_project_profiles: {
        Row: {
          challenge: string | null;
          created_at: string;
          id: string;
          locale: string;
          outcome: string | null;
          project_id: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          challenge?: string | null;
          created_at?: string;
          id?: string;
          locale: string;
          outcome?: string | null;
          project_id: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          challenge?: string | null;
          created_at?: string;
          id?: string;
          locale?: string;
          outcome?: string | null;
          project_id?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_project_profiles_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_project_profiles_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "vw_public_projects";
            referencedColumns: ["project_id"];
          },
        ];
      };
      site_settings: {
        Row: {
          created_at: string;
          id: string;
          key: string;
          updated_at: string;
          value: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          key: string;
          updated_at?: string;
          value?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          key?: string;
          updated_at?: string;
          value?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      vw_public_projects: {
        Row: {
          challenge: string | null;
          classification: string | null;
          created_at: string | null;
          locale: string | null;
          outcome: string | null;
          project_id: string | null;
          slug: string | null;
          title: string | null;
          updated_at: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
