import styles from './LatestUpdates.module.css'

export default function LatestUpdates() {
  const updates = [
    {
      title: 'New Spring Collection Arrives',
      description: 'Discover our latest spring collection featuring handcrafted furniture pieces inspired by Scandinavian design. Each item combines functionality with timeless elegance, perfect for creating a warm and inviting atmosphere in your home. Made from sustainably sourced materials with attention to every detail.',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=350&h=250'
    },
    {
      title: 'Sustainable Furniture Guide',
      description: 'Learn about our commitment to sustainability and how we carefully select eco-friendly materials for all our furniture. From reclaimed wood to non-toxic finishes, we ensure every piece is crafted with both quality and environmental responsibility in mind. Join us in making conscious choices for your home.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=350&h=250'
    },
    {
      title: 'Design Tips for Small Spaces',
      description: 'Maximize your living space with our expert design tips and multifunctional furniture solutions. Whether you live in a studio apartment or a cozy home, our carefully designed pieces help you create a stylish and comfortable environment without compromising on functionality or aesthetic appeal.',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=350&h=250'
    }
  ]

  return (
    <section className={styles.latestUpdates}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Latest Updates</h2>
        
        <div className={styles.updatesGrid}>
          {updates.map((update, index) => (
            <div key={index} className={styles.updateCard}>
              <div className={styles.updateImage}>
                <img src={update.image} alt={update.title} />
              </div>
              <div className={styles.updateContent}>
                <h3 className={styles.updateTitle}>{update.title}</h3>
                <p className={styles.updateDescription}>{update.description}</p>
                <button className={styles.readMoreBtn}>READ MORE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
