import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../supabase-config";

const { userRole, userMeta } = useAuth();

async function fetchApplications() {
  let query = supabase.from("applications").select("*").order("created_at", { ascending: false });

  if (userRole === "staff") {
    // filter by assigned LG level
    if (userMeta.village) query = query.eq("village", userMeta.village);
    else if (userMeta.ward) query = query.eq("ward", userMeta.ward);
    else if (userMeta.district) query = query.eq("district", userMeta.district);
    else if (userMeta.region) query = query.eq("region", userMeta.region);
  }

  const { data, error } = await query;
  if (error) console.error(error.message);
  return data;
}
