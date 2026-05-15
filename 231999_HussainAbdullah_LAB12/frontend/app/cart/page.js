'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-lightGray py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl text-secondary mb-4">Shopping Cart</h1>
          <p className="text-lg text-darkGray">
            {cartItems.length} items in your cart
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container-custom py-12 md:py-16">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl text-secondary mb-4">Your cart is empty</h2>
            <p className="text-darkGray mb-8">Add some products to get started!</p>
            <Link href="/">
              <button className="bg-primary text-white px-8 py-3 rounded hover:bg-orange-700 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl text-secondary mb-6">Cart Items</h2>
                {/* Cart items would go here */}
              </div>
            </div>

            {/* Cart Summary */}
            <div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl text-secondary mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-darkGray">Subtotal</span>
                    <span className="text-secondary">£0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-darkGray">Shipping</span>
                    <span className="text-secondary">£0.00</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-lg font-semibold text-secondary">Total</span>
                    <span className="text-lg font-semibold text-primary">£0.00</span>
                  </div>
                </div>

                <button className="w-full bg-primary text-white py-3 rounded hover:bg-orange-700 transition-colors mb-3">
                  Proceed to Checkout
                </button>
                
                <Link href="/">
                  <button className="w-full bg-gray-200 text-darkGray py-3 rounded hover:bg-gray-300 transition-colors">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
