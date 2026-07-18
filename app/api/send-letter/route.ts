import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { recipientEmail, recipientName, senderName, shareToken } = await request.json()

  const letterUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/letter/${shareToken}`

  try {
    await resend.emails.send({
      from: 'PaperPlanes <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `${senderName} sent you a letter on PaperPlanes`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
          <h2>You've received a letter, ${recipientName}.</h2>
          <p>${senderName} wrote you something on PaperPlanes.</p>
          <a href="${letterUrl}" style="display: inline-block; padding: 12px 24px; background: #333; color: #fff; text-decoration: none; border-radius: 6px; margin-top: 16px;">
            Read your letter
          </a>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}