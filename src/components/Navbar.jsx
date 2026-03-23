import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.jpeg'
import transparent from '../assets/greensett_transparent.png'
import styles from './Navbar.module.css'

const navItems = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  { label: 'Services', to: '/services' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <NavLink to="/" className={styles.logo}>
        <img src={transparent} alt="Greensett Logistics" className={styles.logoImg} />
      </NavLink>

      <ul className={styles.links}>
        {navItems.map(item => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${styles.link} ${styles.cta} ${isActive ? styles.ctaActive : ''}`
            }
          >
            Get in Touch
          </NavLink>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/contact" className={`${styles.mobileLink} ${styles.mobileCta}`}>
              Get in Touch
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
