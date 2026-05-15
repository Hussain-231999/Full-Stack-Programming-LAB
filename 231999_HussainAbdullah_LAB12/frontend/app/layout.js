import './globals.css'

export const metadata = {
  title: 'Rustik Plank - Quality Furniture Store',
  description: 'Premium handcrafted furniture for your home',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
