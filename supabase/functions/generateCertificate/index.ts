import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.4'
import { PDFDocument, StandardFonts, rgb } from 'https://cdn.skypack.dev/pdf-lib@1.17.1'

console.log(' generateCertificate function initialized.')

serve(async (req) => {
  try {
    const { user_id, full_name, ward, district, region } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Generate certificate PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 400])
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const titleFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)

    page.drawText('TANZANIA LOCAL GOVERNMENT AUTHORITY', {
      x: 70,
      y: 350,
      size: 18,
      font: titleFont,
      color: rgb(0.1, 0.1, 0.6)
    })

    page.drawText('Resident Verification Certificate', {
      x: 150,
      y: 320,
      size: 14,
      font,
      color: rgb(0, 0.6, 0.1)
    })

    page.drawText(\Certificate Holder: \\, { x: 80, y: 260, size: 12, font })
    page.drawText(\Region: \\, { x: 80, y: 240, size: 12, font })
    page.drawText(\District: \\, { x: 80, y: 220, size: 12, font })
    page.drawText(\Ward: \\, { x: 80, y: 200, size: 12, font })
    page.drawText(\Certificate No: CN-\-TZ\, {
      x: 80,
      y: 180,
      size: 12,
      font
    })

    page.drawText('Verified by Local Government Authority', {
      x: 80,
      y: 120,
      size: 10,
      font,
      color: rgb(0.2, 0.2, 0.2)
    })

    const pdfBytes = await pdfDoc.save()
    const fileName = \certificates/\_certificate.pdf\

    // Upload PDF to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('citizen_certificates')
      .upload(fileName, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('citizen_certificates')
      .getPublicUrl(fileName)

    // Update user table with certificate URL
    await supabase
      .from('citizens')
      .update({ certificate_url: publicUrl, status: 'verified' })
      .eq('user_id', user_id)

    console.log(\✅ Certificate generated for \\)

    return new Response(JSON.stringify({ success: true, url: publicUrl }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(' Error:', err)
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
