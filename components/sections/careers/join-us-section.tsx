export function JoinUsSection() {
  return (
    <section className="bg-gradient-to-r from-brand-red to-red-700 py-20 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-montserrat text-4xl font-bold">Don't See The Perfect Role?</h2>
        <p className="mt-4 text-lg text-red-100 max-w-2xl mx-auto">
          We are always looking for passionate and talented individuals to join our team. If you believe you have what
          it takes, we'd love to hear from you.
        </p>
        <div className="mt-8">
          <a
            href="mailto:careers@yourcompany.com"
            className="bg-accent-yellow text-black font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-yellow-500 transition-colors duration-300"
          >
            Submit Your Resume
          </a>
        </div>
      </div>
    </section>
  )
}