"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface PriceBargainModalProps {
  food: {
    id: number
    name: string
    price: number
  }
  quantity: number
  onClose: () => void
}

export function PriceBargainModal({ food, quantity, onClose }: PriceBargainModalProps) {
  const originalTotal = food.price * quantity
  const minPrice = originalTotal * 0.7 // Minimum 30% discount

  const [offerPrice, setOfferPrice] = useState(originalTotal * 0.9) // Start with 10% discount
  const [counterOffer, setCounterOffer] = useState<number | null>(null)
  const [status, setStatus] = useState<"initial" | "pending" | "accepted" | "rejected" | "counter">("initial")
  const [message, setMessage] = useState("")

  const handleSliderChange = (value: number[]) => {
    setOfferPrice(value[0])
  }

  const handleSubmitOffer = () => {
    setStatus("pending")

    // Simulate API call with random response
    setTimeout(() => {
      const random = Math.random()

      if (offerPrice >= originalTotal * 0.85) {
        // Accept if offer is at least 85% of original price
        setStatus("accepted")
        setMessage("Your offer has been accepted! Add to cart with the negotiated price.")
      } else if (offerPrice >= originalTotal * 0.75) {
        // Counter offer if between 75-85% of original price
        const counterOfferAmount = originalTotal * 0.85
        setCounterOffer(counterOfferAmount)
        setStatus("counter")
        setMessage("We can offer you a better price, but not quite that low.")
      } else {
        // Reject if less than 75% of original price
        setStatus("rejected")
        setMessage("Sorry, we can't accept this offer. Please try a higher amount.")
      }
    }, 1000)
  }

  const handleAcceptCounter = () => {
    setStatus("accepted")
    setMessage("Great! You've accepted our counter offer. Add to cart with the negotiated price.")
  }

  const handleAddToCart = () => {
    // In a real app, this would add the item to the cart with the negotiated price
    console.log(`Added ${quantity} ${food.name} to cart at negotiated price: $${offerPrice.toFixed(2)}`)
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Negotiate Price</DialogTitle>
          <DialogDescription>
            Make an offer for {quantity} x {food.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Original Price:</Label>
              <span className="font-medium">${originalTotal.toFixed(2)}</span>
            </div>

            {status === "counter" && (
              <div className="flex items-center justify-between">
                <Label>Our Counter Offer:</Label>
                <span className="font-medium text-primary">${counterOffer?.toFixed(2)}</span>
              </div>
            )}

            {status === "accepted" && (
              <div className="flex items-center justify-between">
                <Label>Final Price:</Label>
                <span className="font-medium text-green-600">
                  ${(status === "counter" && counterOffer ? counterOffer : offerPrice).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {status === "initial" || status === "rejected" ? (
            <>
              <div className="grid gap-2">
                <Label>Your Offer:</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    defaultValue={[offerPrice]}
                    min={minPrice}
                    max={originalTotal}
                    step={0.5}
                    value={[offerPrice]}
                    onValueChange={handleSliderChange}
                  />
                  <div className="w-20 flex-shrink-0">
                    <Input
                      type="number"
                      value={offerPrice.toFixed(2)}
                      onChange={(e) => setOfferPrice(Number(e.target.value))}
                      min={minPrice}
                      max={originalTotal}
                      step={0.5}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${minPrice.toFixed(2)}</span>
                  <span>${originalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                You're offering {((offerPrice / originalTotal) * 100).toFixed(0)}% of the original price (
                {(100 - (offerPrice / originalTotal) * 100).toFixed(0)}% discount)
              </div>
            </>
          ) : (
            <div
              className={`p-4 rounded-md ${
                status === "accepted"
                  ? "bg-green-50 text-green-700"
                  : status === "rejected"
                    ? "bg-red-50 text-red-700"
                    : "bg-blue-50 text-blue-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        <DialogFooter>
          {status === "initial" || status === "rejected" ? (
            <Button onClick={handleSubmitOffer} disabled={status === "pending"}>
              {status === "pending" ? "Processing..." : "Submit Offer"}
            </Button>
          ) : status === "counter" ? (
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={() => setStatus("initial")} className="flex-1">
                Make New Offer
              </Button>
              <Button onClick={handleAcceptCounter} className="flex-1">
                Accept Counter
              </Button>
            </div>
          ) : status === "accepted" ? (
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

