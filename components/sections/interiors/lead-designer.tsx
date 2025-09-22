export function LeadDesigner() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="/path/to/lead-designer-photo.jpg"
              alt="Anjali Sharma, Lead Designer"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
          <div>
            <h2 className="font-montserrat text-4xl font-bold text-neutral-800">Meet Our Lead Designer</h2>
            <p className="mt-4 text-2xl font-semibold text-brand-red">Anjali Sharma</p>
            <p className="mt-6 text-neutral-600 leading-relaxed">
              "My design philosophy is simple: a home should be a perfect reflection of its inhabitants. It needs to be
              functional, beautiful, and deeply personal. I work closely with every client to understand their story and
              translate it into a physical space that brings them joy and comfort every single day."
            </p>
            <img src="/path/to/signature.png" alt="Anjali Sharma Signature" className="mt-6 h-12" />
          </div>
        </div>
      </div>
    </section>
  )
}