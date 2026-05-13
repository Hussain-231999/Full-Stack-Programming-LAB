import styles from './HotDeals.module.css'

export default function HotDeals() {
  return (
    <section className={styles.hotDeals}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Hot Deal</h2>
        
        <div className={styles.dealsGrid}>
          <div className={styles.dealCard}>
            <img 
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=350" 
              alt="Elite Collection"
            />
            <div className={styles.dealContent}>
              <h3 className={styles.dealTitle}>Elite Collection</h3>
              <p className={styles.dealSubtitle}>Design Furniture</p>
              <div className={styles.discount}>
                <span className={styles.discountNumber}>35%</span>
                <span className={styles.saleOff}>SALE OFF</span>
              </div>
            </div>
          </div>

          <div className={styles.dealCard}>
            <img 
              src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&h=350" 
              alt="Reclaimed Collection"
            />
            <div className={styles.dealContent}>
              <h3 className={styles.dealTitle}>Reclaimed and hand crafted</h3>
              <div className={styles.discount}>
                <span className={styles.discountNumber}>50%</span>
                <span className={styles.saleOff}>SALE OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
