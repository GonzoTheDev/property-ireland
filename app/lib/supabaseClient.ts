"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/app/types/supabase";

export const supabase = createClientComponentClient<Database>();


