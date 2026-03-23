import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.jpeg'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <img src={logo} alt="Greensett Logistics" className={styles.logo} />
        <p className={styles.tagline}>Delivering Possibility, Driving Progress.</p>
        <div className={styles.social}>
          <a href="https://linkedin.com" className={styles.socialBtn} title="LinkedIn" target="_blank" rel="noreferrer">in</a>
          <a href="mailto:info@greensett.com" className={styles.socialBtn} title="Email">@</a>
          <a href="tel:+254795692588" className={styles.socialBtn} title="Call">☎</a>
        </div>
      </div>

      <ul className={styles.links}>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        {/* <li><a href="http://www.greensett.com" target="_blank" rel="noreferrer">Website</a></li> */}
      </ul>

      <div className={styles.contact}>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Nairobi</span>
          <span>Pili Trade Center, 3rd Floor, Left Wing, Mombasa Road</span>
        </div>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Mombasa</span>
          <span>Mombasa Trade Center, 2nd Floor, South Tower</span>
        </div>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Phone</span>
          <span>+254 795 692 588</span>
        </div>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>Email</span>
          <span>info@greensett.com</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Greensett Logistics Limited</span>
        <span>Home of Logistics Solutions</span>
      </div>
    </footer>
  )
}
