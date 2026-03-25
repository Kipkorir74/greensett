import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { trackEvent } from '../analytics'
import PageTransition from '../components/PageTransition'
import styles from './Contact.module.css'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const OFFICES = [
  {
    city: 'Nairobi',
    address: 'Pili Trade Center, Third Floor, Left Wing\nMombasa Road, Nairobi',
    icon: '🏢',
    primary: true,
  },
  {
    city: 'Mombasa',
    address: 'Mombasa Trade Center\nSecond Floor, South Tower',
    icon: '🚢',
    primary: false,
  },
]

const fi = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Contact() {
  const [form, setForm] = useState({
    from_name: '', from_email: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [errors, setErrors]       = useState({})
  const [sendError, setSendError] = useState(null)

  const upd = field => e => setForm(p => ({ ...p, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.from_name.trim())  e.from_name  = 'Name is required'
    if (!form.from_email.trim()) e.from_email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.from_email)) e.from_email = 'Enter a valid email'
    if (!form.subject.trim())    e.subject    = 'Subject is required'
    if (!form.message.trim())    e.message    = 'Message is required'
    return e
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSendError(null)
    setLoading(true)

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
      setSubmitted(true)
      // Track as a conversion in Google Analytics
      trackEvent('Contact', 'form_submission', form.subject)
    } catch (err) {
      console.error('EmailJS error:', err)
      setSendError('Something went wrong. Please try again or email us directly at info@greensett.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <SEO
          title="Contact Us"
          description="Contact Greensett Logistics for freight forwarding, customs clearance and transport solutions across East Africa. Offices in Nairobi and Mombasa. Call +254 795 692 588."
          keywords="contact Greensett Logistics, logistics quote Kenya, freight quote Nairobi, Mombasa logistics office, cargo enquiry Kenya, shipping quote East Africa"
          url="https://greensett.com/contact"
/>
      <div className={styles.page}>

        {/* ── HEADER ── */}
        <section className={styles.header}>
          <div className={styles.headerContent}>
            <motion.span className="section-tag" {...fi(0.1)}>Contact Us</motion.span>
            <motion.h1 className={styles.h1} {...fi(0.2)}>
              Have a shipment to plan?<br /><em>We're ready to assist.</em>
            </motion.h1>
            <motion.p className="section-lead" {...fi(0.3)}>
              Our team is ready to assist you with timely, reliable solutions across Eastern
              and Central Africa. Get in touch and we'll respond within 24 hours.
            </motion.p>
          </div>
        </section>

        {/* ── MAIN ── */}
        <section className={styles.main}>

          {/* Info Column */}
          <div className={styles.infoCol}>

            <motion.div {...fi(0)}>
              <h3 className={styles.infoHeading}>Get In Touch</h3>
              {[
                { icon: '📞', label: 'Phone / WhatsApp', value: '+254 795 692 588', href: 'tel:+254795692588' },
                { icon: '✉️', label: 'Email',            value: 'info@greensett.com', href: 'mailto:info@greensett.com' },
                { icon: '💼', label: 'LinkedIn',         value: 'Greensett Logistics Limited', href: 'https://linkedin.com/company/greensett-logistics-limited' },
              ].map(item => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={styles.directItem}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  whileHover={{ x: 4, transition: { duration: 0.18 } }}
                >
                  <div className={styles.directIcon}>{item.icon}</div>
                  <div>
                    <div className={styles.directLabel}>{item.label}</div>
                    <div className={styles.directValue}>{item.value}</div>
                  </div>
                  <span className={styles.directArrow}>↗</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div {...fi(0.15)} style={{ marginTop: '2rem' }}>
              <h3 className={styles.infoHeading}>Our Offices</h3>
              {OFFICES.map(o => (
                <motion.div
                  key={o.city}
                  className={`${styles.officeCard} ${o.primary ? styles.officeCardPrimary : ''}`}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <span className={styles.officeIcon}>{o.icon}</span>
                  <div>
                    <div className={styles.officeCity}>{o.city}</div>
                    <div className={styles.officeAddress}>
                      {o.address.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className={styles.hoursBox} {...fi(0.25)}>
              <h3 className={styles.infoHeading}>Operating Hours</h3>
              {[
                { day: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
                { day: 'Saturday',        time: '9:00 AM – 1:00 PM' },
                { day: 'Sunday',          time: 'Emergency only' },
              ].map(h => (
                <div key={h.day} className={styles.hoursRow}>
                  <span>{h.day}</span>
                  <span className={styles.hoursTime}>{h.time}</span>
                </div>
              ))}
              <div className={styles.alwaysOn}>
                <span className={styles.alwaysDot} />
                24/7 support for active shipments
              </div>
            </motion.div>

          </div>

          {/* Form Column */}
          <motion.div className={styles.formCard} {...fi(0.1)}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className={styles.form}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                >
                  <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>Send us a message</h2>
                    <p className={styles.formSub}>We'll respond within 24 hours</p>
                  </div>

                  <FormField label="Full Name" error={errors.from_name} required>
                    <input
                      className={`${styles.input} ${errors.from_name ? styles.inputError : ''}`}
                      placeholder="Your full name"
                      value={form.from_name}
                      onChange={upd('from_name')}
                    />
                  </FormField>

                  <FormField label="Email Address" error={errors.from_email} required>
                    <input
                      type="email"
                      className={`${styles.input} ${errors.from_email ? styles.inputError : ''}`}
                      placeholder="you@company.com"
                      value={form.from_email}
                      onChange={upd('from_email')}
                    />
                  </FormField>

                  <FormField label="Subject" error={errors.subject} required>
                    <input
                      className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                      placeholder="e.g. Freight forwarding enquiry"
                      value={form.subject}
                      onChange={upd('subject')}
                    />
                  </FormField>

                  <FormField label="Message" error={errors.message} required>
                    <textarea
                      className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                      placeholder="Describe your shipment requirements, origin, destination, cargo type…"
                      value={form.message}
                      onChange={upd('message')}
                    />
                  </FormField>

                  {/* Send error */}
                  {sendError && (
                    <motion.div
                      className={styles.sendError}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      ⚠️ {sendError}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.015 }}
                    whileTap={{ scale: loading ? 1 : 0.985 }}
                  >
                    {loading ? (
                      <span className={styles.loadingDots}>
                        <span /><span /><span />
                      </span>
                    ) : 'Send Message →'}
                  </motion.button>

                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className={styles.success}
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className={styles.successCircle}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 14 }}
                  >✓</motion.div>
                  <h3 className={styles.successTitle}>Message Sent!</h3>
                  <p className={styles.successText}>
                    Thank you, {form.from_name.split(' ')[0]}. Our team will review your
                    message and be in touch within 24 hours.
                  </p>
                  <div className={styles.successLinks}>
                    <a href="tel:+254795692588"         className={styles.successLink}>📞 +254 795 692 588</a>
                    <a href="mailto:info@greensett.com" className={styles.successLink}>✉️ info@greensett.com</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </section>
      </div>
    </PageTransition>
  )
}

function FormField({ label, error, required, children }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{
        display: 'block', fontSize: '0.78rem', fontWeight: 500,
        color: 'rgba(245,240,232,0.55)', textTransform: 'uppercase',
        letterSpacing: '0.08em', marginBottom: '0.5rem',
      }}>
        {label}{required && <span style={{ color: 'var(--green-lite)', marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '0.75rem', color: '#f09595', marginTop: '4px', display: 'block' }}
        >
          {error}
        </motion.span>
      )}
    </div>
  )
}