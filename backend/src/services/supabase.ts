import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yioducmrbkinemvbshzy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpb2R1Y21yYmtpbmVtdmJzaHp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzMTA4MDksImV4cCI6MjAzODg4NjgwOX0.J5oNoNvBfWoS6Byxar8aY1j07TOXuT1EmiJkziacNXU";

export const supabase = createClient(supabaseUrl, supabaseKey);
