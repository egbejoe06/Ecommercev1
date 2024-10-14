import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mhjacvdkwtenzebvtory.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oamFjdmRrd3RlbnplYnZ0b3J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4NjM2MTMsImV4cCI6MjA0NDQzOTYxM30.O3VusMkvRoxJ2CtG226l0bDaxu2vUUIXwvss-9n67P4"

export const supabase = createClient(supabaseUrl,supabaseKey)