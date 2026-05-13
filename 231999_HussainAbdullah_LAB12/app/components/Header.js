import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <span className={styles.logoR}>R</span>ustik Plank
          </div>
          
          <nav className={styles.mainNav}>
            <a href="#" className={styles.navLink}>Home</a>
            <a href="#" className={styles.navLink}>Blog</a>
            <a href="#" className={styles.navLink}>About Us</a>
            <a href="#" className={styles.navLink}>Contact Us</a>
          </nav>

          <div className={styles.rightSection}>
            <div className={styles.socialIcons}>
              <span>🛒</span>
              <span>🔍</span>
              <span>👤</span>
              <span>📘</span>
            </div>
            <div className={styles.contact}>
              <div>051 6207711</div>
              <div className={styles.accountLink}>My Account (Login/Register)</div>
            </div>
            <div className={styles.cartInfo}>
              🛒 0 item
            </div>
          </div>
        </div>
      </div>

      <div className={styles.categoryBar}>
        <div className={styles.container}>
          <a href="#" className={styles.category}>BEDS</a>
          <a href="#" className={styles.category}>CABINETS</a>
          <a href="#" className={styles.category}>BOOKCASES</a>
          <a href="#" className={styles.category}>BOXES</a>
          <a href="#" className={styles.category}>CHAIRS</a>
          <a href="#" className={styles.category}>TABLES</a>
          <a href="#" className={styles.category}>MORE...</a>
          <div className={styles.searchIcon}>🔍</div>
        </div>
      </div>
    </header>
  )
}
