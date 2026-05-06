import "./globals.css";

export const metadata = {
  title: "Ecommerce App",
  description: "Simple ecommerce project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}