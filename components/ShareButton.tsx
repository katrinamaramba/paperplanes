'use client'

import { useState } from 'react'

export default function ShareButton({ shareToken }: { shareToken: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}/letter/${shareToken}`

    if (navigator.share) {
      try {
        await navigator.share({ title: 'A letter on PaperPlanes', url })
        return
      } catch {
        // user cancelled the native share sheet, fall through to clipboard copy
      }
    }

    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      style={{
        padding: '10px 20px',
        border: 'none',
        borderRadius: 8,
        background: copied ? 'var(--color-ink-soft)' : 'var(--color-accent)',
        color: '#fff',
        cursor: 'pointer',
        fontSize: 14,
        fontFamily: 'var(--font-ui)',
        transition: 'background 0.2s',
      }}
    >
      {copied ? 'Link copied!' : 'Share this letter'}
    </button>
  )
}