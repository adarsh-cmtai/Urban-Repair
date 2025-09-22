export function InteriorHero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center text-white">
      <div className="absolute inset-0">
        <img
          src="/path/to/stunning-living-room.jpg"
          alt="Beautifully designed modern living room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="font-montserrat text-4xl lg:text-7xl font-bold text-balance">
          Crafting Spaces That Tell Your Story
        </h1>
        <p className="mt-6 text-lg lg:text-xl text-gray-200 text-pretty">
          Bespoke interior solutions for modern living. We combine timeless design with flawless execution to create a
          home you'll love.
        </p>
        <div className="mt-10">
          <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors duration-300">
            Book a Free Design Consultation
          </button>
        </div>
      </div>
    </section>
  )
}