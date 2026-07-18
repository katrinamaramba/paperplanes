import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function Feed({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams

  const { count: totalCount } = await supabase
    .from('letters')
    .select('*', { count: 'exact', head: true })
    .eq('is_public', true)

  let query = supabase
    .from('letters')
    .select('*, profiles(username)')
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  if (q) {
    query = query.ilike('recipient_name', `%${q}%`)
  }

  const { data: letters, error } = await query

  if (error) {
    return <div>Something went wrong loading letters.</div>
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 20 }}>
      <h1>Letters from the Community</h1>
      <p style={{ color: 'var(--color-ink-soft)', fontFamily: 'var(--font-instrument)', marginTop: -8, marginBottom: 24 }}>
        {totalCount ?? 0} letter{totalCount === 1 ? '' : 's'} shared so far
      </p>

      <form style={{ marginBottom: 24 }}>
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by recipient's name..."
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

      {letters.length === 0 && <p>No letters found.</p>}

      {letters.map((letter) => (
        <Link
          key={letter.id}
          href={`/letter/${letter.share_token}`}
          className="letter-card"
          style={{
            display: 'block',
            padding: 16,
            marginBottom: 16,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <h3>A letter for {letter.recipient_name}</h3>
          <p style={{ color: 'var(--color-ink-soft)', fontSize: 14 }}>
            by {letter.profiles?.username}
          </p>
        </Link>
      ))}
    </div>
  )
}