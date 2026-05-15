'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

export default function LatestUpdates() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`)
      setBlogs(response.data.slice(0, 3))
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="bg-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-96 animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-10 md:py-12">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl text-center mb-8 md:mb-10 text-secondary italic font-normal">
          Latest Updates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog) => (
            <div 
              key={blog._id} 
              className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative w-full h-48 md:h-56">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-base md:text-lg text-secondary mb-3 md:mb-4 font-normal">
                  {blog.title}
                </h3>
                <p className="text-xs text-darkGray leading-relaxed mb-4 md:mb-5 text-justify line-clamp-4">
                  {blog.description}
                </p>
                <Link href={`/blog/${blog._id}`}>
                  <button className="border border-gray-300 text-darkGray px-6 py-2 text-[10px] md:text-xs tracking-wide hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                    READ MORE
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
