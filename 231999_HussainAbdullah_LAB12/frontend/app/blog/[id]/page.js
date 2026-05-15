'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function BlogDetailPage() {
  const params = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchBlog()
    }
  }, [params.id])

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${params.id}`)
      setBlog(response.data)
    } catch (error) {
      console.error('Error fetching blog:', error)
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
            <div className="bg-gray-200 h-6 w-full rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!blog) {
    return (
      <div>
        <Header />
        <div className="container-custom py-20 text-center">
          <h1 className="text-2xl text-secondary">Blog post not found</h1>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <article className="container-custom py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl text-secondary mb-4">
            {blog.title}
          </h1>
          
          <div className="text-sm text-darkGray mb-8">
            By {blog.author} • {new Date(blog.publishDate).toLocaleDateString()}
          </div>

          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="prose max-w-none">
            <p className="text-base text-darkGray leading-relaxed whitespace-pre-line">
              {blog.description}
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  )
}
