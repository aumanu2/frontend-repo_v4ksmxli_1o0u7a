import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'

export default function SuccessHub() {
  const [q, setQ] = useState('')
  const [industry, setIndustry] = useState('')
  const [scope, setScope] = useState('')
  const [type, setType] = useState('')
  const [items, setItems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const run = async () => {
      const url = new URL(`${baseUrl}/api/case-studies`)
      if (q) url.searchParams.set('q', q)
      if (industry) url.searchParams.set('industry', industry)
      if (scope) url.searchParams.set('scope', scope)
      if (type) url.searchParams.set('campaign_type', type)
      const res = await fetch(url.toString())
      const data = await res.json()
      setItems(data)
    }
    run()
  }, [q, industry, scope, type])

  const industries = useMemo(() => ['Beauty','Fashion','FMCG','Tech','Education'], [])
  const scopes = useMemo(() => ['Performance','Socials','UGC','Branding','Influencer'], [])
  const types = useMemo(() => ['Organic','Paid','Integrated'], [])

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-8 text-3xl md:text-4xl font-semibold text-gray-900">Search success by industry, goal, or service</h2>

        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search case studies…"
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
          <select value={industry} onChange={e=>setIndustry(e.target.value)} className="rounded-full border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm">
            <option value="">Industry</option>
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <select value={scope} onChange={e=>setScope(e.target.value)} className="rounded-full border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm">
              <option value="">Scope</option>
              {scopes.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
            <select value={type} onChange={e=>setType(e.target.value)} className="rounded-full border border-gray-200 bg-white py-3 px-4 text-gray-900 shadow-sm">
              <option value="">Type</option>
              {types.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-8 columns-1 md:columns-3 gap-4 [column-fill:_balance]"><div className="grid gap-4">
          {items.map((it) => (
            <div key={it.id} className="break-inside-avoid rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <img src={it.logo_url} alt={it.brand} className="h-9 w-9 rounded-full bg-gray-100 object-cover" />
                <div>
                  <div className="font-medium text-gray-900">{it.brand}</div>
                  <div className="text-xs text-gray-500">{it.industry} • {it.campaign_type}</div>
                </div>
              </div>
              <div className="text-gray-800">{it.headline}</div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                {it.scope.map(s => (
                  <span key={s} className="rounded-full bg-gray-100 px-3 py-1">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div></div>
      </div>
    </section>
  )
}
