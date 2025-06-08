"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

interface FoodCardProps {
  food: {
    id: number
    name: string
    description: string
    price: number
    image: string
    category?: string
    originalPrice?: number
  }
}

export function FoodCard({ food }: FoodCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden h-full">
        <div className="relative">
          <Link href={`/food/${food.id}`}>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={food.image || "/placeholder.svg"}
                alt={food.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          </Link>
          {food.category && <Badge className="absolute top-2 left-2">{food.category}</Badge>}
        </div>
        <CardContent className="p-4">
          <Link href={`/food/${food.id}`} className="hover:underline">
            <h3 className="font-semibold text-lg line-clamp-1">{food.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{food.description}</p>
          <div className="flex items-center mt-2">
            <div className="font-semibold">${food.price}</div>
            {food.originalPrice && (
              <div className="text-sm text-muted-foreground line-through ml-2">${food.originalPrice}</div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button className="w-full gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

