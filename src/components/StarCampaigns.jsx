import { useEffect, useState } from 'react'

export default function StarCampaigns() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const run = async () => {
      try {
        // Ensure we have some data
        await fetch(`${baseUrl}/api/seed`, { method: 'POST' })
        const res = await fetch(`${baseUrl}/api/case-studies/featured`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        setError('Unable to load campaigns')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  if (loading) return <div className="py-24 text-center text-gray-500">Loading featured campaigns…</div>
  if (error) return <div className="py-24 text-center text-red-600">{error}</div>

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Our Star Campaigns ✦</h2>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">View all →</a>
        </div>

        <div className="grid grid-flow-col auto-cols-[85%] md:auto-cols-[32%] gap-6 overflow-x-auto pb-4">
          {items.map((it) => (
            <article key={it.id} className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-red-200/0 group-hover:ring-red-200/80 transition" />
              <div className="mb-4 flex items-center gap-3">
                <img src={it.logo_url} alt={it.brand} className="h-10 w-10 rounded-full object-cover bg-gray-100" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{it.brand}</h3>
                  <p className="text-xs text-gray-500">{it.industry}</p>
                </div>
              </div>
              <p className="text-gray-700">{it.highlight}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
                {it.metrics?.slice(0,3).map(m => (
                  <span key={m.label} className="rounded-full bg-gray-100 px-3 py-1">{m.value} {m.label}</span>
                ))}
              </div>
              <div className="mt-6 text-sm font-medium text-gray-900">View Full Circle →</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
