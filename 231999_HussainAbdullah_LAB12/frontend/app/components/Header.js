'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-lightGray border-b border-gray-300">
        <div className="container-custom">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-secondary">
              <span className="text-primary">R</span>ustik Plank
            </Link>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center space-x-8 ml-12">
              <Link href="/" className="text-sm text-darkGray hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/blog" className="text-sm text-darkGray hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-darkGray hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-darkGray hover:text-primary transition-colors">
                Contact Us
              </Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {/* Social Icons */}
              <div className="hidden lg:flex items-center space-x-3 text-base">
                <button className="hover:text-primary transition-colors">🛒</button>
                <button className="hover:text-primary transition-colors">🔍</button>
                <button className="hover:text-primary transition-colors">👤</button>
                <button className="hover:text-primary transition-colors">📘</button>
              </div>

              {/* Contact Info */}
              <div className="hidden lg:block text-right text-xs text-darkGray">
                <div className="font-semibold">07554 031409</div>
                <div className="text-[10px]">My Account (login/Register)</div>
              </div>

              {/* Cart */}
              <Link href="/cart" className="bg-primary text-white px-4 py-2 rounded text-xs font-medium hover:bg-orange-700 transition-colors">
                🛒 0 item
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between py-3">
            <nav className="flex items-center space-x-8">
              <Link href="/category/beds" className="text-xs font-medium text-darkGray hover:text-primary transition-colors tracking-wider">
                BEDS
              </Link>
              <Link href="/category/cabinets" className="text-xs font-medium text-darkGray hover:text-primary transition-colors tracking-wider">
                CABINETS
              </Link>
              <Link href="/category/bookcases" className="text-xs font-medium text-darkGray hover:text-primary transition-colors tracking-wider">
                BOOKCASES
              </Link>
              <Link href="/category/boxes" className="text-xs font-medium text-darkGray hover:text-primary transition-colors tracking-wider">
                BOXES
              </Link>
              <Link href="/category/chairs" className="text-xs font-medium text-darkGray hover:text-primary transition-colors tracking-wider">
                CHAIRS
              </Link>
              <Link href="/category/tables" className="text-xs font-medium text-darkGray hover:text-primary transition-colors tracking-wider">
                TABLES
              </Link>
              <Link href="/products" className="text-xs font-medium text-darkGray hover:text-primary transition-colors tracking-wider">
                MORE...
              </Link>
            </nav>

            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-lg text-darkGray hover:text-primary transition-colors"
            >
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="container-custom py-2">
          <nav className="flex flex-wrap gap-4">
            <Link href="/" className="text-xs text-darkGray">Home</Link>
            <Link href="/blog" className="text-xs text-darkGray">Blog</Link>
            <Link href="/about" className="text-xs text-darkGray">About</Link>
            <Link href="/contact" className="text-xs text-darkGray">Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
