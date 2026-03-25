import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Globe from '../components/Globe'
import Marquee from '../components/Marquee'
import styles from './Home.module.css'

import truckHero   from '../assets/truck_hero.jpeg'
import truckRoad1  from '../assets/truck_road1.png'
import truckRoad2  from '../assets/truck_road2.png'
import port1       from '../assets/port1.png'
import port2       from '../assets/port2.png'
import port3       from '../assets/port3.png'
import loading1    from '../assets/loading1.png'
import crane1      from '../assets/crane1.jpeg'
import crane2      from '../assets/crane2.jpeg'
import avocado     from '../assets/avocado.png'
import avocado1     from '../assets/avocado_1.png'
import truckPort   from '../assets/truck_port.jpeg'
import ssd         from '../assets/SSD.jpg'
import tloading    from '../assets/loading_3.png'

/* ─── Ken Burns slide images ─── */
const SLIDES = [
  { src: truckRoad2,  alt: 'Greensett truck on the road',      origin: '60% center' },
  { src: truckRoad1,  alt: 'Greensett reefer truck en route',   origin: '55% center' },
  { src: tloading,      alt: 'Container loading operations',   origin: 'center 30%' },
  { src: avocado1,      alt: 'Avocado stuffing',   origin: '40% 30%' }, 
  { src: port3,       alt: 'Container yard',                    origin: '50% 60%' },
]

/* ─── Data ─── */
const WHY = [
  { num:'01', title:'Defined by Time, Defined by Trust',  body:'We understand that in logistics, every delay has a cost. Reliability and accountability guide every shipment we handle.' },
  { num:'02', title:'Regional Expertise, Real Reach',     body:'Deep on-the-ground knowledge across Eastern and Central Africa. We navigate regulations, borders, and terrain without disruption.' },
  { num:'03', title:'End-to-End Solutions',               body:'From freight forwarding and customs clearance to transport, warehousing, and last-mile delivery — we manage the entire journey.' },
  { num:'04', title:'Transparent Communication',          body:'No surprises. Proactive updates, clear documentation, and responsive support from pick-up to final delivery.' },
]

const SERVICES_PREVIEW = [
  { icon:'🌊', title:'Freight Forwarding',   desc:'End-to-end cargo coordination across sea, air, and land routes.' },
  { icon:'📋', title:'Customs Clearance',    desc:'Licensed brokerage with expert handling of documentation, compliance, and border processes.' },
  { icon:'🚚', title:'Transport & Delivery', desc:'Reliable inland transport and last-mile delivery with real-time tracking.' },
  { icon:'🏭', title:'Warehousing',          desc:'Flexible storage solutions supported by inventory management systems.' },
  { icon:'📞', title:'Client Support',        desc:'Dedicated 24/7 service teams providing transparent, responsive support.' },
]

const GALLERY = [
  { src: truckRoad1,  alt: 'Greensett truck on road' },
  { src: port1,       alt: 'Port operations' },
  { src: crane1,      alt: 'Container crane' },
  { src: avocado,     alt: 'Cargo loading' },
  { src: truckRoad2,  alt: 'Greensett reefer truck' },
  { src: port2,       alt: 'Port operations' },
  { src: loading1,    alt: 'Heavy lift' },
  { src: crane2,      alt: 'Crane operations' },
  { src: truckPort,   alt: 'Truck at port' },
  { src: port3,       alt: 'Container yard' },
]

/* ─── Animated count-up ─── */
function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const val = useSpring(0, { stiffness: 60, damping: 20 })
  const rounded = useTransform(val, v => Math.round(v))
  useEffect(() => { if (inView) val.set(to) }, [inView, val, to])
  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>
}

/* ─── Ken Burns Hero Slideshow ─── */
function KenBurnsSlideshow() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev]       = useState(null)

  useEffect(() => {
    const id = setInterval(() => {
      setPrev(current)
      setCurrent(c => (c + 1) % SLIDES.length)
    }, 7000)
    return () => clearInterval(id)
  }, [current])

  return (
    <div className={styles.slideshowWrap}>
      {/* Previous slide — fades out */}
      {prev !== null && (
        <motion.div
          key={`prev-${prev}`}
          className={styles.slide}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          style={{ backgroundImage: `url(${SLIDES[prev].src})`, backgroundPosition: SLIDES[prev].origin }}
        />
      )}

      {/* Current slide — Ken Burns zoom in */}
      <motion.div
        key={`curr-${current}`}
        className={styles.slide}
        initial={{ opacity: 0, scale: 1.0 }}
        animate={{ opacity: 1, scale: 1.08 }}
        transition={{ opacity: { duration: 1.8, ease: 'easeInOut' }, scale: { duration: 8, ease: 'linear' } }}
        style={{ backgroundImage: `url(${SLIDES[current].src})`, backgroundPosition: SLIDES[current].origin }}
      />

      {/* Slide indicators */}
      <div className={styles.slideIndicators}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.indicator} ${i === current ? styles.indicatorActive : ''}`}
            onClick={() => { setPrev(current); setCurrent(i) }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Main component ─── */
export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <PageTransition>
      <div className={styles.page}>

        {/* ════════════════ HERO ════════════════ */}
        <section ref={heroRef} className={styles.hero}>

          {/* Ken Burns slideshow background */}
          <KenBurnsSlideshow />

          {/* Gradient overlay */}
          <div className={styles.heroOverlay} />

          {/* ── Upper: tag + headline + paragraph + buttons ── */}
          <motion.div
            className={styles.heroContent}
            style={{ y: contentY, opacity: contentOpacity }}
          >
            <motion.div
              className={styles.heroTag}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* <span className={styles.tagDot} /> */}
              {/* Home of Logistics Solutions */}
            </motion.div>

            <h1 className={styles.h1}>
              {[
                { words: ['Moving', 'cargo,'],           em: false },
                { words: ['Powering', 'possibilities.'], em: true  },
              ].map((line, li) => (
                <span key={li} className={styles.hLine}>
                  {line.words.map((word, wi) => (
                    <motion.span
                      key={wi}
                      className={`${styles.word} ${line.em ? styles.wordAccent : ''}`}
                      initial={{ opacity: 0, y: 55, rotateX: -25 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.85,
                        delay: 0.5 + li * 0.28 + wi * 0.11,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.p
              className={styles.heroParagraph}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.1 }}
            >
              Greensett Logistics delivers reliable, end-to-end logistics solutions across Eastern
              and Central Africa built on trust, timeliness, and customer commitment.
            </motion.p>

            <motion.div
              className={styles.heroBtns}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.3 }}
            >
              <Link to="/contact"  className="btn-primary">Get in Touch ↗</Link>
              <Link to="/services" className="btn-secondary">Our Services</Link>
            </motion.div>
          </motion.div>

          {/* Spacer pushes stats to the bottom */}
          <div style={{ flex: 1, maxHeight: '3rem' }} />

          {/* ── Lower: stats bar — sits at the bottom in normal flex flow ── */}
          <motion.div
            className={styles.statsBar}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.7 }}
          >
            {[
              { to: 10, suffix: '+', label: 'Countries Served' },
              { to: 5,  suffix: '',  label: 'Core Services'    },
              { to: 2,  suffix: '',  label: 'Regional Offices' },
            ].map((s, i) => (
              <div key={i} className={styles.statItem}>
                <div className={styles.statNum}><CountUp to={s.to} suffix={s.suffix} /></div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </motion.div>

        </section>

        {/* ════════════════ MARQUEE ════════════════ */}
        <Marquee />

        {/* ════════════════ SERVICES STRIP ════════════════ */}
        <section className={styles.servicesStrip}>
          <div className={styles.stripHeader}>
            <motion.span className="section-tag"
              initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}>
              Our Services
            </motion.span>
            <motion.h2 className="section-h2"
              initial={{ opacity:0, y:25 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.1 }}>
              Integrated Logistics<br />Solutions
            </motion.h2>
            <motion.p className="section-lead"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.2 }}>
              Comprehensive services structured to support businesses at every stage of the supply
              chain from major ports to inland destinations across Eastern and Central Africa.
            </motion.p>
          </div>

          <div className={styles.servicesGrid}>
            {SERVICES_PREVIEW.map((svc, i) => (
              <motion.div
                key={svc.title}
                className={styles.svcCard}
                initial={{ opacity:0, y:50 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.65, delay:i * 0.1, ease:[0.22,1,0.36,1] }}
                whileHover={{ y:-8, transition:{ duration:0.2 } }}
              >
                <div className={styles.svcIconWrap}>
                  <span className={styles.svcIcon}>{svc.icon}</span>
                </div>
                <h3 className={styles.svcTitle}>{svc.title}</h3>
                <p className={styles.svcDesc}>{svc.desc}</p>
                <motion.div
                  className={styles.svcLine}
                  initial={{ scaleX:0 }}
                  whileInView={{ scaleX:1 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.6, delay:0.3 + i * 0.08 }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div style={{ textAlign:'center', marginTop:'3rem' }}
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            viewport={{ once:true }} transition={{ delay:0.4 }}>
            <Link to="/services" className="btn-secondary">View All Services →</Link>
          </motion.div>
        </section>

        {/* ════════════════ WHY GREENSETT ════════════════ */}
        <section className={styles.whySection}>
          <div className={styles.whyLeft}>
            <motion.span className="section-tag"
              initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}>
              Why Choose Greensett
            </motion.span>
            <motion.h2 className="section-h2"
              initial={{ opacity:0, y:25 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.1 }}>
              The Greensett<br />Difference
            </motion.h2>
            <motion.p className="section-lead"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.2 }}>
              Every mile planned. Every shipment protected.
            </motion.p>
          </div>
          <div className={styles.whyGrid}>
            {WHY.map((w, i) => (
              <motion.div
                key={w.num}
                className={styles.whyCard}
                initial={{ opacity:0, y:40, scale:0.97 }}
                whileInView={{ opacity:1, y:0, scale:1 }}
                viewport={{ once:true }}
                transition={{ duration:0.65, delay:i * 0.12 }}
                whileHover={{ scale:1.025, transition:{ duration:0.2 } }}
              >
                <span className={styles.whyNum}>{w.num}</span>
                <h3 className={styles.whyTitle}>{w.title}</h3>
                <p className={styles.whyBody}>{w.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════ OUR REACH — Globe section ════════════════ */}
        <section className={styles.reachSection}>
          <div className={styles.reachContent}>
            <motion.span className="section-tag"
              initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}>
              Our Reach
            </motion.span>
            <motion.h2 className="section-h2"
              initial={{ opacity:0, y:25 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.1 }}>
              Local Strength,<br />Regional Reach
            </motion.h2>
            <motion.p className="section-lead"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.2 }}>
              From the container terminals of Mombasa and Dar es Salaam to the rugged
              inland corridors leading to Kampala, Kigali, Juba, and Goma, we know the
              roads, the regulations, and the relationships.
            </motion.p>

            <motion.div
              className={styles.reachCities}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.3 }}>
              {['Mombasa', 'Nairobi', 'Dar es Salaam', 'Kampala', 'Kigali', 'Goma', 'Juba', 'Addis Ababa'].map((city, i) => (
                <motion.span
                  key={city}
                  className={styles.cityTag}
                  initial={{ opacity:0, scale:0.85 }}
                  whileInView={{ opacity:1, scale:1 }}
                  viewport={{ once:true }}
                  transition={{ delay:0.4 + i * 0.06 }}
                  whileHover={{ scale:1.07, transition:{ duration:0.15 } }}
                >
                  {city}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Globe — prominent, centred in right column */}
          <motion.div
            className={styles.globeWrap}
            initial={{ opacity:0, scale:0.88 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }}
            transition={{ duration:1.1, ease:[0.22,1,0.36,1] }}
          >
            <Globe style={{ width:'100%', height:'100%' }} />
            {/* Glow ring beneath globe */}
            <div className={styles.globeGlow} />
          </motion.div>
        </section>

        {/* ════════════════ SUN TZU QUOTE ════════════════ */}
        <section className={styles.quoteSection}>
          <motion.div
            className={styles.quoteInner}
            initial={{ opacity:0, scale:0.94 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }}
            transition={{ duration:1.0, ease:[0.22,1,0.36,1] }}
          >
            <motion.div className={styles.quoteMarks}
              initial={{ opacity:0, y:-20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.3 }}>"</motion.div>
            <motion.blockquote className={styles.quoteText}
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ duration:0.9, delay:0.4 }}>
              The line between disorder and order lies in logistics
            </motion.blockquote>
            <motion.cite className={styles.quoteCite}
              initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.7 }}>
              — Sun Tzu
            </motion.cite>
          </motion.div>
        </section>

        {/* ════════════════ GALLERY ════════════════ */}
        <section className={styles.gallerySection}>
          <div style={{ padding:'0 5vw', marginBottom:'3rem' }}>
            <motion.span className="section-tag"
              initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}>In the Field</motion.span>
            <motion.h2 className="section-h2"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.1 }}>
              Real Operations,<br />Real Results
            </motion.h2>
          </div>
          <div className="gallery-strip">
            <div className="gallery-track">
              {[...GALLERY, ...GALLERY].map((img, i) => (
                <div key={i} className="gallery-item">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ CTA ════════════════ */}
        <section className={styles.cta}>
          <motion.div className={styles.ctaInner}
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.8 }}>
            <motion.h2 className={styles.ctaH2}
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ delay:0.2 }}>
              Ready to Move Forward?
            </motion.h2>
            <motion.p className={styles.ctaBody}
              initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.3 }}>
              Partner with a team that understands the region, respects your timelines, and delivers
              with care at every stage. Let's move your cargo — the right way.
            </motion.p>
            <motion.div className={styles.ctaBtns}
              initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:0.45 }}>
              <Link to="/contact"  className="btn-primary"   style={{ fontSize:'1.05rem', padding:'1rem 2.5rem' }}>Contact Us ↗</Link>
              <Link to="/services" className="btn-secondary" style={{ fontSize:'1.05rem', padding:'1rem 2.5rem' }}>Our Services</Link>
            </motion.div>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  )
}
