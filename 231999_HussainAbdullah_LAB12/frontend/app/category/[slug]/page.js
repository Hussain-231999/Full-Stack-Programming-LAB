'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function CategoryPage() {
  const params = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.slug) {
      fetchProducts()
    }
  }, [params.slug])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?category=${params.slug}`)
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />
      
      {/* Page Header */}
      <div className="bg-lightGray py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl text-secondary mb-2 text-center uppercase">
            {params.slug} Collection
          </h1>
          <p className="text-center text-darkGray">Browse our {params.slug} furniture</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-custom py-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-200 h-80 animate-pulse rounded"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl text-secondary mb-4">No products found</h2>
            <p className="text-darkGray mb-8">Check back soon for new additions!</p>
            <Link href="/">
              <button className="bg-primary text-white px-8 py-3 rounded hover:bg-orange-700 transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <Link href={`/products/${product._id}`}>
                  <div className="relative w-full h-48 md:h-56 bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/products/${product._id}`}>
                    <h3 className="text-sm md:text-base text-secondary mb-2 hover:text-primary transition-colors min-h-[40px]">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-lg font-bold text-primary mb-3">
                    £{product.price.toFixed(2)}
                  </p>
                  <Link href={`/products/${product._id}`}>
                    <button className="w-full bg-gray-200 text-darkGray py-2 text-xs rounded hover:bg-primary hover:text-white transition-all duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  )
}
