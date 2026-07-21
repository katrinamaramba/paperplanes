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
      <h1 style={{ fontSize: 32 }}>A letter for {letter.recipient_name}</h1>

      <div className="letter-card" style={{ padding: 32, marginTop: 24 }}>
        <p className="letter-content" style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
          {letter.content}
        </p>

        <p
          className="signature"
          style={{ textAlign: 'right', marginTop: 24, marginBottom: 0 }}
        >
          {letter.is_public ? letter.author_username : letter.sender_name}
        </p>
        <p style={{ textAlign: 'right', fontSize: 13, color: 'var(--color-ink-soft)', marginTop: 4, marginBottom: 0 }}>
          {new Date(letter.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
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
