import { cookies } from "next/headers";
import { createRouteHandlerClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/app/types/supabase";

export function createSupabaseRouteClient() {
  return createRouteHandlerClient<Database>({ cookies });
}

export function createSupabaseServerComponentClient() {
  return createServerComponentClient<Database>({ cookies });
}


