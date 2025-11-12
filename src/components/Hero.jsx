import { useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const nextRef = useRef(null)

  const scrollNext = () => {
    const el = document.getElementById('narrative')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <div className="mb-8">
            <div className="mx-auto h-32 w-32 rounded-full border border-white/60 backdrop-blur-sm shadow-[0_0_80px_rgba(255,255,255,0.6)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900">
            From chaos to clarity.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Where every campaign comes full circle.
          </p>

          <button onClick={scrollNext} className="mt-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-6 py-3 text-gray-900 shadow-sm backdrop-blur transition hover:shadow-lg">
            Enter the Circle
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center">
        <button onClick={scrollNext} aria-label="Scroll" className="group inline-flex flex-col items-center text-gray-700">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="mt-1 h-5 w-5 animate-bounce" />
        </button>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-white/70" />
    </section>
  )
}
