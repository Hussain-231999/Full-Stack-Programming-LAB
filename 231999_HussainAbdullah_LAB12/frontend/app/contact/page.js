'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would normally send to API
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-lightGray py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl text-secondary mb-4">Contact Us</h1>
          <p className="text-lg text-darkGray">
            We'd love to hear from you
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl text-secondary mb-6">Send us a message</h2>
            
            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-secondary mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-secondary mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm text-secondary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-secondary mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded hover:bg-orange-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl text-secondary mb-6">Get in touch</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg text-secondary mb-2 font-semibold">📍 Address</h3>
                <p className="text-darkGray">
                  123 Furniture Street<br />
                  London, UK<br />
                  SW1A 1AA
                </p>
              </div>

              <div>
                <h3 className="text-lg text-secondary mb-2 font-semibold">📞 Phone</h3>
                <p className="text-darkGray">07554 031409</p>
              </div>

              <div>
                <h3 className="text-lg text-secondary mb-2 font-semibold">✉️ Email</h3>
                <p className="text-darkGray">info@rustikplank.com</p>
              </div>

              <div>
                <h3 className="text-lg text-secondary mb-2 font-semibold">🕐 Business Hours</h3>
                <p className="text-darkGray">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
