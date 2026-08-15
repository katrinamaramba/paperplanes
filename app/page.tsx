import Link from 'next/link'

export default function Home() {
  return (
    <div
      className="page-container hero-wrapper"
      style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: '20px 20px',
        textAlign: 'center',
        minHeight: 'calc(90vh - 140px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
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

        /* Decorative background layer */
        .hero-bg-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 520px;
          height: 520px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(139,58,58,0.07) 0%, rgba(139,58,58,0) 70%);
          pointer-events: none;
          z-index: 0;
        }

        .bg-plane {
  position: absolute;
  opacity: 0.16;
  pointer-events: none;
  z-index: 0;
}

        @keyframes float-a {
          0%, 100% { transform: translate(0, 0) rotate(-12deg); }
          50% { transform: translate(10px, -18px) rotate(-6deg); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0) rotate(20deg); }
          50% { transform: translate(-14px, 14px) rotate(26deg); }
        }
        @keyframes float-c {
          0%, 100% { transform: translate(0, 0) rotate(-4deg); }
          50% { transform: translate(12px, 10px) rotate(2deg); }
        }
        @keyframes float-d {
          0%, 100% { transform: translate(0, 0) rotate(8deg); }
          50% { transform: translate(-10px, -12px) rotate(14deg); }
        }

        .bg-plane-1 { top: 8%; left: 6%; animation: float-a 7s ease-in-out infinite; }
        .bg-plane-2 { top: 14%; right: 8%; animation: float-b 8.5s ease-in-out infinite; }
        .bg-plane-3 { bottom: 12%; left: 10%; animation: float-c 6.5s ease-in-out infinite; }
        .bg-plane-4 { bottom: 18%; right: 6%; animation: float-d 9s ease-in-out infinite; }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .flight-path {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 640px;
          max-width: 90vw;
          transform: translate(-50%, -50%);
          z-index: 0;
          opacity: 0.35;
        }
      `}</style>

      <div className="hero-bg-glow" aria-hidden="true" />

      <svg className="flight-path" viewBox="0 0 640 260" fill="none" aria-hidden="true">
        <path
          d="M20 200 C 160 40, 480 40, 620 160"
          stroke="var(--color-line)"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
      </svg>

      {[
  { cls: 'bg-plane-1', size: 34 },
  { cls: 'bg-plane-2', size: 26 },
  { cls: 'bg-plane-3', size: 30 },
  { cls: 'bg-plane-4', size: 22 },
].map((p, i) => (
  <img
    key={i}
    src="/images/logo.png"
    alt=""
    className={`bg-plane ${p.cls}`}
    width={p.size}
    height={p.size}
    aria-hidden="true"
  />
))}

      <div className="hero-content">
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
    </div>
  )
}
