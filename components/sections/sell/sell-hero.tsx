"use client"

export function SellHero() {
  const scrollToCalculator = () => {
    document.getElementById("quote-calculator")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="bg-white py-20 sm:py-28 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-montserrat text-4xl lg:text-6xl font-extrabold text-neutral-800 text-balance">
          Turn Your Old Appliances into <span className="text-brand-red">Instant Cash</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg lg:text-xl text-neutral-500 text-pretty">
          No haggling, no hassle. Get a fair, instant online quote and enjoy free, professional doorstep pickup. It's
          the smartest way to sell.
        </p>
        <div className="mt-10">
          <button
            onClick={scrollToCalculator}
            className="bg-brand-red text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
          >
            Get My Instant Quote
          </button>
        </div>
      </div>
    </section>
  )
}