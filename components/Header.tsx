'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    setMenuOpen(false)
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'var(--color-ink)',
    fontSize: 17,
  }

  const getLinkStyle = (href: string) => ({
    textDecoration: 'none',
    color: pathname === href ? 'var(--color-accent)' : 'var(--color-ink)',
    fontWeight: pathname === href ? 600 : 400,
    fontSize: 17,
  })

  return (
    <header
      style={{
        background: '#FAF9F6',
        padding: '16px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', width: '100%' }}>
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-display)',
            textDecoration: 'none',
            color: 'var(--color-ink)',
            fontSize: 24,
            flexShrink: 0,
          }}
        >
          <img src="/images/logo.png" alt="PaperPlanes" style={{ width: 32, height: 32, flexShrink: 0 }} />
          PaperPlanes
        </Link>

        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            fontSize: 17,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 600,
            padding: '0 20px',
            zIndex: 10,
          }}
        >
          <Link href="/feed" style={getLinkStyle('/feed')}>Feed</Link>
          <Link href="/about" style={getLinkStyle('/about')}>About</Link>
          {user && <Link href="/write" style={getLinkStyle('/write')}>Write a Letter</Link>}
          {user && <Link href="/dashboard" style={getLinkStyle('/dashboard')}>Dashboard</Link>}
        </nav>

        <div className="desktop-nav" style={{ flexShrink: 0, zIndex: 20 }}>
          {user ? (
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
          ) : (
            <Link
              href="/login"
              style={{ ...linkStyle, padding: '6px 16px', background: 'var(--color-accent)', color: '#fff', borderRadius: 6 }}
            >
              Log In
            </Link>
          )}
        </div>

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
            flexShrink: 0,
            zIndex: 20,
          }}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          className="mobile-menu-panel"
          style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--color-line)' }}
        >
          <Link href="/feed" style={getLinkStyle('/feed')} onClick={() => setMenuOpen(false)}>Feed</Link>
          <Link href="/about" style={getLinkStyle('/about')} onClick={() => setMenuOpen(false)}>About</Link>
          {user ? (
            <>
              <Link href="/write" style={getLinkStyle('/write')} onClick={() => setMenuOpen(false)}>Write a Letter</Link>
              <Link href="/dashboard" style={getLinkStyle('/dashboard')} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button
                onClick={handleLogout}
                style={{ cursor: 'pointer', background: 'var(--color-accent)', border: '1px solid var(--color-line)', borderRadius: 6, padding: '8px 14px', fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--color-ink-soft)', textAlign: 'left' }}
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              style={{ ...linkStyle, padding: '8px 16px', background: 'var(--color-accent)', color: '#fff', borderRadius: 6, display: 'inline-block', width: 'fit-content' }}
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