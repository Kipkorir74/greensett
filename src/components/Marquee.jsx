const ITEMS = [
  'Freight Forwarding', 'Customs Clearance', 'Warehousing', 'Last Mile Delivery',
  'Sea Freight', 'Air Freight', 'Inland Transport', 'Port Clearance', 'Supply Chain Solutions',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee-band">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
