import { motion } from 'framer-motion'

const keywords = [
  { title: 'Clarity', subtitle: 'Strategy' },
  { title: 'Connection', subtitle: 'Execution' },
  { title: 'Completion', subtitle: 'Performance' },
]

export default function Narrative() {
  return (
    <section id="narrative" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500">We build marketing ecosystems — not just campaigns.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {keywords.map((k, i) => (
            <motion.div
              key={k.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="mx-auto mb-6 h-20 w-20 rounded-full border-2 border-gray-200" />
              <h3 className="text-2xl font-semibold text-gray-900">{k.title}</h3>
              <p className="mt-1 text-gray-600">{k.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
