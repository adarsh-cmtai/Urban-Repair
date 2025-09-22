const materials = [
  { name: "Italian Marble Finish", image: "/path/to/material-marble.jpg" },
  { name: "German-Engineered Hardware", image: "/path/to/material-hardware.jpg" },
  { name: "Premium Wood Grains", image: "/path/to/material-wood.jpg" },
  { name: "High-Gloss Laminates", image: "/path/to/material-laminate.jpg" },
]

export function MaterialsShowcase() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">
            Premium Materials, Flawless Finishes
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            We believe great design starts with quality materials. We source only the best for a durable and luxurious
            finish.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {materials.map(material => (
            <div key={material.name} className="relative overflow-hidden rounded-2xl group">
              <img src={material.image} alt={material.name} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-semibold text-lg">{material.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}