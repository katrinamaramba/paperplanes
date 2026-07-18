'use client'

import { supabase } from '@/lib/supabase'

export default function Login() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
  }

  return (
    <div style={{ maxWidth: 440, margin: '80px auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Welcome to PaperPlanes</h1>

      <div className="letter-card" style={{ padding: 32, marginTop: 20, textAlign: 'center' }}>
        <p style={{ color: 'var(--color-ink-soft)', marginTop: 0, marginBottom: 8, fontSize: 15 }}>
          One account, whether you're new here or coming back.
        </p>

        <p style={{ color: 'var(--color-ink-soft)', marginBottom: 28, fontSize: 14, lineHeight: 1.6 }}>
          Signing in saves every letter you write or receive to your
          dashboard, so nothing gets lost — public or private.
        </p>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            padding: 14,
            background: 'var(--color-accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 15,
            fontFamily: 'var(--font-ui)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" opacity=".9"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" opacity=".9"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" opacity=".9"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" opacity=".9"/>
          </svg>
          Continue with Google
        </button>

        <p style={{ fontSize: 12, color: 'var(--color-ink-soft)', marginTop: 20, marginBottom: 0 }}>
          No separate signup needed — your first sign-in creates your account.
        </p>
      </div>
    </div>
  )
}