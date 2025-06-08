"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Package, ShoppingBag } from "lucide-react"

// Sample order data
const orders = [
  {
    id: "ORD-12345",
    date: "March 15, 2023",
    status: "Delivered",
    total: 42.99,
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { name: "Chicken Alfredo Pasta", quantity: 2, price: 14.99 },
    ],
    restaurant: "Italian Delights",
  },
  {
    id: "ORD-12346",
    date: "March 10, 2023",
    status: "Delivered",
    total: 27.98,
    items: [{ name: "Beef Burger", quantity: 2, price: 13.99 }],
    restaurant: "Burger Haven",
  },
  {
    id: "ORD-12347",
    date: "March 5, 2023",
    status: "Delivered",
    total: 19.98,
    items: [
      { name: "Vegetable Stir Fry", quantity: 1, price: 10.99 },
      { name: "Caesar Salad", quantity: 1, price: 8.99 },
    ],
    restaurant: "Healthy Bites",
  },
]

export default function OrderHistoryPage() {
  const [activeOrders, setActiveOrders] = useState<typeof orders>([])
  const [pastOrders, setPastOrders] = useState<typeof orders>(orders)

  const handleReorder = (orderId: string) => {
    // In a real app, this would add items to cart
    console.log(`Reordering items from order ${orderId}`)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      <Tabs defaultValue="past" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="past">Past Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeOrders.length > 0 ? (
            <div className="grid gap-6">
              {activeOrders.map((order) => (
                <OrderCard key={order.id} order={order} onReorder={handleReorder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No active orders</h3>
              <p className="text-muted-foreground mt-2">When you place an order, it will appear here</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastOrders.length > 0 ? (
            <div className="grid gap-6">
              {pastOrders.map((order) => (
                <OrderCard key={order.id} order={order} onReorder={handleReorder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No order history</h3>
              <p className="text-muted-foreground mt-2">Your past orders will appear here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface OrderCardProps {
  order: {
    id: string
    date: string
    status: string
    total: number
    items: { name: string; quantity: number; price: number }[]
    restaurant: string
  }
  onReorder: (orderId: string) => void
}

function OrderCard({ order, onReorder }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.restaurant}</CardTitle>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{order.date}</span>
              <Badge variant={order.status === "Delivered" ? "outline" : "default"}>{order.status}</Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">${order.total.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">{order.id}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className={expanded ? "" : "line-clamp-2"}>
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {order.items.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto font-normal text-primary"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show less" : "Show more"}
            </Button>
          )}

          <div className="flex justify-end pt-3">
            <Button variant="outline" onClick={() => onReorder(order.id)}>
              Reorder
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

