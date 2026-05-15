'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

export default function Collections() {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collections`)
      setCollections(response.data)
    } catch (error) {
      console.error('Error fetching collections:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="bg-white py-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-64 animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection) => (
            <Link 
              key={collection._id} 
              href={`/category/${collection.slug}`}
              className="group"
            >
              <div className="bg-gray-50 p-6 md:p-8 text-center border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="mb-5">
                  <h3 className="text-2xl md:text-3xl text-secondary mb-1 font-normal">
                    {collection.title}
                  </h3>
                  <p className="text-xs md:text-sm text-primary tracking-wider">
                    {collection.subtitle}
                  </p>
                </div>
                <div className="relative w-full h-48 md:h-56 overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
