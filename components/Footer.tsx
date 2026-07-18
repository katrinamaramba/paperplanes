import Link from 'next/link'

export default function Footer() {
  const linkStyle = { color: 'var(--color-ink-soft)', textDecoration: 'none' }

  return (
    <footer
      style={{
        padding: '24px 32px',
        marginTop: 'auto',
        textAlign: 'center',
        color: 'var(--color-ink-soft)',
        fontSize: 14,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 12, flexWrap: 'wrap' }}>
        
        <a
          href="https://ko-fi.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-ink-soft)', textDecoration: 'none' }}
        >
          Ko-fi
        </a>

        <a
          href="https://instagram.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-ink-soft)', textDecoration: 'none' }}
        >
          Instagram
        </a>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 12, flexWrap: 'wrap', fontSize: 13 }}>
        <Link href="/terms" style={linkStyle}>Terms & Privacy</Link>
      </div>

      © {new Date().getFullYear()} PaperPlanes — Letters worth sending.
    </footer>
  )
}