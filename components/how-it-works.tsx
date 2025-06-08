"use client"

import { Check, Search, ShoppingBag, Truck } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const steps = [
  {
    icon: <Search className="h-10 w-10" />,
    title: "Browse Menu",
    description: "Explore our wide variety of cuisines and dishes from top restaurants.",
  },
  {
    icon: <ShoppingBag className="h-10 w-10" />,
    title: "Place Order",
    description: "Select your favorite items, customize as needed, and add to cart.",
  },
  {
    icon: <Truck className="h-10 w-10" />,
    title: "Fast Delivery",
    description: "Track your order in real-time as it makes its way to your doorstep.",
  },
  {
    icon: <Check className="h-10 w-10" />,
    title: "Enjoy Your Meal",
    description: "Receive your food fresh and hot, ready to enjoy immediately.",
  },
]

export default function HowItWorks() {
  return (
    <section className="container py-16 md:py-24 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/food-delivery-bg.png" alt="Food background" fill className="object-cover opacity-5" />
      </div>

      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold">How It Works</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Ordering your favorite food has never been easier. Follow these simple steps to get started.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="rounded-full bg-primary/10 p-4 text-primary mb-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {step.icon}
            </motion.div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

