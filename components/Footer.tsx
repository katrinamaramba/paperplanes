export default function Footer() {
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

      © {new Date().getFullYear()} PaperPlanes — Letters worth sending.
    </footer>
  )
}