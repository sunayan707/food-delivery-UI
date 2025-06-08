"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/food-delivery-bg.png"
          alt="Food delivery illustration"
          fill
          priority
          className="object-cover brightness-90"
        />
      </div>

      {/* Animated content */}
      <div className="container relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Delicious Food <br />
          <span className="text-primary">Delivered to You</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Order your favorite meals from the best restaurants in town. Fast delivery, easy payment, and a wide variety
          of cuisines to choose from.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
            <Link href="/menu">Explore Menu</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </motion.div>
      </div>

      {/* Animated food icons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-[10%] w-16 h-16 opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="Food icon"
            width={64}
            height={64}
            className="rounded-full"
          />
        </motion.div>

        <motion.div
          className="absolute top-40 right-[15%] w-20 h-20 opacity-20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 6,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt="Food icon"
            width={80}
            height={80}
            className="rounded-full"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-[20%] w-24 h-24 opacity-20"
          animate={{
            y: [0, 25, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 7,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Image
            src="/placeholder.svg?height=96&width=96"
            alt="Food icon"
            width={96}
            height={96}
            className="rounded-full"
          />
        </motion.div>
      </div>
    </div>
  )
}

