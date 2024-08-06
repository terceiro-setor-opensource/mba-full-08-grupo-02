import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xnxodstfswbirmveltbx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhueG9kc3Rmc3diaXJtdmVsdGJ4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTE2Nzg4MywiZXhwIjoyMDM2NzQzODgzfQ.mzJxtuNEYPDUeY_PlYwKSaDm6TGJmpMMt2tT7LM-gv8";

export const supabase = createClient(supabaseUrl, supabaseKey);
