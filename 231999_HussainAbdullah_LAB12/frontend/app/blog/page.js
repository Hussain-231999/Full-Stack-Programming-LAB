'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`)
      setBlogs(response.data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="bg-lightGray py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl text-secondary mb-2 text-center">Blog</h1>
          <p className="text-center text-darkGray mb-8">Latest updates and news</p>
        </div>
      </div>

      <div className="container-custom py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 h-96 animate-pulse rounded"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative w-full h-56">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg text-secondary mb-3 font-normal">{blog.title}</h3>
                  <p className="text-xs text-darkGray leading-relaxed mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                  <Link href={`/blog/${blog._id}`}>
                    <button className="border border-gray-300 text-darkGray px-6 py-2 text-xs hover:bg-primary hover:text-white hover:border-primary transition-all">
                      READ MORE
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
