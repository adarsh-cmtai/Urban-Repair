"use client"

import { useState } from "react"

export function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionMessage, setSubmissionMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionMessage("")
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setSubmissionMessage("Thank you! Our design team will contact you within 24 hours.")
    setIsSubmitting(false)
    // In a real app, you'd clear the form: (e.target as HTMLFormElement).reset();
  }

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-montserrat text-4xl font-bold text-neutral-800">Let's Build Your Dream Space</h2>
        <p className="mt-4 text-lg text-neutral-500">
          Ready to start your project? Fill out the form below for a free, no-obligation design consultation.
        </p>
        <form onSubmit={handleSubmit} className="mt-12 text-left bg-slate-50 p-8 rounded-2xl border border-gray-200">
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                <input id="name" name="name" type="text" required className="w-full bg-white border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-400 border"/>
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                <input id="phone" name="phone" type="tel" required className="w-full bg-white border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-400 border"/>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
              <input id="email" name="email" type="email" required className="w-full bg-white border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-400 border"/>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="project-type" className="text-sm font-medium text-gray-700 mb-1 block">Project Type</label>
                <select id="project-type" name="project-type" className="w-full bg-white border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-400 border">
                  <option>TV Wall Unit</option>
                  <option>Full Living Room</option>
                  <option>Modular Kitchen</option>
                  <option>Full Home Interior</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="text-sm font-medium text-gray-700 mb-1 block">Approx. Budget</label>
                <select id="budget" name="budget" className="w-full bg-white border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-400 border">
                  <option>Below ₹1 Lakh</option>
                  <option>₹1 - ₹3 Lakhs</option>
                  <option>₹3 - ₹5 Lakhs</option>
                  <option>Above ₹5 Lakhs</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1 block">Your Ideas</label>
              <textarea id="message" name="message" rows={4} placeholder="Tell us a bit about your project..." className="w-full bg-white border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-red-400 border"></textarea>
            </div>
            <div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-red text-white font-semibold py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Request My Free Consultation'}
              </button>
            </div>
            {submissionMessage && (
              <p className="text-center text-green-600 font-medium">
                {submissionMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}