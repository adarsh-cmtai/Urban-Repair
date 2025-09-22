"use client"

import { useState } from "react"

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">The Power of Transformation</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            Seeing is believing. Drag the slider to see the dramatic impact of our design solutions.
          </p>
        </div>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0">
            <img src="/path/to/living-room-before.jpg" alt="Living room before" className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <img src="/path/to/living-room-after.jpg" alt="Living room after" className="w-full h-full object-cover" />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
            aria-label="Before and after image slider"
          />
          <div
            className="absolute top-0 bottom-0 w-1 bg-white"
            style={{ left: `calc(${sliderPosition}% - 2px)` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer">
              <svg className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}