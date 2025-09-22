"use client"

export function CareersHero() {
  const scrollToJobs = () => {
    document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-slate-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-montserrat text-4xl lg:text-6xl font-extrabold text-neutral-800 text-balance">
              Build Your Career With a Team That <span className="text-brand-red">Cares</span>.
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-neutral-500 text-pretty">
              We're more than just a company; we're a team of passionate individuals dedicated to excellence. Join us and
              make a real impact in homes across Hyderabad.
            </p>
            <div className="mt-10">
              <button
                onClick={scrollToJobs}
                className="bg-brand-red text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
              >
                View Open Positions
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="/path/to/happy-team-photo.jpg"
              alt="Our team working together"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}