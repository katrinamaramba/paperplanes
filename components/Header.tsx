'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    setMenuOpen(false)
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'var(--color-ink)',
    fontSize: 15,
  }

  return (
    <header style={{ background: '#FAF9F6', padding: '16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Link
  href="/"
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-display)',
    textDecoration: 'none',
    color: 'var(--color-ink)',
    fontSize: 18,
  }}
>
  <img src="/images/logo.png" alt="PaperPlanes" style={{ width: 24, height: 24 }} />
  PaperPlanes
</Link>

  <button
    className="hamburger-button"
    onClick={() => setMenuOpen(!menuOpen)}
    style={{
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 4,
      color: 'var(--color-ink)',
    }}
    aria-label="Menu"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  </button>

        <nav className="desktop-nav" style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', fontSize: 14 }}>
          <Link href="/feed" style={linkStyle}>Feed</Link>
          <Link href="/about" style={linkStyle}>About</Link>

          {user ? (
            <>
              <Link href="/write" style={linkStyle}>Write a Letter</Link>
              <Link href="/dashboard" style={linkStyle}>Dashboard</Link>
              <button
                onClick={handleLogout}
                style={{
                  cursor: 'pointer',
                  background: 'none',
                  border: '1px solid var(--color-line)',
                  borderRadius: 6,
                  padding: '6px 14px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 14,
                  color: 'var(--color-ink-soft)',
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              style={{
                ...linkStyle,
                padding: '6px 16px',
                background: 'var(--color-accent)',
                color: '#fff',
                borderRadius: 6,
              }}
            >
              Log In
            </Link>
          )}
        </nav>
      </div>

      {menuOpen && (
        <nav
          className="mobile-menu-panel"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginTop: 16,
            paddingTop: 16,
            borderTop: '1px solid var(--color-line)',
          }}
        >
          <Link href="/feed" style={linkStyle} onClick={() => setMenuOpen(false)}>Feed</Link>
          <Link href="/about" style={linkStyle} onClick={() => setMenuOpen(false)}>About</Link>

          {user ? (
            <>
              <Link href="/write" style={linkStyle} onClick={() => setMenuOpen(false)}>Write a Letter</Link>
              <Link href="/dashboard" style={linkStyle} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button
                onClick={handleLogout}
                style={{
                  cursor: 'pointer',
                  background: 'none',
                  border: '1px solid var(--color-line)',
                  borderRadius: 6,
                  padding: '8px 14px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 14,
                  color: 'var(--color-ink-soft)',
                  textAlign: 'left',
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              style={{
                ...linkStyle,
                padding: '8px 16px',
                background: 'var(--color-accent)',
                color: '#fff',
                borderRadius: 6,
                display: 'inline-block',
                width: 'fit-content',
              }}
              onClick={() => setMenuOpen(false)}
            >
              Log In
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}