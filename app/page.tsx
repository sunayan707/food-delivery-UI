"use client"

import Hero from "@/components/hero"
import FeaturedItems from "@/components/featured-items"
import SpecialDeals from "@/components/special-deals"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Animated background pattern */}
      <div className="relative py-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/food-delivery-bg.png" alt="Food background" fill className="object-cover opacity-5" />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold">Delicious Food at Your Fingertips</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              With our unique price bargaining feature, you can negotiate prices directly with restaurants for the best
              deals on your favorite meals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Negotiate Prices", value: "Save up to 25%" },
              { title: "Fast Delivery", value: "30 min average" },
              { title: "Happy Customers", value: "10,000+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-background/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-muted-foreground">{stat.title}</h3>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 50 - 25],
                x: [0, Math.random() * 50 - 25],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: Math.random() * 10 + 10,
              }}
            />
          ))}
        </div>
      </div>

      <FeaturedItems />
      <SpecialDeals />
      <HowItWorks />
      <Testimonials />
    </div>
  )
}

