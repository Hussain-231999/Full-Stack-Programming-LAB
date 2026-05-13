import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>INFORMATIONS</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#">Terms and conditions</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Sitemap</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Return policy</a></li>
            <li><a href="#">Suppliers</a></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>MY ACCOUNT</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Information</a></li>
            <li><a href="#">Addresses</a></li>
            <li><a href="#">Order history</a></li>
            <li><a href="#">Delivery Information</a></li>
            <li><a href="#">Search Terms</a></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>HELP AND MORE</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#">New products</a></li>
            <li><a href="#">Top sellers</a></li>
            <li><a href="#">Manufacturers</a></li>
            <li><a href="#">Suppliers</a></li>
            <li><a href="#">Specials</a></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>LINKS</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Service</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Mobile</a></li>
            <li><a href="#">Manufacturers</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2018 Rustik Plank Furniture - All Rights Reserved</p>
      </div>
    </footer>
  )
}
