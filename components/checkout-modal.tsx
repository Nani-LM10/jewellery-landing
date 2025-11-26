"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard, Lock, Check, ChevronRight, ArrowLeft, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/cart-provider"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = "shipping" | "payment" | "confirmation"

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState<Step>("shipping")
  const [isProcessing, setIsProcessing] = useState(false)

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setStep("confirmation")
    clearCart()
  }

  const handleClose = () => {
    setStep("shipping")
    onClose()
  }

  const steps = [
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "confirmation", label: "Confirm", icon: Check },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-card rounded-2xl shadow-2xl border border-accent/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold">Checkout</h2>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between">
                {steps.map((s, index) => (
                  <div key={s.id} className="flex items-center">
                    <div
                      className={`flex items-center gap-2 ${
                        steps.findIndex((st) => st.id === step) >= index ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          steps.findIndex((st) => st.id === step) >= index
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                        }`}
                      >
                        <s.icon className="w-5 h-5" />
                      </div>
                      <span className="hidden sm:block text-sm font-medium">{s.label}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-5 h-5 mx-2 sm:mx-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === "shipping" && (
                  <motion.form
                    key="shipping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleShippingSubmit}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          required
                          value={shippingData.firstName}
                          onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          required
                          value={shippingData.lastName}
                          onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={shippingData.email}
                          onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={shippingData.phone}
                          onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        required
                        value={shippingData.address}
                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          required
                          value={shippingData.city}
                          onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          required
                          value={shippingData.country}
                          onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          required
                          value={shippingData.zip}
                          onChange={(e) => setShippingData({ ...shippingData, zip: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                      Continue to Payment
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.form>
                )}

                {step === "payment" && (
                  <motion.form
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handlePaymentSubmit}
                    className="space-y-6"
                  >
                    {/* Order Summary */}
                    <div className="bg-secondary/30 rounded-xl p-4 mb-6">
                      <h4 className="font-semibold mb-3">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span className="text-muted-foreground">
                              {item.name} x {item.quantity}
                            </span>
                            <span>${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                          <span>Total</span>
                          <span className="text-primary">${total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                          className="pr-12"
                        />
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        required
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          required
                          value={paymentData.expiry}
                          onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/30 p-3 rounded-lg">
                      <Lock className="w-4 h-4" />
                      <span>Your payment is secured with SSL encryption</span>
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep("shipping")} className="flex-1">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-[2] bg-primary hover:bg-primary/90"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          />
                        ) : (
                          <>
                            Pay ${total.toLocaleString()}
                            <Lock className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}

                {step === "confirmation" && (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-10 h-10 text-primary" />
                    </motion.div>

                    <h3 className="text-2xl font-serif font-bold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your order has been successfully placed. We&apos;ll send you a confirmation email shortly.
                    </p>

                    <div className="bg-secondary/30 rounded-xl p-4 mb-6 text-left">
                      <div className="flex items-center gap-3 mb-3">
                        <Package className="w-5 h-5 text-primary" />
                        <span className="font-semibold">Order Details</span>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Order #: LUM-{Date.now().toString().slice(-8)}</p>
                        <p>Estimated delivery: 5-7 business days</p>
                        <p>
                          Shipping to: {shippingData.address}, {shippingData.city}
                        </p>
                      </div>
                    </div>

                    <Button onClick={handleClose} className="bg-primary hover:bg-primary/90">
                      Continue Shopping
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
