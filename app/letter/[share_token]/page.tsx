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
      <style>{`
        @keyframes letter-rise {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .letter-header-icon { opacity: 0; animation: letter-rise 0.6s ease-out 0.05s forwards; }
        .letter-header-eyebrow { opacity: 0; animation: letter-rise 0.6s ease-out 0.15s forwards; }
        .letter-header-title { opacity: 0; animation: letter-rise 0.6s ease-out 0.25s forwards; }
        .letter-header-flourish { opacity: 0; animation: letter-rise 0.6s ease-out 0.35s forwards; }
        .letter-header-badge { opacity: 0; animation: letter-rise 0.6s ease-out 0.4s forwards; }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div className="letter-header-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
  <img src="/images/logo.png" alt="" width={30} height={30} />
</div>

        <p
          className="letter-header-eyebrow"
          style={{
            fontSize: 12,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-ink-soft)',
            margin: '0 0 10px 0',
          }}
        >
          A letter has arrived
        </p>

        <h1 className="letter-header-title" style={{ fontSize: 34, margin: 0 }}>
          For {letter.recipient_name}
        </h1>

        <div
          className="letter-header-flourish"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '14px 0' }}
        >
          <span style={{ width: 32, height: 1, background: 'var(--color-line)' }} />
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="3.5" fill="var(--color-accent)" opacity="0.6" />
          </svg>
          <span style={{ width: 32, height: 1, background: 'var(--color-line)' }} />
        </div>

        <span
          className="letter-header-badge"
          style={{
            display: 'inline-block',
            fontSize: 12,
            padding: '4px 14px',
            borderRadius: 999,
            border: '1px solid var(--color-line)',
            color: 'var(--color-ink-soft)',
            letterSpacing: 0.5,
          }}
        >
          {letter.is_public ? 'Shared publicly' : 'Sent privately'}
        </span>
      </div>

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
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <ShareButton shareToken={share_token} />
        </div>
      )}
    </div>
  )
}
