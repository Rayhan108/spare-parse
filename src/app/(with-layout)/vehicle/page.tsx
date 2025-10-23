"use client"

import { Input } from "antd"
import { useState } from "react"


export default function Home() {
  const [brand, setBrand] = useState("")

  const categories = [
    {
      title: "Body",
      items: ["Body Parts/Wing/Bumper", "Fuel Tank/Parts", "Headlight/Parts", "..."],
      image: "/car-body-parts.jpg",
    },
    {
      title: "Braking System",
      items: ["Brake Caliper", "Disc Brake"],
      image: "/red-brake-caliper.jpg",
    },
    {
      title: "Cooling System",
      items: ["Switch/Sensor", "Water Pump/Gasket"],
      image: "/radiator-cooling-system.jpg",
    },
    {
      title: "Electrics",
      items: ["Headlight/Parts"],
      image: "/car-battery-electrical.jpg",
    },
    {
      title: "Engine",
      items: ["Cylinder Head/Attachment Parts", "Engine Air Supply", "Gaskets"],
      image: "/car-engine-motor.jpg",
    },
    {
      title: "Filters",
      items: ["Air Filter"],
      image: "/air-filter-yellow.jpg",
    },
    {
      title: "Fuel Supply System",
      items: ["Pump/Accessories"],
      image: "/fuel-pump-gauge.jpg",
    },
    {
      title: "Maintenance Service Parts",
      items: ["Additional Repairs", "Service Intervals"],
      image: "/wrench-tools-maintenance.jpg",
    },
    {
      title: "Spark/Glow Ignition",
      items: ["Ignition Coil/Ignition Coil Unit", "Spark Plug"],
      image: "/spark-plug-ignition-coil.jpg",
    },
    {
      title: "Steering",
      items: ["Bellow/Seal"],
      image: "/classic-car-steering-wheel.png",
    },
    {
      title: "Wheel Drive",
      items: ["Bellow"],
      image: "/wheel-drive-bellow.jpg",
    },
  ]

  return (
    <main className="min-h-screen bg-white p-8 container mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 items-center ">ACE 4.9 (1NMBCFL)</h1>

      <div className="flex gap-16">
        {/* Left Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="border border-slate-300 rounded p-6">
            <label className="block text-sm font-semibold text-slate-900 mb-4">Select Brand:</label>
            <Input
              type="text"
              placeholder=""
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border-slate-300 mb-6"
            />
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Show All</button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">{category.title}</h3>
                  <ul className="space-y-1">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
