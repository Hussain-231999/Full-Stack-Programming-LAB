'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`)
      setProduct(response.data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container-custom py-20">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-96 rounded mb-4"></div>
            <div className="bg-gray-200 h-8 w-3/4 rounded mb-4"></div>
            <div className="bg-gray-200 h-6 w-1/2 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="container-custom py-20 text-center">
          <h1 className="text-2xl text-secondary">Product not found</h1>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl text-secondary mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-xs text-gray-400 tracking-widest">PRICE</span>
              <span className="text-4xl md:text-5xl font-bold text-primary">
                £{product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-sm text-darkGray leading-relaxed mb-8">
              {product.description || 'Premium quality furniture handcrafted with attention to detail. Perfect for any modern home.'}
            </p>

            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-gray-100 text-xs text-darkGray rounded-full">
                Category: {product.category}
              </span>
              {product.inStock && (
                <span className="inline-block px-3 py-1 bg-green-100 text-xs text-green-700 rounded-full ml-2">
                  In Stock
                </span>
              )}
            </div>

            <button className="bg-primary text-white px-12 py-4 rounded text-sm font-semibold hover:bg-orange-700 transition-all duration-300">
              ADD TO CART 🛒
            </button>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-secondary mb-4">Product Details</h3>
              <ul className="space-y-2 text-sm text-darkGray">
                <li>• High-quality materials</li>
                <li>• Handcrafted design</li>
                <li>• Easy to assemble</li>
                <li>• 2-year warranty</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
