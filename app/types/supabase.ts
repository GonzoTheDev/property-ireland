// Minimal Supabase Database types used in this app
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          user_id: string;
          name: string | null;
          phone: string | null;
          bio: string | null;
          company: string | null;
          county: string | null;
          town: string | null;
          address_line1: string | null;
          address_line2: string | null;
          eircode: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { user_id: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      listings: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: "SALE" | "RENT";
          price: number;
          bedrooms: number;
          bathrooms: number;
          area_sqm: number | null;
          furnished: boolean | null;
          address_line1: string;
          address_line2: string | null;
          town: string;
          county: string;
          eircode: string | null;
          latitude: number | null;
          longitude: number | null;
          amenities: unknown;
          user_id: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["listings"]["Row"]> & {
          title: string;
          description: string;
          type: "SALE" | "RENT";
          price: number;
          bedrooms: number;
          bathrooms: number;
          address_line1: string;
          town: string;
          county: string;
          user_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["listings"]["Row"]>;
      };
      listings_images: {
        Row: { id: string; url: string; order_index: number; listing_id: string };
        Insert: { url: string; order_index?: number; listing_id: string };
        Update: Partial<Database["public"]["Tables"]["listings_images"]["Insert"]>;
      };
      favorites: {
        Row: { id: string; user_id: string; listing_id: string; created_at: string | null };
        Insert: { listing_id: string; user_id?: string };
        Update: Partial<Database["public"]["Tables"]["favorites"]["Insert"]>;
      };
      contact_messages: {
        Row: { id: string; listing_id: string; sender_user_id: string | null; message: string; created_at: string | null };
        Insert: { listing_id: string; sender_user_id?: string | null; message: string };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
      };
    };
  };
};



