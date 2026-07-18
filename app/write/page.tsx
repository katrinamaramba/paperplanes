'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image' // Import the Next.js Image component
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const inputStyle = {
  width: '100%',
  padding: 10,
  border: '1px solid var(--color-line)',
  borderRadius: 8,
  fontFamily: 'var(--font-ui)',
  fontSize: 15,
  background: '#fff',
}

const WORD_LIMIT = 1500

const countWords = (text: string) => {
  const trimmed = text.trim()
  return trimmed === '' ? 0 : trimmed.split(/\s+/).length
}

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  fontSize: 14,
  color: 'var(--color-ink-soft)',
}

export default function WriteLetter() {
  const { user, loading: authLoading } = useAuth()
  const [recipientName, setRecipientName] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [content, setContent] = useState('')
  const [senderName, setSenderName] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isFlying, setIsFlying] = useState(false) // New state for animation
  const router = useRouter()

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push('/login')
    }
  }, [user, authLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push('/login')
      return
    }

    setLoading(true)
    setIsFlying(true) // Start the flight animation

    const shareToken = crypto.randomUUID()

    const { data, error } = await supabase
      .from('letters')
      .insert([
        {
          author_id: user.id,
          recipient_name: recipientName,
          recipient_email: isPublic ? null : recipientEmail,
          sender_name: isPublic ? null : senderName,
          content: content,
          is_public: isPublic,
          share_token: shareToken,
        },
      ])
      .select()
      .single()

    setLoading(false)

    if (error) {
      alert('Something went wrong: ' + error.message)
      return
    }

    if (!isPublic) {
      await fetch('/api/send-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail,
          recipientName,
          senderName,
          shareToken,
        }),
      })
    }

    // Wait for the animation to finish before routing (matching animation duration)
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    router.push(`/letter/${shareToken}`)
  }

  if (authLoading || !user) {
    return <p style={{ padding: 20 }}>Loading...</p>
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h1>Write a Letter</h1>

      <form onSubmit={handleSubmit} className="letter-card" style={{ padding: 28, marginTop: 20 }}>
        <div className="public-private-choice" style={{ marginBottom: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <input
      type="radio"
      checked={isPublic}
      onChange={() => setIsPublic(true)}
    />
    Share publicly
  </label>
  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <input
      type="radio"
      checked={!isPublic}
      onChange={() => setIsPublic(false)}
    />
    Send privately
  </label>
</div>

        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Recipient's name</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        {!isPublic && (
          <>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Recipient's email</label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Your name (how they'll see it)</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. your name or a nickname"
                required
                style={inputStyle}
              />
            </div>
          </>
        )}

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Your letter</label>
          <textarea
            value={content}
            onChange={(e) => {
              const words = countWords(e.target.value)
              if (words <= WORD_LIMIT) {
                setContent(e.target.value)
              }
            }}
            required
            rows={10}
            className="letter-content"
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-signature)'}}
          />
          <p style={{
            fontSize: 13,
            color: countWords(content) >= WORD_LIMIT ? 'var(--color-accent)' : 'var(--color-ink-soft)',
            marginTop: 6,
            textAlign: 'right'
          }}>
            {countWords(content)} / {WORD_LIMIT} words
          </p>
        </div>

        {/* Updated interactive button with logo and animation logic */}
        <button
          type="submit"
          disabled={loading || isFlying} // Disable during loading AND flying
          className={`
            px-7 py-3 bg-[var(--color-accent)] text-white text-[15px] rounded-lg cursor-pointer
            flex items-center justify-between gap-3 transition-all duration-300 shadow-md
            hover:shadow-lg hover:scale-105 active:scale-95
            disabled:opacity-70 disabled:cursor-not-allowed
            ${isFlying ? 'border-2 border-[var(--color-line)] bg-opacity-80 shadow-inner' : ''}
          `}
        >
          <span className="flex-1 text-left">
            {loading ? 'Sending...' : 'Send Letter'}
          </span>
          {/* Logo container that allows relative flight animation */}
          <div className="w-8 h-8 flex items-center justify-center relative">
            <Image
              src="/images/logo.png" // Assumes you've placed image_6.png in public/images/logo.png
              alt="Paper Plane Logo"
              width={32}
              height={32}
              className={`w-full h-full object-contain ${isFlying ? 'plane-fly' : ''}`}
            />
          </div>
        </button>
      </form>
    </div>
  )
}