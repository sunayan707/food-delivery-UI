"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"

const categories = [
  { id: "pizza", label: "Pizza" },
  { id: "pasta", label: "Pasta" },
  { id: "burgers", label: "Burgers" },
  { id: "salads", label: "Salads" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
]

const allergens = [
  { id: "dairy", label: "Dairy" },
  { id: "gluten", label: "Gluten" },
  { id: "nuts", label: "Nuts" },
  { id: "eggs", label: "Eggs" },
  { id: "soy", label: "Soy" },
]

export function FoodFilters() {
  const [priceRange, setPriceRange] = useState([0, 50])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [excludedAllergens, setExcludedAllergens] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleAllergenChange = (allergen: string) => {
    setExcludedAllergens((prev) => (prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]))
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const handleReset = () => {
    setPriceRange([0, 50])
    setSelectedCategories([])
    setExcludedAllergens([])
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Search</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search menu..." className="pl-8" />
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 50]}
          max={50}
          step={1}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Exclude Allergens</h3>
        <div className="space-y-2">
          {allergens.map((allergen) => (
            <div key={allergen.id} className="flex items-center space-x-2">
              <Checkbox
                id={`allergen-${allergen.id}`}
                checked={excludedAllergens.includes(allergen.id)}
                onCheckedChange={() => handleAllergenChange(allergen.id)}
              />
              <Label htmlFor={`allergen-${allergen.id}`}>{allergen.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  )
}

