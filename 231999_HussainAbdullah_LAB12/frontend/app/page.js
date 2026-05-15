import Header from './components/Header'
import Hero from './components/Hero'
import Collections from './components/Collections'
import Products from './components/Products'
import HotDeals from './components/HotDeals'
import BuyOnline from './components/BuyOnline'
import LatestUpdates from './components/LatestUpdates'
import Partners from './components/Partners'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Collections />
      <Products />
      <HotDeals />
      <BuyOnline />
      <LatestUpdates />
      <Partners />
      <Footer />
    </main>
  )
}
