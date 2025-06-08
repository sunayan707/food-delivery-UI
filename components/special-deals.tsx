"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const deals = [
  {
    id: 1,
    title: "Family Feast",
    description: "Perfect for 4-6 people. Includes 2 large pizzas, 4 sides, and 2 desserts.",
    price: 49.99,
    originalPrice: 65.99,
    image: "/placeholder.svg?height=200&width=300",
    discount: "25% OFF",
  },
  {
    id: 2,
    title: "Lunch Special",
    description: "Available Mon-Fri, 11am-3pm. Includes main dish, side, and drink.",
    price: 9.99,
    originalPrice: 14.99,
    image: "/placeholder.svg?height=200&width=300",
    discount: "33% OFF",
  },
  {
    id: 3,
    title: "Weekend Bundle",
    description: "Perfect for weekend gatherings. Includes appetizers, mains, and desserts.",
    price: 39.99,
    originalPrice: 55.99,
    image: "/placeholder.svg?height=200&width=300",
    discount: "28% OFF",
  },
]

export default function SpecialDeals() {
  return (
    <section className="py-16 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/food-delivery-bg.png" alt="Food background" fill className="object-cover opacity-5" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl font-bold">Special Deals</h2>
            <p className="text-muted-foreground mt-2">Limited-time offers you don't want to miss</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="overflow-hidden h-full">
                <div className="relative h-48">
                  <Badge className="absolute top-2 right-2 z-10">{deal.discount}</Badge>
                  <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{deal.title}</h3>
                  <p className="text-muted-foreground mt-2">{deal.description}</p>
                  <div className="flex items-center mt-4">
                    <div className="text-xl font-bold">${deal.price}</div>
                    <div className="text-muted-foreground line-through ml-2">${deal.originalPrice}</div>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/menu">Order Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

