export default function Partners() {
  const partners = [
    'f4b',
    '🦘 Australian Government',
    '✈️ QANTAS',
    '🌊 Symantec',
    '⚙️ GE Money',
    '🔨 Rockwell Collins',
    '⚖️ LexisNexis',
    '📰 ninemsn'
  ]

  return (
    <section className="bg-white py-8 md:py-10 border-t border-b border-gray-200">
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="text-xs md:text-sm text-gray-400 font-medium hover:text-primary transition-colors cursor-pointer"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
