import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the story behind PaperPlanes and why it was created.",
};

export default function About() {

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <style>{`
        @keyframes page-header-rise {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .page-header-icon { opacity: 0; animation: page-header-rise 0.6s ease-out 0.05s forwards; }
        .page-header-eyebrow { opacity: 0; animation: page-header-rise 0.6s ease-out 0.15s forwards; }
        .page-header-title { opacity: 0; animation: page-header-rise 0.6s ease-out 0.25s forwards; }
        .page-header-flourish { opacity: 0; animation: page-header-rise 0.6s ease-out 0.35s forwards; }
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
          Our story
        </p>

        <h1 className="page-header-title" style={{ fontSize: 34, margin: 0 }}>
          Why PaperPlanes?
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
      </div>

      <div className="letter-card" style={{ padding: 32, marginTop: 20, }}>
        <p>
          PaperPlanes started as something small and personal: a way to give
          back a feeling I'd been receiving for a while without knowing quite
          how to return it.
        </p>
        <br />

        <p>
          My partner and I are in a long-distance relationship, and for as
          long as we've been together, she's been the one writing me letters.
          Something about opening one always made
          the distance feel smaller for a moment.
        </p>
        <br />

        <p>
          For our second anniversary, I wanted to give that feeling back to
          her and build a permanent digital home where she could feel that
          exact same warmth, not just for one
          letter, but for however many we write from here on.
        </p>
        <br />

        <p>
          PaperPlanes is for anyone who has something they want to say to
          someone they love, whether it's meant for just one person's eyes,
          or the whole world's.
        </p>
        <br />

        <p style={{ marginBottom: 0 }}>
          PaperPlanes is proof that love can travel across any map.
        </p>
      </div>
    </div>
  )
}
