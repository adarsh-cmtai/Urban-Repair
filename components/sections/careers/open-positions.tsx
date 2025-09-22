"use client"

import { useState } from "react"
import { MapPin, Briefcase } from "lucide-react"

const departments = ["All", "Technicians", "Interior Design", "Customer Support", "Operations"]

const jobs = [
  {
    id: 1,
    title: "Senior AC Technician",
    location: "Hyderabad",
    type: "Full-time",
    department: "Technicians",
  },
  {
    id: 2,
    title: "Interior Designer",
    location: "Hyderabad",
    type: "Full-time",
    department: "Interior Design",
  },
  {
    id: 3,
    title: "Customer Support Executive",
    location: "Hyderabad",
    type: "Full-time",
    department: "Customer Support",
  },
  {
    id: 4,
    title: "Appliance Repair Technician",
    location: "Hyderabad",
    type: "Full-time",
    department: "Technicians",
  },
  {
    id: 5,
    title: "Operations Manager",
    location: "Hyderabad",
    type: "Full-time",
    department: "Operations",
  },
  {
    id: 6,
    title: "Junior Interior Designer",
    location: "Hyderabad",
    type: "Internship",
    department: "Interior Design",
  },
]

export function OpenPositions() {
  const [activeFilter, setActiveFilter] = useState("All")
  const filteredJobs = activeFilter === "All" ? jobs : jobs.filter(j => j.department === activeFilter)

  return (
    <section id="open-positions" className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl font-bold text-neutral-800">Current Openings</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-500">
            Find your next opportunity and become a part of our growing team.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {departments.map(department => (
            <button
              key={department}
              onClick={() => setActiveFilter(department)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-300 ${
                activeFilter === department
                  ? "bg-brand-red text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {department}
            </button>
          ))}
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg border border-gray-200 grid sm:grid-cols-3 items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="sm:col-span-2">
                  <h3 className="text-xl font-bold text-neutral-800">{job.title}</h3>
                  <div className="flex items-center gap-6 mt-2 text-sm text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" /> {job.type}
                    </div>
                  </div>
                </div>
                <div className="sm:text-right">
                  <button className="bg-brand-red text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-red-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-neutral-500">No open positions in this department at the moment.</p>
              <p className="text-neutral-500">Check back soon or submit a spontaneous application below!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}