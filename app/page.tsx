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

        @keyframes rise-in {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .rise-1 { opacity: 0; animation: rise-in 0.6s ease-out 0.1s forwards; }
        .rise-2 { opacity: 0; animation: rise-in 0.6s ease-out 0.3s forwards; }
        .rise-3 { opacity: 0; animation: rise-in 0.6s ease-out 0.5s forwards; }

        .hero-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .hero-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(46, 42, 38, 0.15);
        }
        .hero-btn-primary:hover {
          background: var(--color-accent) !important;
        }
        .hero-btn-secondary:hover {
          border-color: var(--color-accent) !important;
          color: var(--color-accent) !important;
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

      <h1 className="rise-1" style={{ fontSize: 56, marginBottom: 20 }}>PaperPlanes</h1>
      <p className="rise-2" style={{ fontSize: 18, color: 'var(--color-ink-soft)', marginBottom: 40, lineHeight: 1.6 }}>
        Write a letter to someone you love. Share it just with them,
        or send it out into the world for others to read.
      </p>

      <div className="hero-actions rise-3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          href="/write"
          className="hero-btn hero-btn-primary"
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
          className="hero-btn hero-btn-secondary"
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
