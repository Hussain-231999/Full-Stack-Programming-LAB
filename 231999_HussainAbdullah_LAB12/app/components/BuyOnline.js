import styles from './BuyOnline.module.css'

export default function BuyOnline() {
  return (
    <section className={styles.buyOnline}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>BUY ONLINE</h2>
          <p className={styles.subtitle}>PICK UP IN STORE</p>
        </div>
        <div className={styles.availability}>
          <p className={styles.availText}>NOW AVAILABLE IN OUR STORE SYSTEM</p>
          <p className={styles.productsText}>AVAILABLE ON SELECT PRODUCTS. <a href="#">LEARN MORE</a></p>
        </div>
      </div>
    </section>
  )
}
