"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FoodCard } from "@/components/food-card"
import { motion } from "framer-motion"

const featuredItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "Pizza",
  },
  {
    id: 2,
    name: "Chicken Alfredo Pasta",
    description: "Creamy pasta with grilled chicken and parmesan",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "Pasta",
  },
  {
    id: 3,
    name: "Vegetable Stir Fry",
    description: "Fresh vegetables stir-fried in a savory sauce",
    price: 10.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "Vegetarian",
  },
  {
    id: 4,
    name: "Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    price: 13.99,
    image: "/placeholder.svg?height=200&width=300",
    category: "Burgers",
  },
]

export default function FeaturedItems() {
  return (
    <section className="container py-16">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-3xl font-bold">Featured Items</h2>
          <p className="text-muted-foreground mt-2">Discover our most popular dishes</p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0" asChild>
          <Link href="/menu">View All</Link>
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FoodCard food={item} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

