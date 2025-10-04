"use client"

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Award, Users, Clock, Heart, ArrowRight, Wrench, Home, Palette, Target, CheckCircle, Shield, Lightbulb, Trophy, Star, Zap, Cpu, BadgeCheck, HeartHandshake, BrainCircuit } from "lucide-react"


// Component 1: AboutHero (Updated)
function AboutHero() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="order-2 lg:order-1">
            <h1 className="font-heading text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-6 text-balance">
              About Us – Urban Repair Expert
            </h1>
            <p className="text-xl mb-12 text-slate-600 text-pretty">
              Urban Repair Expert is not just an appliance service company — it’s Hyderabad’s most trusted luxury-class care brand, dedicated to bringing comfort, reliability, and excellence into every home.
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 mb-12 text-left">
              <div className="flex items-center gap-4">
                <Users className="h-10 w-10 text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">5,000+</div>
                  <div className="text-slate-500">Premium Clients</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Award className="h-10 w-10 text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">15+</div>
                  <div className="text-slate-500">Years Experience</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-10 w-10 text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">24/7</div>
                  <div className="text-slate-500">Support Available</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Heart className="h-10 w-10 text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-3xl font-bold text-slate-900">98%</div>
                  <div className="text-slate-500">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            <Link href="/contact" passHref>
              <Button
                size="lg"
                className="bg-red-600 text-white hover:bg-red-700 font-semibold px-8 h-14 text-lg rounded-xl group cursor-pointer"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="relative order-1 lg:order-2">
            <img
              src="/about-1.png"
              alt="Our professional team"
              className="rounded-3xl shadow-2xl shadow-slate-300/60 aspect-[4/3] object-contain w-full"
            />
            <div className="absolute bottom-6 left-6 bg-white/70 backdrop-blur-sm text-slate-800 p-5 rounded-2xl shadow-xl border border-white/50">
              <div className="text-red-600 text-3xl font-bold">Since 2008</div>
              <div className="font-medium">Serving Hyderabad With Pride</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// Component 2: CompanyStory (Updated)
const milestones = [
  { year: "2008", title: "The Beginning", description: "Started as a small appliance repair shop with a vision to provide honest, reliable home services to our community.", icon: Wrench },
  { year: "2012", title: "Expansion into Sales", description: "Expanded to include appliance buying & selling, helping customers upgrade their homes affordably and sustainably.", icon: Home },
  { year: "2016", title: "Launched Interior Design", description: "Introduced our interior design division, offering complete home transformation solutions from concept to completion.", icon: Palette },
  { year: "2024", title: "Market Leader", description: "Proudly serving over 5,000 premium clients across Hyderabad with a dedicated team of over 100 skilled professionals.", icon: Target },
];

function CompanyStory() {
  const animationStyles = `
    @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in-up { animation: fade-in-up 0.7s ease-out forwards; }
  `;

  return (
    <section className="py-2 bg-gradient-to-b from-white to-slate-50">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <blockquote className="text-2xl font-medium text-slate-700 max-w-3xl mx-auto italic mb-6 text-pretty">
            “Every home deserves appliance care that’s not only technically excellent but also emotionally intelligent.”
          </blockquote>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            From that belief, we have built a brand that redefines how appliance repair and resale should feel — premium, trustworthy, and customer-first. At Urban Repair Expert, every technician is a trained brand ambassador, and every customer is treated as an honoured guest.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 h-full w-1 bg-slate-200 rounded-full"></div>
          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div key={index} className="relative pl-20 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'backwards' }}>
                  <div className="absolute left-6 top-1 h-12 w-12 -translate-x-1/2 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full flex items-center justify-center ring-8 ring-white shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1">
                    <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">{milestone.title} - <span className="text-red-600">{milestone.year}</span></h3>
                    <p className="text-slate-600 text-pretty">{milestone.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-28 bg-white rounded-3xl p-8 lg:p-12 shadow-2xl shadow-slate-300/50 border border-slate-200/80">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading text-4xl font-extrabold text-slate-900 mb-6">Our Mission</h3>
              <p className="text-lg text-slate-700 mb-8 text-pretty">
                Our mission is to go far beyond ordinary repair. We deliver tamper-proof, verified, and high-quality service experiences that build trust and ensure total peace of mind. Whether it’s an AC, refrigerator, geyser, or washing machine, we provide professional servicing, installation, and resale solutions that transform everyday appliance care into a luxury experience.
              </p>
              <h4 className="font-heading text-2xl font-bold text-slate-800 mb-5">Why Choose Urban Repair Expert</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-x-4">
                  <Users className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-800 text-lg">Trusted by 5,000+ premium clients across Hyderabad</strong>
                  </div>
                </li>
                <li className="flex items-start gap-x-4">
                  <Cpu className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-800 text-lg">AI-powered booking system – fast, seamless, and smart</strong>
                  </div>
                </li>
                <li className="flex items-start gap-x-4">
                  <BadgeCheck className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-800 text-lg">Selamart-verified resale process – instant trust and transparency</strong>
                  </div>
                </li>
                <li className="flex items-start gap-x-4">
                  <HeartHandshake className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-800 text-lg">Complaint handling with empathy, precision, and care</strong>
                  </div>
                </li>
                <li className="flex items-start gap-x-4">
                  <BrainCircuit className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-800 text-lg">Expert staff trained in respect, clarity, and excellence</strong>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-full w-full min-h-[300px]">
              <img src="/about-2.jpg" alt="Home transformation reflecting our mission" className="relative rounded-2xl shadow-lg w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Component 3: ValuesSection (Updated)
const values = [
  { icon: Shield, title: "Trust & Reliability", description: "We stand behind our work with comprehensive warranties and transparent pricing. Your trust is our most valuable asset." },
  { icon: Clock, title: "Punctuality", description: "We respect your time. Our technicians arrive on schedule and complete work within the promised timeframes." },
  { icon: Heart, title: "Customer First", description: "Every decision we make is centered around providing the best possible experience and outcome for our customers." },
  { icon: Award, title: "Quality Excellence", description: "We use only genuine parts, premium materials, and follow industry best practices in all of our services." },
  { icon: Users, title: "Expert Team", description: "Our certified technicians and designers undergo continuous training to stay ahead with the latest technologies." },
  { icon: Lightbulb, title: "Innovation", description: "We embrace new technologies and methods to provide more efficient and effective solutions for your home." },
];

function ValuesSection() {
  const animationStyles = `
    @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <style>{animationStyles}</style>

      <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 rounded-full opacity-40 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-100 rounded-full opacity-40 blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-4 text-balance">
            Our Core Values
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
            The principles that guide everything we do and shape our commitment to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="animate-fade-in-up bg-white p-8 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}>
                <div className="mb-6">
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 text-pretty leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <h3 className="font-heading text-3xl font-extrabold text-slate-900 mb-6">Our Philosophy</h3>
          <blockquote className="text-2xl font-medium text-slate-700 max-w-3xl mx-auto italic mb-6 text-pretty">
            “Every appliance is a story. Every service is a promise. And every customer is a relationship.”
          </blockquote>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            At Urban Repair Expert, we don’t just fix machines — we build trust, comfort, and long-term relationships. If you’re looking for more than just repair — if you want a luxury-class appliance care journey — then welcome to Urban Repair Expert, where service meets sophistication.
          </p>
        </div>

      </div>
    </section>
  )
}

// Component 4: AchievementsSection (Updated)
const achievements = [
  { icon: Trophy, title: "Best Home Service Provider 2023", organization: "Hyderabad Business Awards", description: "Recognized for excellence in customer service and innovation in the home services sector." },
  { icon: Star, title: "5-Star Rating on Google", organization: "Based on 2,500+ Reviews", description: "Consistently rated as the top home service provider by our thousands of satisfied customers." },
  { icon: Users, title: "5,000+ Premium Clients", organization: "Across Hyderabad", description: "Trusted by families and businesses throughout the city for all their home service needs." },
  { icon: Zap, title: "ISO 9001:2015 Certified", organization: "Quality Management System", description: "Officially certified for maintaining international standards in service quality and customer satisfaction." },
];

const stats = [
  { number: "5,000+", label: "Premium Clients" },
  { number: "50,000+", label: "Services Completed" },
  { number: "500+", label: "Interior Projects" },
  { number: "98%", label: "Customer Satisfaction" },
];

function AchievementsSection() {
  const animationStyles = `
    @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
  `;

  return (
    <section className="py-2 bg-gradient-to-b from-slate-50 to-white">
      <style>{animationStyles}</style>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-800 mb-4 text-balance">
            Awards & Recognition
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
            Our commitment to excellence has been recognized by industry leaders and customers alike.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="animate-fade-in-up bg-white p-8 rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2 flex items-start gap-6" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}>
                <div className="bg-red-100 text-red-600 rounded-xl w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-1">{achievement.title}</h3>
                  <p className="text-red-600 font-semibold mb-3">{achievement.organization}</p>
                  <p className="text-slate-600 text-pretty">{achievement.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative bg-slate-900 rounded-3xl p-8 lg:p-12 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)] opacity-10"></div>
          <div className="relative text-center mb-10">
            <h3 className="font-heading text-3xl font-bold mb-4">Our Impact in Numbers</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">These numbers represent the trust our customers place in us every day.</p>
          </div>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'backwards' }}>
                <div className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-red-300 mb-2">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


// Main Page Component
export default function AboutPage() {
  return (

    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutHero />
        <CompanyStory />
        <ValuesSection />
        {/* <TeamSection /> */}
        <AchievementsSection />
      </main>
      <Footer />
    </div>
  );
}