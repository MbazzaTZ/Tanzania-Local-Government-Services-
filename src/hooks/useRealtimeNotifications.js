// src/hooks/useRealtimeNotifications.js
import { useEffect } from "react";
import { supabase } from "../supabase-config";
import toast from "react-hot-toast";

export function useRealtimeNotifications() {
  useEffect(() => {
    const channel = supabase
      .channel("approval_notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: ["cases", "permits", "payments"],
        },
        (payload) => {
          const newStatus =
            payload.new.status || payload.new.verification_status;
          if (newStatus === "approved")
            toast.success("✅ Your request was approved");
          else if (newStatus === "declined")
            toast.error("❌ Your request was declined");
          else if (newStatus === "escalated")
            toast("⚠️ Your request was escalated for review");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
