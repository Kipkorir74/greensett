import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import styles from './About.module.css'

import port1      from '../assets/port1.png'
import truckRoad1 from '../assets/truck_road1.png'
import crane1     from '../assets/crane1.jpeg'
import crane2     from '../assets/crane2.jpeg'
import crane3     from '../assets/crane3.jpeg'
import avocado    from '../assets/avocado.png'
import truckRoad2 from '../assets/truck_road2.png'
import ssd        from '../assets/ssd.png'
import port3      from '../assets/port3.png'
import truckHero  from '../assets/truck_hero.jpeg'
import truckPort  from '../assets/truck_port.jpeg'

const VALUES = [
  { icon:'⏱', title:'Timeliness',           desc:'We understand that time is money. Every shipment is managed with urgency and accuracy.' },
  { icon:'🤝', title:'Teamwork',             desc:'Collaboration is at our core. We work closely with all stakeholders to deliver seamless logistics solutions.' },
  { icon:'📡', title:'Communication',        desc:'No surprises. We provide proactive, transparent updates from pickup to final delivery — we understand the importance of visibility.' },
  { icon:'⭐', title:'Customer Commitment',  desc:'We prioritize your success. We go beyond transactions to build trust and long-term partnerships.' },
]

const QUOTES = [
  { text:"Every package we handle isn't just cargo — it's a promise we make to our customers.", name:'Alvin Nyakeri', role:'Operations Manager', initials:'AN' },
  { text:"Customer experience is like a good joke — if you have to explain it, it's probably not working. That's why we just get it right the first time.", name:'Collins Onchagwa', role:'Commercial Manager', initials:'CO' },
  { text:"Sustainability in logistics isn't just about reducing emissions; it's about designing smarter, more efficient supply chains that serve people, planet, and progress.", name:'Sylvia Mongare', role:'Operations Coordinator', initials:'SM' },
]

const STAKEHOLDERS = ['WFP', 'CMA CGM', 'ICRC', 'PIL']

const fi = (delay=0) => ({
  initial:{ opacity:0, y:28 }, whileInView:{ opacity:1, y:0 },
  viewport:{ once:true }, transition:{ duration:0.7, delay, ease:[0.22,1,0.36,1] },
})

export default function About() {
  const [activeQ, setActiveQ] = useState(0)
  const bannerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target:bannerRef, offset:['start start','end start'] })
  const bannerY = useTransform(scrollYProgress, [0,1], ['0%','30%'])

  return (
    <PageTransition>
      <div className={styles.page}>

        {/* ── PARALLAX BANNER ── */}
        <section ref={bannerRef} className={styles.banner}>
          <motion.div
            className={styles.bannerBg}
            style={{ backgroundImage:`linear-gradient(to bottom,rgba(10,22,40,0.75) 0%,rgba(10,22,40,0.95) 100%),url(${truckHero})`, y:bannerY }}
          />
          <div className={styles.bannerContent}>
            <motion.span className="section-tag" {...fi(0.2)}>About Us</motion.span>
            <motion.h1 className={styles.bannerH1} {...fi(0.3)}>
              We are<br /><em>Greensett Logistics</em>
            </motion.h1>
            <motion.p className={styles.bannerLead} {...fi(0.4)}>
              A regional logistics partner built on timeliness and trust. We offer end-to-end
              logistics solutions across Eastern and Central Africa, connecting businesses to
              and from major ports and inland destinations. Driven by a passion for reliable and
              transparent logistics, we deliver not just goods, but confidence.
            </motion.p>
          </div>
        </section>

        {/* ── PURPOSE & DRIVE ── */}
        <section className={styles.purpose}>
          <div className={styles.purposeGrid}>
            <motion.div {...fi(0)}>
              <span className="section-tag">Our Purpose</span>
              <h2 className={styles.purposeTitle}>Why We Exist</h2>
              <p className={styles.purposeBody}>
                We exist to simplify trade across Africa by making logistics accessible, reliable,
                and efficient for businesses of all sizes. Whether importing, exporting, or moving
                cargo inland, we remove complexity so our clients can focus on growth.
              </p>
            </motion.div>
            <motion.div {...fi(0.15)}>
              <span className="section-tag">What Drives Us</span>
              <h2 className={styles.purposeTitle}>Our Drive</h2>
              <p className={styles.purposeBody}>
                We are driven by a commitment to deliver tailored, end-to-end supply chain
                solutions that meet the unique needs of every client. From port to final
                destination, we operate with consistency, precision, and genuine care across
                Eastern and Central Africa.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className={styles.valuesSection}>
          <div className={styles.valuesHeader}>
            <motion.span className="section-tag" {...fi(0)}>Our Values</motion.span>
            <motion.h2 className="section-h2" {...fi(0.1)}>
              What We Stand For
            </motion.h2>
          </div>
          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                className={styles.valueCard}
                initial={{ opacity:0, y:40, scale:0.96 }}
                whileInView={{ opacity:1, y:0, scale:1 }}
                viewport={{ once:true }}
                transition={{ duration:0.65, delay:i * 0.12 }}
                whileHover={{ y:-6, transition:{ duration:0.2 } }}
              >
                <motion.span
                  className={styles.valueIcon}
                  initial={{ scale:0.5, opacity:0 }}
                  whileInView={{ scale:1, opacity:1 }}
                  viewport={{ once:true }}
                  transition={{ type:'spring', stiffness:200, delay:0.2 + i*0.1 }}
                >
                  {v.icon}
                </motion.span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── REGIONAL STRENGTH ── */}
        <section className={styles.regional}>
          <div className={styles.regionalContent}>
            <motion.span className="section-tag" {...fi(0)}>Our Regional Strength</motion.span>
            <motion.h2 className="section-h2" {...fi(0.1)}>
              On-the-ground<br />Expertise
            </motion.h2>
            <motion.p className="section-lead" {...fi(0.2)}>
              Greensett Logistics operates extensively across Eastern and Central Africa. We deliver
              seamless logistics solutions supported by our deep understanding of the region's
              transport corridors and regulatory environments.
            </motion.p>
            <motion.p className={styles.regionalBody} {...fi(0.3)}>
              Our experience transcends maps and manuals. We understand the condition of the roads,
              the nuances of cross-border procedures, and hold in high regard the strong relationships
              with port authorities, customs officials, and local partners enabling us to anticipate
              challenges before they arise so your shipments never stall.
            </motion.p>

            {/* Corridor tags */}
            <motion.div className={styles.corridorTags} {...fi(0.4)}>
              {['Mombasa Port','Dar es Salaam Port','Nairobi Hub','Kampala','Kigali','Juba','Goma','Addis Ababa'].map(c => (
                <motion.span
                  key={c} className={styles.corridorTag}
                  whileHover={{ scale:1.05, transition:{ duration:0.15 } }}
                >
                  {c}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Mosaic photo grid */}
          <motion.div
            className={styles.regionalGrid}
            initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
          >
            <div className={`${styles.rImg} ${styles.rImgTall}`}>
              <img src={crane2} alt="Regional operations" />
            </div>
            <div className={styles.rImg}>
              <img src={truckPort} alt="Port truck" />
            </div>
            <div className={styles.rImg}>
              <img src={port3} alt="Container port" />
            </div>
            <div className={`${styles.rImg} ${styles.rImgWide}`}>
              <img src={ssd} alt="Loading operations" />
            </div>
          </motion.div>
        </section>

        {/* ── OUR CUSTOMERS ── */}
        <section className={styles.customers}>
          <motion.div className={styles.customersInner} {...fi(0)}>
            <span className="section-tag" style={{ display:'block', textAlign:'center' }}>Our Customers, Our Priority</span>
            <motion.h2 className="section-h2" style={{ textAlign:'center', margin:'0 auto 1.5rem', maxWidth:600 }} {...fi(0.1)}>
              At the Heart of<br />Everything We Do
            </motion.h2>
            <motion.p className={styles.customersBody} {...fi(0.2)}>
              Our commitment to customers is the foundation of our business. We believe success is
              built on listening and delivering on every promise. Every package we handle represents
              trust placed in us, and we take that responsibility seriously with every shipment.
            </motion.p>
          </motion.div>
        </section>

        {/* ── STAKEHOLDERS ── */}
        <section className={styles.stakeholders}>
          <motion.span className="section-tag" style={{ display:'block', textAlign:'center', marginBottom:'1rem' }}
            {...fi(0)}>Our Stakeholders</motion.span>
          <motion.p className={styles.stakeholdersLead} {...fi(0.1)}>
            Trusted by leading global and regional organisations
          </motion.p>
          <div className={styles.stakeholderRow}>
            {STAKEHOLDERS.map((s, i) => (
              <motion.div
                key={s}
                className={styles.stakeholderBadge}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.5, delay:i * 0.09 }}
                whileHover={{ scale:1.07, transition:{ duration:0.15 } }}
              >
                {s}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── QUOTES CAROUSEL ── */}
        <section className={styles.quotes}>
          <motion.span className="section-tag" style={{ display:'block', textAlign:'center' }} {...fi(0)}>
            Our People
          </motion.span>
          <motion.h2 className="section-h2" style={{ textAlign:'center', margin:'0 auto 3rem', maxWidth:540 }} {...fi(0.1)}>
            The Voices Behind<br />Every Delivery
          </motion.h2>

          <div className={styles.quoteCarousel}>
            <motion.div
              key={activeQ}
              className={styles.quoteSlide}
              initial={{ opacity:0, y:16, scale:0.98 }}
              animate={{ opacity:1, y:0, scale:1 }}
              transition={{ duration:0.45, ease:[0.22,1,0.36,1] }}
            >
              <p className={styles.quoteText}>{QUOTES[activeQ].text}</p>
              <div className={styles.quoteAuthor}>
                <div className={styles.authorAvatar}>{QUOTES[activeQ].initials}</div>
                <div>
                  <div className={styles.authorName}>{QUOTES[activeQ].name}</div>
                  <div className={styles.authorRole}>{QUOTES[activeQ].role}</div>
                </div>
              </div>
            </motion.div>
            <div className={styles.dots}>
              {QUOTES.map((_, i) => (
                <button key={i}
                  className={`${styles.dot} ${i === activeQ ? styles.dotActive : ''}`}
                  onClick={() => setActiveQ(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.cta}>
          <motion.h2 className={styles.ctaH2} {...fi(0)}>Ready to work with us?</motion.h2>
          <motion.div {...fi(0.15)} style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/contact"  className="btn-primary">Get in Touch ↗</Link>
            <Link to="/services" className="btn-secondary">View Services</Link>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  )
}
