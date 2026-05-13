import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroImage}>
            <img 
              src="https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=400" 
              alt="Wooden Chair"
            />
          </div>
          
          <div className={styles.heroInfo}>
            <div className={styles.orangeTriangle}></div>
            <p className={styles.description}>
              Discover our handcrafted wooden chair collection, combining traditional craftsmanship with modern design. Each piece is carefully crafted from premium materials to bring warmth and elegance to your living space.
            </p>
            <div className={styles.priceSection}>
              <span className={styles.ourPrice}>OUR PRICE</span>
              <div className={styles.price}>£129</div>
            </div>
            <button className={styles.addToCart}>ADD TO 🛒</button>
          </div>
        </div>
        
        <div className={styles.curveDecoration}></div>
        <div className={styles.arrowNav}>
          <button className={styles.arrowBtn}>‹</button>
          <button className={styles.arrowBtn}>›</button>
        </div>
      </div>
    </section>
  )
}
