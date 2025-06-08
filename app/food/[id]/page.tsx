"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { PriceBargainModal } from "@/components/price-bargain-modal"

// This would come from a database in a real app
const foodItem = {
  id: 1,
  name: "Margherita Pizza",
  description:
    "Classic pizza with tomato sauce, mozzarella, and basil. Made with fresh ingredients and baked in a traditional wood-fired oven for that authentic Italian taste.",
  price: 12.99,
  originalPrice: 14.99,
  image: "/placeholder.svg?height=400&width=600",
  ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Fresh Basil", "Olive Oil", "Salt", "Flour", "Yeast"],
  allergens: ["Dairy", "Gluten"],
  category: "Pizza",
  rating: 4.7,
  reviews: 128,
  restaurant: "Italian Delights",
  preparationTime: "20-30 min",
  nutritionalInfo: {
    calories: 285,
    protein: 12,
    carbs: 36,
    fat: 10,
  },
}

export default function FoodDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [showBargainModal, setShowBargainModal] = useState(false)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addToCart = () => {
    // In a real app, this would add the item to the cart
    console.log(`Added ${quantity} ${foodItem.name} to cart`)
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-lg overflow-hidden">
          <Image src={foodItem.image || "/placeholder.svg"} alt={foodItem.name} fill className="object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{foodItem.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{foodItem.rating}</span>
              </div>
              <span className="text-muted-foreground">({foodItem.reviews} reviews)</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{foodItem.restaurant}</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${foodItem.price}</span>
              {foodItem.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${foodItem.originalPrice}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Preparation time: {foodItem.preparationTime}</p>
          </div>

          <p className="text-muted-foreground">{foodItem.description}</p>

          <div className="flex flex-wrap gap-2">
            {foodItem.allergens.map((allergen) => (
              <Badge key={allergen} variant="outline">
                {allergen}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                className="w-16 text-center mx-2"
                min="1"
              />
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button className="flex-1 gap-2" onClick={addToCart}>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          <Button variant="outline" className="w-full" onClick={() => setShowBargainModal(true)}>
            Negotiate Price
          </Button>

          <Tabs defaultValue="ingredients">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="space-y-4 pt-4">
              <h3 className="font-medium">Ingredients</h3>
              <ul className="grid grid-cols-2 gap-2">
                {foodItem.ingredients.map((ingredient) => (
                  <li key={ingredient} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-4 pt-4">
              <h3 className="font-medium">Nutritional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{foodItem.nutritionalInfo.calories}</div>
                      <div className="text-sm text-muted-foreground">Calories</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{foodItem.nutritionalInfo.protein}g</div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{foodItem.nutritionalInfo.carbs}g</div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{foodItem.nutritionalInfo.fat}g</div>
                      <div className="text-sm text-muted-foreground">Fat</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Customer Reviews</h3>
                <Button variant="outline" size="sm">
                  Write a Review
                </Button>
              </div>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Reviews will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {showBargainModal && (
        <PriceBargainModal food={foodItem} quantity={quantity} onClose={() => setShowBargainModal(false)} />
      )}
    </div>
  )
}

