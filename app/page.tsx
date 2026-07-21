import Link from 'next/link'

export default function Home() {
  return (
    <div
      className="page-container"
      style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: '20px 20px',
        textAlign: 'center',
        minHeight: 'calc(90vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes hover-fly {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .drift-plane {
          animation: hover-fly 3s ease-in-out infinite;
        }
      `}</style>
      
      <div style={{ position: 'relative', height: 100, marginBottom: 16, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src="/images/logo.png"
          alt="Paper plane"
          className="drift-plane"
          style={{ width: 80, height: 80 }}
        />
      </div>

      <h1 style={{ fontSize: 56, marginBottom: 20 }}>PaperPlanes</h1>
      <p style={{ fontSize: 18, color: 'var(--color-ink-soft)', marginBottom: 40, lineHeight: 1.6 }}>
        Write a letter to someone you love. Share it just with them,
        or send it out into the world for others to read.
      </p>

      <div className="hero-actions" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
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