import { Mail } from "lucide-react"

export function NewsletterSignup() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Mail className="w-16 h-16 text-accent-yellow mx-auto mb-4" />
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold mb-4">Stay Updated with Home Care Tips</h2>
          <p className="text-xl text-gray-300">
            Get weekly maintenance tips, exclusive offers, and expert advice delivered to your inbox
          </p>
        </div>

        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-yellow"
          />
          <button
            type="submit"
            className="bg-accent-yellow text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
          >
            Subscribe
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
      </div>
    </section>
  )
}
