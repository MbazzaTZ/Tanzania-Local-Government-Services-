// supabase/functions/sendMail/index.ts
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { Resend } from "npm:resend@1.1.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  const body = await req.json();

  try {
    await resend.emails.send({
      from: "no-reply@lgportal.go.tz",
      to: body.to,
      subject: body.subject,
      html: body.html,
    });
    return new Response("Email sent", { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
