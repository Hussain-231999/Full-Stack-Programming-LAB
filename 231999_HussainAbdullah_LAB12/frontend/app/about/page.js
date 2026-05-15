import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-lightGray py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl text-secondary mb-4">About Rustik Plank</h1>
          <p className="text-lg text-darkGray max-w-2xl mx-auto">
            Crafting quality furniture for over 20 years
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl text-secondary mb-6">Our Story</h2>
            <p className="text-darkGray leading-relaxed mb-4">
              Founded in 2004, Rustik Plank has been dedicated to creating handcrafted furniture that combines traditional craftsmanship with modern design. Every piece we create tells a story of quality, durability, and timeless elegance.
            </p>
            <p className="text-darkGray leading-relaxed mb-4">
              Our skilled artisans work with premium materials sourced from sustainable forests, ensuring that each piece of furniture is not only beautiful but also environmentally responsible.
            </p>
            <p className="text-darkGray leading-relaxed">
              We believe that furniture should be more than just functional—it should enhance your living space and bring warmth to your home for generations to come.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="https://plus.unsplash.com/premium_photo-1681345599459-8dac0feb3491?w=600&h=400&fit=crop"
              
              alt="Our Workshop"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="text-5xl mb-4">🌳</div>
            <h3 className="text-xl text-secondary mb-3">Sustainable</h3>
            <p className="text-sm text-darkGray">
              We use only sustainably sourced materials and eco-friendly finishes
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl mb-4">🛠️</div>
            <h3 className="text-xl text-secondary mb-3">Handcrafted</h3>
            <p className="text-sm text-darkGray">
              Each piece is carefully crafted by skilled artisans with decades of experience
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-xl text-secondary mb-3">Quality</h3>
            <p className="text-sm text-darkGray">
              We stand behind our products with a 2-year warranty on all furniture
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
