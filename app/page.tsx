import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ maxWidth: 700, margin: '80px auto', padding: 20, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <img
       src="/images/logo.png"
  alt="Paper plane"
  className="drift-plane"
  style={{ top: 40, width: 40, height: 40 }}
/>

      <h1 style={{ fontSize: 40, marginBottom: 16 }}>PaperPlanes</h1>
      <p style={{ fontSize: 18, color: 'var(--color-ink-soft)', marginBottom: 40, lineHeight: 1.6 }}>
        Write a letter to someone you love. Share it just with them,
        or send it out into the world for others to read.
      </p>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          href="/write"
          style={{
            padding: '12px 24px',
            background: 'var(--color-ink)',
            color: '#fff',
            borderRadius: 6,
            textDecoration: 'none',
          }}
        >
          Write a Letter
        </Link>
        <Link
          href="/feed"
          style={{
            padding: '12px 24px',
            border: '1px solid var(--color-line)',
            borderRadius: 6,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Read Public Letters
        </Link>
      </div>
    </div>
  )
}