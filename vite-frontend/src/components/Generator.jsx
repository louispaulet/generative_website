import { useState } from 'react'

function Generator() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt) return
    setLoading(true)
    try {
      const res = await fetch(`/generate?link_text=${encodeURIComponent(prompt)}`)
      const html = await res.text()
      const win = window.open('', '_blank')
      win.document.write(html)
      win.document.close()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the page you want"
          style={{ width: '60%', marginRight: '0.5rem' }}
        />
        <button type="submit">Generate</button>
      </form>
      {loading && <p>Generating page...</p>}
    </div>
  )
}

export default Generator
