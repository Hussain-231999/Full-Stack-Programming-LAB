import styles from './Products.module.css'

export default function Products() {
  const featuredProducts = [
    { name: 'Classic Wooden Chair', price: '£134.99', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=200&h=200' },
    { name: 'Modern Dining Table', price: '£289.99', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200' },
    { name: 'Oak Coffee Table', price: '£179.99', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200' },
    { name: 'Rustic Bookshelf', price: '£224.99', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200' }
  ]
    const specialProducts = [
      { name: 'Ergonomic Office Chair', price: '£199.99', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&h=200' },
      { name: 'Vintage Armchair', price: '£154.99', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=200&h=200' },
      { name: 'Wooden Side Table', price: '£89.99', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=200&h=200' },
      { name: 'King Size Bed Frame', price: '£449.99', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&h=200' }
    ]

    const popularProducts = [
      { name: 'Premium Wardrobe', price: '£379.99', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&h=200' },
      { name: 'Queen Platform Bed', price: '£399.99', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&h=200' },
      { name: 'Luxury Bedside Table', price: '£124.99', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=200&h=200' },
      { name: 'Contemporary Desk', price: '£269.99', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200' }
    ]

  return (
    <section className={styles.products}>
      <div className={styles.container}>
        <div className={styles.productColumn}>
          <h3 className={styles.columnTitle}>FEATURED</h3>
          <div className={styles.productGrid}>
            {featuredProducts.map((product, index) => (
              <div key={index} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
                </div>
                <p className={styles.productName}>{product.name}</p>
                <p className={styles.productPrice}>{product.price}</p>
                <button className={`${styles.detailBtn} ${index === 0 ? styles.orangeBtn : ''}`}>
                  Detail
                </button>
              </div>
            ))}
          </div>
          <button className={styles.seeAllBtn}>See All Feature</button>
        </div>

        <div className={styles.productColumn}>
          <h3 className={styles.columnTitle}>SPECIAL</h3>
          <div className={styles.productGrid}>
            {specialProducts.map((product, index) => (
              <div key={index} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
                </div>
                <p className={styles.productName}>{product.name}</p>
                <p className={styles.productPrice}>{product.price}</p>
                <button className={styles.detailBtn}>Detail</button>
              </div>
            ))}
          </div>
          <button className={styles.seeAllBtn}>See All Special</button>
        </div>

        <div className={styles.productColumn}>
          <h3 className={styles.columnTitle}>POPULAR</h3>
          <div className={styles.productGrid}>
            {popularProducts.map((product, index) => (
              <div key={index} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
                </div>
                <p className={styles.productName}>{product.name}</p>
                <p className={styles.productPrice}>{product.price}</p>
                <button className={styles.detailBtn}>Detail</button>
              </div>
            ))}
          </div>
          <button className={styles.seeAllBtn}>See All Popular</button>
        </div>
      </div>
    </section>
  )
}
