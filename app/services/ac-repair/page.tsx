// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import { ServiceDetailHero } from "@/components/service-detail-hero"
// import { CommonProblems } from "@/components/common-problems"
// import { CostCalculator } from "@/components/cost-calculator"
// import { ServiceProcess } from "@/components/service-process"
// import { TechnicianProfiles } from "@/components/technician-profiles"
// import { ServiceGuarantee } from "@/components/service-guarantee"
// import { ServiceFAQ } from "@/components/service-faq"
// import { BookingForm } from "@/components/booking-form"

// export default function ACRepairPage() {
//   const serviceData = {
//     title: "Expert AC Repair & Service in Hyderabad",
//     description: "Professional air conditioning repair and maintenance services for all brands and models.",
//     image: "/ac-repair-service-professional-technician.jpg",
//     badges: ["30-Day Service Warranty", "Genuine Spares Used", "Same-Day Service Available"],
//     startingPrice: "₹499",
//   }

//   const problems = [
//     {
//       title: "Not Cooling",
//       description: "AC running but not cooling properly or taking too long to cool",
//       price: "₹499 - ₹1,200",
//     },
//     {
//       title: "Water Leakage",
//       description: "Water dripping from indoor unit or excessive condensation",
//       price: "₹399 - ₹899",
//     },
//     {
//       title: "Strange Noises",
//       description: "Unusual sounds like grinding, squealing, or rattling from AC unit",
//       price: "₹349 - ₹799",
//     },
//     {
//       title: "Not Turning On",
//       description: "AC unit not starting or frequent tripping of circuit breaker",
//       price: "₹299 - ₹999",
//     },
//   ]

//   const faqData = [
//     {
//       question: "How often should I service my AC?",
//       answer:
//         "We recommend servicing your AC every 3-4 months for optimal performance and energy efficiency. Regular maintenance helps prevent major breakdowns and extends the life of your unit.",
//     },
//     {
//       question: "Do you provide warranty on AC repairs?",
//       answer:
//         "Yes, we provide a 30-day warranty on all AC repair services and up to 6 months warranty on spare parts used during the repair.",
//     },
//     {
//       question: "What brands of AC do you service?",
//       answer:
//         "We service all major AC brands including LG, Samsung, Voltas, Blue Star, Daikin, Hitachi, Carrier, and many more. Our technicians are trained to work with all types and models.",
//     },
//     {
//       question: "How long does AC repair usually take?",
//       answer:
//         "Most AC repairs are completed within 1-2 hours. Complex issues might take longer, but we always inform you about the expected time before starting the work.",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />
//       <main>
//         <ServiceDetailHero {...serviceData} />
//         <CommonProblems problems={problems} serviceType="AC" />
//         <CostCalculator serviceType="AC" />
//         <ServiceProcess />
//         <TechnicianProfiles />
//         <ServiceGuarantee />
//         <ServiceFAQ faqs={faqData} />
//         <BookingForm serviceType="AC Repair" />
//       </main>
//       <Footer />
//     </div>
//   )
// }
