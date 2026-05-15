import Image from 'next/image'

export default function HotDeals() {
  return (
    <section className="bg-white py-10 md:py-12">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl text-center mb-8 md:mb-10 text-secondary italic font-normal">
          Hot Deal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Deal 1 */}
          <div className="relative group overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64 md:h-80">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400"
                alt="Elite Collection"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
              <h3 className="text-xl md:text-2xl text-secondary mb-1 font-normal max-w-[200px]">
                Elite Collection
              </h3>
              <p className="text-sm text-darkGray mb-4">Design Furniture</p>
              <div className="flex flex-col">
                <span className="text-5xl md:text-6xl text-primary font-bold leading-none">35%</span>
                <span className="text-xs md:text-sm text-primary font-semibold tracking-wider mt-1">SALE OFF</span>
              </div>
            </div>
          </div>

          {/* Deal 2 */}
          <div className="relative group overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64 md:h-80">
              <Image
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&h=400"
                alt="Reclaimed Collection"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
              <h3 className="text-xl md:text-2xl text-secondary mb-1 font-normal max-w-[280px]">
                Reclaimed and hand crafted
              </h3>
              <div className="flex flex-col mt-4">
                <span className="text-5xl md:text-6xl text-primary font-bold leading-none">50%</span>
                <span className="text-xs md:text-sm text-primary font-semibold tracking-wider mt-1">SALE OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
