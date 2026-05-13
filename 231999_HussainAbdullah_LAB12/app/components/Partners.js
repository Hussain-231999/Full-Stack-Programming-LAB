import styles from './Partners.module.css'

export default function Partners() {
  return (
    <section className={styles.partners}>
      <div className={styles.container}>
        <div className={styles.partnerLogo}>f4b</div>
        <div className={styles.partnerLogo}>🦘 Australian Government</div>
        <div className={styles.partnerLogo}>✈️ QANTAS</div>
        <div className={styles.partnerLogo}>🌊 Symantec</div>
        <div className={styles.partnerLogo}>⚙️ GE Money</div>
        <div className={styles.partnerLogo}>🔨 Rockwell Collins</div>
        <div className={styles.partnerLogo}>⚖️ LexisNexis</div>
        <div className={styles.partnerLogo}>📰 ninemsn</div>
      </div>
    </section>
  )
}
