import Link from 'next/link'

export default function BuyOnline() {
  return (
    <section className="bg-gradient-to-r from-green-100 via-yellow-50 to-yellow-100 py-6 md:py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center md:items-baseline gap-3 md:gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-teal-500 font-bold tracking-wider">
              BUY ONLINE
            </h2>
            <p className="text-xs md:text-sm text-primary tracking-wider font-medium">
              PICK UP IN STORE
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs md:text-sm text-secondary font-semibold mb-1">
              NOW AVAILABLE IN OUR STORE SYSTEM
            </p>
            <p className="text-[10px] md:text-xs text-darkGray">
              AVAILABLE ON SELECT PRODUCTS.{' '}
              <Link href="/info" className="text-primary underline hover:text-orange-700">
                LEARN MORE
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
