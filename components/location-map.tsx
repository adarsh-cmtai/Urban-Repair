export function LocationMap() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
          <p className="text-lg text-gray-600">
            Visit our office or we can come to you. We serve all areas across Hyderabad.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-500 mb-2">Interactive Map</div>
                <div className="text-sm text-gray-400">123 Business District, HITEC City, Hyderabad</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-4">Service Areas</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">• Banjara Hills</div>
                <div className="text-gray-600">• Jubilee Hills</div>
                <div className="text-gray-600">• Gachibowli</div>
                <div className="text-gray-600">• HITEC City</div>
                <div className="text-gray-600">• Kondapur</div>
                <div className="text-gray-600">• Madhapur</div>
                <div className="text-gray-600">• Kukatpally</div>
                <div className="text-gray-600">• Secunderabad</div>
                <div className="text-gray-600">• Begumpet</div>
                <div className="text-gray-600">• Ameerpet</div>
                <div className="text-gray-600">• Miyapur</div>
                <div className="text-gray-600">• Uppal</div>
              </div>
            </div>

            <div className="bg-accent-yellow rounded-2xl p-6 text-center">
              <h4 className="font-bold text-lg mb-2">Need Immediate Help?</h4>
              <p className="text-sm mb-4">Call our emergency hotline for urgent repairs</p>
              <div className="text-2xl font-bold">+91 9876543211</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
