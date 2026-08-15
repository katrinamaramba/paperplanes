import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Letters",
  description:
    "Read heartfelt public letters shared by the PaperPlanes community.",
};

export default async function Feed({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams

  let lettersQuery = supabase
    .from('letters')
    .select('*, profiles(username)')
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (q) {
    lettersQuery = lettersQuery.ilike('recipient_name', `%${q}%`)
  }

  const [
    { count: totalCount },
    { data: privateCount },
    { data: letters, error },
  ] = await Promise.all([
    supabase.from('letters').select('*', { count: 'exact', head: true }).eq('is_public', true),
    supabase.rpc('get_private_letter_count'),
    lettersQuery,
  ])

  if (error) {
    return <div>Something went wrong loading letters.</div>
  }

  return (
    <div className="page-container" style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <style>{`
        @keyframes page-header-rise {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .page-header-icon { opacity: 0; animation: page-header-rise 0.6s ease-out 0.05s forwards; }
        .page-header-eyebrow { opacity: 0; animation: page-header-rise 0.6s ease-out 0.15s forwards; }
        .page-header-title { opacity: 0; animation: page-header-rise 0.6s ease-out 0.25s forwards; }
        .page-header-flourish { opacity: 0; animation: page-header-rise 0.6s ease-out 0.35s forwards; }
        .page-header-count { opacity: 0; animation: page-header-rise 0.6s ease-out 0.4s forwards; }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div className="page-header-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <img src="/images/logo.png" alt="" width={30} height={30} />
        </div>

        <p
          className="page-header-eyebrow"
          style={{
            fontSize: 12,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-ink-soft)',
            margin: '0 0 10px 0',
          }}
        >
          Shared with the world
        </p>

        <h1 className="page-header-title" style={{ fontSize: 34, margin: 0 }}>
          Letters from the Community
        </h1>

        <div
          className="page-header-flourish"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '14px 0 0 0' }}
        >
          <span style={{ width: 32, height: 1, background: 'var(--color-line)' }} />
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="3.5" fill="var(--color-accent)" opacity="0.6" />
          </svg>
          <span style={{ width: 32, height: 1, background: 'var(--color-line)' }} />
        </div>

        <p className="page-header-count" style={{ color: 'var(--color-ink-soft)', fontSize: 15, marginTop: 14, marginBottom: 0 }}>
          {totalCount ?? 0} letter{totalCount === 1 ? '' : 's'} Paper Plane has landed · {privateCount ?? 0} Letter Delivered Privately
        </p>
      </div>

      <form style={{ marginBottom: 24 }}>
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Whose letter are you looking for?"
          style={{
            width: '100%',
            padding: 10,
            border: '1px solid var(--color-line)',
            borderRadius: 8,
            fontFamily: 'var(--font-ui)',
          }}
        />
      </form>

      {q && (
        <p style={{ color: 'var(--color-ink-soft)', marginBottom: 16 }}>
          Showing results for "{q}"{' '}
          <Link href="/feed" style={{ marginLeft: 8 }}>Clear</Link>
        </p>
      )}

      {(!letters || letters.length === 0) && <p>No letters found.</p>}

      <div className="feed-grid">
        {letters && letters.map((letter) => (
          <Link
            key={letter.id}
            href={`/letter/${letter.share_token}`}
            className="letter-card feed-card envelope-card"
            style={{
              display: 'block',
              padding: 22,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div className="envelope-flap" />
            <div className="envelope-seal" />

            <h3 style={{ fontSize: 21, margin: 0 }}>A letter for {letter.recipient_name}</h3>
            <p className="feed-snippet" style={{ color: 'var(--color-ink-soft)', fontSize: 15, marginTop: 10, marginBottom: 0, lineHeight: 1.5 }}>
              {letter.content}
            </p>
            <p style={{ color: 'var(--color-ink-soft)', fontSize: 13, marginTop: 14, marginBottom: 0 }}>
              by {letter.profiles?.username} · {new Date(letter.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
