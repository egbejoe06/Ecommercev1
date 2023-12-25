import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xpfkskqtvobnuiyjcqzz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwZmtza3F0dm9ibnVpeWpjcXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0MTgzMDQsImV4cCI6MjAxODk5NDMwNH0.s8UqxI3wKfXxeceXxYj3yz7F7hbarCFywtTur-aqrhk";

export const supabase = createClient(supabaseUrl,supabaseKey)