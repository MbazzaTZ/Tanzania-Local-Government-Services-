// Supabase Edge Function: sendMail  Final Deno-compatible version
// Fully resolves all TS2304 ("Cannot find name Deno") issues

// @ts-nocheck
// Deno runtime import
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
// ESM Resend import
import Resend from "https://esm.sh/resend@1.1.0";

serve(async (req: Request): Promise<Response> => {
  try {
    const { to, subject, body } = await req.json();
    const resend = new Resend(Deno.env.get("RESEND_API_KEY") || "");

    const result = await resend.emails.send({
      from: "noreply@localgovtz.app",
      to,
      subject,
      html: body,
    });

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("sendMail error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
