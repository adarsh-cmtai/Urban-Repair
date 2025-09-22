"use client"

import { useState } from "react"
import { Orbit, X } from "lucide-react"

const tours = [
  {
    title: "Modern Apartment",
    location: "Jubilee Hills",
    thumbnail: "/path/to/tour-thumb-1.jpg",
    tourUrl: "https://your-360-tour-provider.com/tour1",
  },
  {
    title: "Luxury Villa",
    location: "Gachibowli",
    thumbnail: "/path/to/tour-thumb-2.jpg",
    tourUrl: "https://your-360-tour-provider.com/tour2",
  },
]

export function VirtualTours() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTourUrl, setSelectedTourUrl] = useState("")

  const openModal = (url: string) => {
    setSelectedTourUrl(url)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTourUrl("")
  }

  return (
    <>
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-4xl font-bold text-neutral-800">Step Inside Our Designs</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
              Take an immersive 360° virtual tour of our completed projects from the comfort of your home.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tours.map(tour => (
              <div key={tour.title} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img src={tour.thumbnail} alt={tour.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-bold">{tour.title}</h3>
                  <p className="text-sm text-neutral-500">{tour.location}</p>
                  <button
                    onClick={() => openModal(tour.tourUrl)}
                    className="mt-4 w-full bg-brand-red text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Orbit className="w-5 h-5" /> Launch 360° Tour
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-6xl h-[90vh] rounded-lg relative">
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 z-10 shadow-lg"
            >
              <X className="w-6 h-6 text-neutral-800" />
            </button>
            <iframe
              src={selectedTourUrl}
              title="360 Virtual Tour"
              className="w-full h-full rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  )
}