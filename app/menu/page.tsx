import { FoodCard } from "@/components/food-card"
import { FoodFilters } from "@/components/food-filters"

const foodItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Fresh Basil", "Olive Oil"],
    allergens: ["Dairy", "Gluten"],
    category: "Pizza",
  },
  {
    id: 2,
    name: "Chicken Alfredo Pasta",
    description: "Creamy pasta with grilled chicken and parmesan",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Fettuccine Pasta", "Grilled Chicken", "Alfredo Sauce", "Parmesan Cheese"],
    allergens: ["Dairy", "Gluten"],
    category: "Pasta",
  },
  {
    id: 3,
    name: "Vegetable Stir Fry",
    description: "Fresh vegetables stir-fried in a savory sauce",
    price: 10.99,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Broccoli", "Carrots", "Bell Peppers", "Soy Sauce", "Ginger", "Garlic"],
    allergens: ["Soy"],
    category: "Vegetarian",
  },
  {
    id: 4,
    name: "Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    price: 13.99,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Beef Patty", "Lettuce", "Tomato", "Onion", "Special Sauce", "Sesame Bun"],
    allergens: ["Gluten", "Egg"],
    category: "Burgers",
  },
  {
    id: 5,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing and croutons",
    price: 9.99,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Romaine Lettuce", "Caesar Dressing", "Croutons", "Parmesan Cheese"],
    allergens: ["Dairy", "Gluten"],
    category: "Salads",
  },
  {
    id: 6,
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with vanilla ice cream",
    price: 6.99,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter", "Vanilla Ice Cream"],
    allergens: ["Dairy", "Gluten", "Eggs"],
    category: "Desserts",
  },
]

export default function MenuPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <FoodFilters />
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((item) => (
              <FoodCard key={item.id} food={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

