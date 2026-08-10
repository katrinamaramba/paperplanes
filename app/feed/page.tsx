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
      <h1 style={{ fontSize: 32 }}>Letters from the Community</h1>
      <p style={{ color: 'var(--color-ink-soft)', fontSize: 16, marginTop: -8, marginBottom: 24 }}>
        {totalCount ?? 0} letter{totalCount === 1 ? '' : 's'} Paper Plane has landed · {privateCount ?? 0} Letter Delivered Privately
      </p>

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
