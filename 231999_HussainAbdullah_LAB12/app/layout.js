import './globals.css'

export const metadata = {
  title: 'Rustik Plank - Furniture Store',
  description: 'Quality furniture for your home',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
