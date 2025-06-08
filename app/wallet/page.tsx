"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, History, Plus, Wallet } from "lucide-react"

export default function WalletPage() {
  const [balance, setBalance] = useState(75.5)
  const [amount, setAmount] = useState("")

  const handleAddFunds = () => {
    if (amount && !isNaN(Number(amount))) {
      setBalance((prev) => prev + Number(amount))
      setAmount("")
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wallet</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Balance
              </CardTitle>
              <CardDescription>Your current balance and recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <h2 className="text-4xl font-bold">${balance.toFixed(2)}</h2>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Funds
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="added">Added</TabsTrigger>
                  <TabsTrigger value="spent">Spent</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <TransactionList
                    transactions={[
                      { id: 1, type: "spent", amount: 24.99, description: "Order #ORD-12345", date: "Mar 15, 2023" },
                      {
                        id: 2,
                        type: "added",
                        amount: 50.0,
                        description: "Added via Credit Card",
                        date: "Mar 10, 2023",
                      },
                      { id: 3, type: "spent", amount: 18.5, description: "Order #ORD-12340", date: "Mar 5, 2023" },
                      { id: 4, type: "added", amount: 100.0, description: "Added via PayPal", date: "Mar 1, 2023" },
                    ]}
                  />
                </TabsContent>

                <TabsContent value="added">
                  <TransactionList
                    transactions={[
                      {
                        id: 2,
                        type: "added",
                        amount: 50.0,
                        description: "Added via Credit Card",
                        date: "Mar 10, 2023",
                      },
                      { id: 4, type: "added", amount: 100.0, description: "Added via PayPal", date: "Mar 1, 2023" },
                    ]}
                  />
                </TabsContent>

                <TabsContent value="spent">
                  <TransactionList
                    transactions={[
                      { id: 1, type: "spent", amount: 24.99, description: "Order #ORD-12345", date: "Mar 15, 2023" },
                      { id: 3, type: "spent", amount: 18.5, description: "Order #ORD-12340", date: "Mar 5, 2023" },
                    ]}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add Funds</CardTitle>
              <CardDescription>Add money to your wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-9"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[10, 25, 50, 100, 200, 500].map((value) => (
                  <Button key={value} variant="outline" onClick={() => setAmount(value.toString())}>
                    ${value}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Credit Card</p>
                    <p className="text-xs text-muted-foreground">**** **** **** 4242</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Change
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleAddFunds}
                disabled={!amount || isNaN(Number(amount)) || Number(amount) <= 0}
              >
                Add Funds
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface Transaction {
  id: number
  type: "added" | "spent"
  amount: number
  description: string
  date: string
}

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-start gap-3">
            <div
              className={`rounded-full p-2 ${transaction.type === "added" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
            >
              {transaction.type === "added" ? <Plus className="h-4 w-4" /> : <DollarSign className="h-4 w-4" />}
            </div>
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
          <div className={`font-medium ${transaction.type === "added" ? "text-green-600" : "text-red-600"}`}>
            {transaction.type === "added" ? "+" : "-"}${transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}

