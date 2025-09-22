export function CultureGallery() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">A Glimpse Into Our Culture</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            We work hard, support each other, and celebrate our successes together.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="grid gap-4">
            <img className="h-auto max-w-full rounded-lg shadow-md" src="/path/to/culture-1.jpg" alt="Team training session" />
            <img className="h-auto max-w-full rounded-lg shadow-md" src="/path/to/culture-2.jpg" alt="Celebrating a milestone" />
          </div>
          <div className="grid gap-4">
            <img className="h-auto max-w-full rounded-lg shadow-md" src="/path/to/culture-3.jpg" alt="Team lunch" />
            <img className="h-auto max-w-full rounded-lg shadow-md" src="/path/to/culture-4.jpg" alt="Technician on a job" />
          </div>
          <div className="grid gap-4">
            <img className="h-auto max-w-full rounded-lg shadow-md" src="/path/to/culture-5.jpg" alt="Collaborative meeting" />
            <img className="h-auto max-w-full rounded-lg shadow-md" src="/path/to/culture-6.jpg" alt="Diwali celebration" />
          </div>
          <div className="grid gap-4">
            <img className="h-auto max-w-full rounded-lg shadow-md" src="/path/to/culture-7.jpg" alt="Customer support team" />
            <img className="h-auto max-w-full rounded-lg shadow-md" src="/path/to/culture-8.jpg" alt="Company outing" />
          </div>
        </div>
      </div>
    </section>
  )
}