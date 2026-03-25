import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import styles from './Services.module.css'

import truckRoad2 from '../assets/truck_road2.png'
import port1      from '../assets/port1.png'
import truckFront from '../assets/truck_front.jpeg'
import ssd        from '../assets/ssd.png'
import truckHapag from '../assets/truck_hapag.jpeg'
import port3      from '../assets/port3.png'
import crane1     from '../assets/crane1.jpeg'
import avocado    from '../assets/avocado.png'
import loading1   from '../assets/loading1.png'
import truckRoad1 from '../assets/truck_road1.png'

const SERVICES = [
  {
    id:'freight', icon:'🌊', img:truckRoad2,
    title:'Freight Forwarding',
    intro:'We offer coordinated freight forwarding services for your cargo movement by sea, air, and land. Our experienced team assists in all logistics processes to ensure efficient and cost-effective movement for your cargo.',
    items:[
      'Ocean freight (FCL & LCL) through Mombasa and Dar es Salaam',
      'Air Freight for express cargo and international shipments',
      'Air freight solutions for time-sensitive shipments',
      'Multi-modal transport solutions',
      'Cargo consolidation & deconsolidation',
      'Documentation and insurance support',
    ],
  },
  {
    id:'customs', icon:'📋', img:port1,
    title:'Customs Clearance',
    intro:'Manoeuvring customs regulations is often a complicated process. Our licensed customs clearance team handles clearance and bonded transit, ensuring all requirements and regulations are adhered to for smooth movement of cargo across the region.',
    items:[
      'Import & export documentation',
      'Duty and tax advisory',
      'Temporary import/export handling',
      'Bonded warehousing & transit permits',
      'Coordination with KRA, TRA, URA, and other regional authorities',
    ],
  },
  {
    id:'transport', icon:'🚚', img:truckFront,
    title:'Transport & Delivery',
    intro:'Greensett Logistics provides reliable inland transport and last-mile delivery services across key regional corridors. From port exit to final destination, we ensure cargo is moved securely and efficiently with real-time tracking.',
    items:[
      'Port-to-door and door-to-door delivery',
      'Containerized and bulk transport',
      'Last-mile delivery services',
      'GPS tracking and digital proof of delivery',
    ],
  },
  {
    id:'warehousing', icon:'🏭', img:ssd,
    title:'Warehousing',
    intro:'Our warehousing solutions offer flexible, secure storage options designed to support efficient inventory management. Whether short-term storage during clearance or longer-term warehousing, our facilities protect cargo and optimize flow.',
    items:[
      'Short-term and long-term storage',
      'Temperature-controlled facilities (available upon request)',
      'Order fulfillment & distribution',
      'Real-time inventory tracking',
      'Cross-docking & consolidation',
    ],
  },
  {
    id:'support', icon:'📞', img:truckHapag,
    title:'Client Support',
    intro:'Dedicated service teams providing transparent, 24/7 updates and responsive support — because informed clients make confident decisions. We are with you from booking to delivery.',
    items:[
      'Dedicated account manager per client',
      '24/7 WhatsApp & email support',
      'Live shipment tracking & visibility',
      'Proactive communication throughout transit',
      'Post-delivery reporting & documentation',
    ],
  },
]

const fi = (delay=0) => ({
  initial:{ opacity:0, y:28 }, whileInView:{ opacity:1, y:0 },
  viewport:{ once:true }, transition:{ duration:0.7, delay, ease:[0.22,1,0.36,1] },
})

export default function Services() {
  const [active, setActive] = useState(null)

  return (
    <PageTransition>
      <SEO
          title="Our Services"
          description="Greensett Logistics offers freight forwarding, customs clearance, inland transport, warehousing and 24/7 client support across Kenya, Tanzania, Uganda, Rwanda and beyond."
          keywords="freight forwarding Kenya, customs clearance Kenya, inland transport East Africa, warehousing Nairobi, warehousing Mombasa, last mile delivery Kenya, FCL LCL shipping Kenya, bonded warehouse Kenya, cargo transport Uganda Rwanda, logistics services Tanzania"
          url="https://greensett.com/services"
      />
      <div className={styles.page}>

        {/* ── HEADER ── */}
        <section className={styles.header}>
          <motion.span className="section-tag" {...fi(0.1)}>What We Do</motion.span>
          <motion.h1 className={styles.h1} {...fi(0.2)}>
            Integrated Logistics<br /><em>Solutions at Greensett</em>
          </motion.h1>
          <motion.p className="section-lead" {...fi(0.3)}>
            Comprehensive logistics services designed to simplify cargo movement across Eastern and
            Central Africa. We manage complexity so your cargo moves efficiently — without disruption
            from major ports to inland destinations.
          </motion.p>
        </section>

        {/* ── SERVICE CARDS ── */}
        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.id}
                className={`${styles.card} ${active === svc.id ? styles.cardOpen : ''}`}
                initial={{ opacity:0, y:45 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.65, delay:i * 0.09 }}
              >
                {/* Image strip */}
                <div className={styles.cardImg}>
                  <img src={svc.img} alt={svc.title} />
                  <div className={styles.cardImgGrad} />
                  <span className={styles.cardIconFloat}>{svc.icon}</span>
                </div>

                {/* Body */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{svc.title}</h3>
                  <p className={styles.cardIntro}>{svc.intro}</p>

                  <AnimatePresence>
                    {active === svc.id && (
                      <motion.div
                        className={styles.cardItems}
                        initial={{ opacity:0, height:0 }}
                        animate={{ opacity:1, height:'auto' }}
                        exit={{ opacity:0, height:0 }}
                        transition={{ duration:0.38 }}
                      >
                        <p className={styles.cardItemsLabel}>Services include:</p>
                        <ul className={styles.itemList}>
                          {svc.items.map((item, j) => (
                            <motion.li
                              key={j}
                              className={styles.itemRow}
                              initial={{ opacity:0, x:-12 }}
                              animate={{ opacity:1, x:0 }}
                              transition={{ delay:j * 0.06 }}
                            >
                              <span className={styles.itemDot} />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                        <Link to="/contact" className={`btn-primary ${styles.cardCta}`}>
                          Enquire Now ↗
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    className={styles.cardToggle}
                    onClick={() => setActive(active === svc.id ? null : svc.id)}
                  >
                    <span>{active === svc.id ? 'Show less' : 'Learn more'}</span>
                    <motion.span
                      className={styles.toggleArrow}
                      animate={{ rotate: active === svc.id ? 180 : 0 }}
                      transition={{ duration:0.3 }}
                    >↓</motion.span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── MOVING CARGO THE RIGHT WAY ── */}
        <section className={styles.rightWay}>
          <motion.div className={styles.rightWayInner} {...fi(0)}>
            <span className="section-tag">Moving Cargo the Right Way</span>
            <h2 className="section-h2" style={{ maxWidth:680 }}>
              From Coastal Ports to<br />Inland Africa
            </h2>
            <p className={styles.rightWayBody}>
              From coastal ports in Kenya and Tanzania to the rest of Eastern Africa, Greensett
              Logistics offers cross-border expertise rooted in practical knowledge of local roads,
              regulations, and networks. We do not just move goods — we connect markets, bridging
              Africa's trade corridors efficiently and responsibly.
            </p>
            <motion.div
              className={styles.portTags}
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ delay:0.3 }}
            >
              {['Mombasa Port, Kenya', 'Dar es Salaam Port, Tanzania', 'Inland EAC Corridors', 'Cross-border Transit'].map(t => (
                <span key={t} className={styles.portTag}>{t}</span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.rightWayImages}
            initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.8 }}
          >
            <div className={styles.rwImg}><img src={truckRoad1} alt="Greensett truck on corridor road" /></div>
            <div className={styles.rwImg}><img src={port3}      alt="Port operations" /></div>
            <div className={`${styles.rwImg} ${styles.rwImgWide}`}>
              <img src={loading1} alt="Loading operations" />
            </div>
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.cta}>
          <motion.h2 className={styles.ctaH2} {...fi(0)}>Tell us about your cargo</motion.h2>
          <motion.p className={styles.ctaLead} {...fi(0.1)}>Get a tailored quote within 24 hours.</motion.p>
          <motion.div {...fi(0.2)}>
            <Link to="/contact" className="btn-primary" style={{ fontSize:'1.05rem', padding:'1rem 2.5rem' }}>
              Contact Us ↗
            </Link>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  )
}
