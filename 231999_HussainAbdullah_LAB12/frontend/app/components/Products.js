'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

export default function Products() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [specialProducts, setSpecialProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const [featured, special, popular] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?category=featured`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?category=special`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?category=popular`)
      ])

      setFeaturedProducts(featured.data.slice(0, 4))
      setSpecialProducts(special.data.slice(0, 4))
      setPopularProducts(popular.data.slice(0, 4))
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const ProductCard = ({ product, isOrange = false }) => (
    <div className="bg-gray-50 p-3 md:p-4 border border-gray-100 text-center">
      <Link href={`/products/${product._id}`}>
        <div className="relative w-full h-28 md:h-32 mb-3 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>
      <p className="text-[10px] md:text-xs text-darkGray mb-2 min-h-[32px] leading-tight">
        {product.name}
      </p>
      <p className="text-sm md:text-base font-semibold text-secondary mb-3">
        £{product.price.toFixed(2)}
      </p>
      <Link href={`/products/${product._id}`}>
        <button className={`px-6 py-2 text-xs rounded transition-all ${
          isOrange 
            ? 'bg-primary text-white hover:bg-orange-700' 
            : 'bg-gray-200 text-darkGray hover:bg-secondary hover:text-white'
        }`}>
          Detail
        </button>
      </Link>
    </div>
  )

  const ProductColumn = ({ title, products, viewAllLink }) => (
    <div className="bg-white p-4 md:p-6">
      <h3 className="text-lg md:text-xl text-center mb-6 md:mb-8 text-secondary tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3 md:gap-5 mb-6 md:mb-8">
        {products.map((product, index) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            isOrange={title === 'FEATURED' && index === 0}
          />
        ))}
      </div>
      <Link href={viewAllLink}>
        <button className="w-full bg-gray-100 text-darkGray py-3 text-xs md:text-sm border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all">
          See All {title === 'FEATURED' ? 'Feature' : title === 'SPECIAL' ? 'Special' : 'Popular'}
        </button>
      </Link>
    </div>
  )

  if (loading) {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 h-96 animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-100 py-8 md:py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
          <ProductColumn 
            title="FEATURED" 
            products={featuredProducts}
            viewAllLink="/category/featured"
          />
          <ProductColumn 
            title="SPECIAL" 
            products={specialProducts}
            viewAllLink="/category/special"
          />
          <ProductColumn 
            title="POPULAR" 
            products={popularProducts}
            viewAllLink="/category/popular"
          />
        </div>
      </div>
    </section>
  )
}
