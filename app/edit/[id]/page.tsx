'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useRouter, useParams } from 'next/navigation'

export default function EditLetter() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [content, setContent] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.push('/login')
      return
    }

    const fetchLetter = async () => {
      const { data, error } = await supabase
        .from('letters')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data || data.author_id !== user.id) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setContent(data.content)
      setRecipientName(data.recipient_name)
      setLoading(false)
    }

    fetchLetter()
  }, [user, authLoading, id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('letters')
      .update({ content, recipient_name: recipientName })
      .eq('id', id)

    setSaving(false)

    if (error) {
      alert('Failed to save: ' + error.message)
      return
    }

    router.push('/dashboard')
  }

  if (authLoading || loading) return <p style={{ padding: 20 }}>Loading...</p>
  if (notFound) return <p style={{ padding: 20 }}>You don't have permission to edit this letter.</p>

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h1>Edit Letter</h1>
      <form onSubmit={handleSave}>
        <div style={{ marginBottom: 16 }}>
          <label>Recipient's name</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Your letter</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}