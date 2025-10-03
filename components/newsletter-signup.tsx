"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Send } from "lucide-react"

export function NewsletterSignup() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)] opacity-10"></div>
        <div className="relative bg-slate-800/50 rounded-2xl p-8 lg:p-12 border border-slate-700">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            <div className="text-center lg:text-left">
              <div className="inline-block p-4 bg-red-600/10 border border-red-500/20 rounded-xl mb-6">
                <Mail className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-white mb-4">
                Stay Updated with Home Care Tips
              </h2>
              <p className="text-lg text-slate-400">
                Get weekly maintenance tips, exclusive offers, and expert advice delivered to your inbox.
              </p>
            </div>

            <div className="w-full">
              <form className="flex flex-col sm:flex-row gap-4 w-full">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3 h-14 text-base rounded-xl bg-slate-800 text-white border-2 border-slate-700 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold h-14 text-base rounded-xl"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Subscribe
                </Button>
              </form>
              <p className="text-sm text-slate-500 mt-4 text-center sm:text-left">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}