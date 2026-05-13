import styles from './Collections.module.css'

export default function Collections() {
  const collections = [
    {
      title: 'CHAIRS',
      subtitle: 'COLLECTION',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=250'
    },
    {
      title: 'BEDS',
      subtitle: 'COLLECTION',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=250'
    },
    {
      title: 'TABLES',
      subtitle: 'COLLECTION',
      image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=300&h=250'
    }
  ]

  return (
    <section className={styles.collections}>
      <div className={styles.container}>
        {collections.map((collection, index) => (
          <div key={index} className={styles.collectionCard}>
            <div className={styles.collectionHeader}>
              <h3 className={styles.collectionTitle}>{collection.title}</h3>
              <p className={styles.collectionSubtitle}>{collection.subtitle}</p>
            </div>
            <div className={styles.collectionImage}>
              <img src={collection.image} alt={collection.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
