import Link from 'next/link'

export default function Footer() {
  const footerLinks = {
    informations: [
      { name: 'Terms and conditions', href: '/terms' },
      { name: 'About us', href: '/about' },
      { name: 'Sitemap', href: '/sitemap' },
      { name: 'Contact', href: '/contact' },
      { name: 'Return policy', href: '/returns' },
      { name: 'Suppliers', href: '/suppliers' },
    ],
    myAccount: [
      { name: 'Your Account', href: '/account' },
      { name: 'Information', href: '/info' },
      { name: 'Addresses', href: '/addresses' },
      { name: 'Order history', href: '/orders' },
      { name: 'Delivery Information', href: '/delivery' },
      { name: 'Search Terms', href: '/search' },
    ],
    helpAndMore: [
      { name: 'New products', href: '/products/new' },
      { name: 'Top sellers', href: '/products/top' },
      { name: 'Manufacturers', href: '/manufacturers' },
      { name: 'Suppliers', href: '/suppliers' },
      { name: 'Specials', href: '/specials' },
    ],
    links: [
      { name: 'Delivery', href: '/delivery' },
      { name: 'Service', href: '/service' },
      { name: 'Gift Cards', href: '/gift-cards' },
      { name: 'Mobile', href: '/mobile' },
      { name: 'Manufacturers', href: '/manufacturers' },
    ]
  }

  return (
    <footer className="bg-gradient-to-br from-gray-300 to-gray-400 pt-10 md:pt-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pb-8 md:pb-10">
          {/* Informations Column */}
          <div>
            <h4 className="text-sm md:text-base text-secondary font-semibold mb-4 md:mb-5 tracking-wide">
              INFORMATIONS
            </h4>
            <ul className="space-y-2 md:space-y-2.5">
              {footerLinks.informations.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-xs md:text-sm text-darkGray hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account Column */}
          <div>
            <h4 className="text-sm md:text-base text-secondary font-semibold mb-4 md:mb-5 tracking-wide">
              MY ACCOUNT
            </h4>
            <ul className="space-y-2 md:space-y-2.5">
              {footerLinks.myAccount.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-xs md:text-sm text-darkGray hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help and More Column */}
          <div>
            <h4 className="text-sm md:text-base text-secondary font-semibold mb-4 md:mb-5 tracking-wide">
              HELP AND MORE
            </h4>
            <ul className="space-y-2 md:space-y-2.5">
              {footerLinks.helpAndMore.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-xs md:text-sm text-darkGray hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-sm md:text-base text-secondary font-semibold mb-4 md:mb-5 tracking-wide">
              LINKS
            </h4>
            <ul className="space-y-2 md:space-y-2.5">
              {footerLinks.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-xs md:text-sm text-darkGray hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black bg-opacity-10 py-4 md:py-5">
        <div className="container-custom">
          <p className="text-center text-xs md:text-sm text-gray-600">
            © 2024 Rustik Plank Furniture - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
