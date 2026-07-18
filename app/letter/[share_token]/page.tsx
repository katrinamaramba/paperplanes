import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ShareButton from '@/components/ShareButton'

export default async function LetterPage({ params }: { params: Promise<{ share_token: string }> }) {
  const { share_token } = await params

  const { data, error } = await supabase
    .rpc('get_letter_by_token', { token: share_token })
    .single()

  if (error || !data) {
    notFound()
  }

  const letter = data as any

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h1>A letter for {letter.recipient_name}</h1>

      {letter.is_public ? (
        letter.author_username && (
          <p style={{ color: 'var(--color-ink-soft)', marginTop: -10 }}>
            Written by {letter.author_username}
          </p>
        )
      ) : (
        letter.sender_name && (
          <p className="signature" style={{ marginTop: -10 }}>
            From {letter.sender_name}
          </p>
        )
      )}

      <div className="letter-card" style={{ padding: 32, marginTop: 24 }}>
        <p className="letter-content" style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
          {letter.content}
        </p>
      </div>

      {letter.is_public && (
        <div style={{ marginTop: 32 }}>
          <ShareButton shareToken={share_token} />
        </div>
      )}
    </div>
  )
}