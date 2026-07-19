import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { recipientEmail, recipientName, senderName, shareToken } = await request.json()

  const letterUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/letter/${shareToken}`

  try {
    await resend.emails.send({
      from: 'PaperPlanes <letters@paperplanes.ink>',
      to: recipientEmail,
      subject: `${senderName} sent you a letter on PaperPlanes`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 480px; margin: 0 auto; background-color: #F5F3ED; padding: 40px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border: 1px solid #DAD4C5; border-radius: 4px;">
            <tr>
              <td style="padding: 40px 36px;">
                <p style="font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: #6B6558; margin: 0 0 24px 0;">
                  PaperPlanes
                </p>

                <h1 style="font-size: 22px; color: #2E2A26; margin: 0 0 16px 0; font-weight: normal;">
                  A letter has arrived for you, ${recipientName}.
                </h1>

                <p style="font-size: 15px; line-height: 1.6; color: #2E2A26; margin: 0 0 32px 0;">
                  ${senderName} wrote you something. Some things are better read than told —
                  open it when you have a quiet moment.
                </p>

                <a href="${letterUrl}" style="display: inline-block; padding: 14px 28px; background-color: #8B3A3A; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 15px;">
                  Read your letter
                </a>

                <p style="font-size: 12px; color: #6B6558; margin: 32px 0 0 0;">
                  This letter was sent privately, just for you.
                </p>
              </td>
            </tr>
          </table>

          <p style="text-align: center; font-size: 12px; color: #6B6558; margin-top: 24px;">
            PaperPlanes — Letters worth sending.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}