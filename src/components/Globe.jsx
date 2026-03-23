import { useRef, useEffect, useState } from 'react'
import GlobeGL from 'react-globe.gl'

const CITIES = [
  { name: 'Nairobi',       lat: -1.29,  lon: 36.82, hub: true  },
  { name: 'Mombasa',       lat: -4.05,  lon: 39.67, hub: true  },
  { name: 'Dar es Salaam', lat: -6.77,  lon: 39.27, hub: false },
  { name: 'Kampala',       lat:  0.32,  lon: 32.57, hub: false },
  { name: 'Kigali',        lat: -1.94,  lon: 30.06, hub: false },
  { name: 'Goma',          lat: -1.68,  lon: 29.23, hub: false },
  { name: 'Juba',          lat:  4.86,  lon: 31.57, hub: false },
  { name: 'Addis Ababa',   lat:  9.03,  lon: 38.74, hub: false },
]

const ROUTES = [
  { from: 'Nairobi',   to: 'Mombasa'       },
  { from: 'Nairobi',   to: 'Dar es Salaam' },
  { from: 'Nairobi',   to: 'Kampala'       },
  { from: 'Nairobi',   to: 'Kigali'        },
  { from: 'Nairobi',   to: 'Addis Ababa'   },
  { from: 'Mombasa',   to: 'Dar es Salaam' },
  { from: 'Kampala',   to: 'Juba'          },
  { from: 'Kigali',    to: 'Goma'          },
]

const cityMap = Object.fromEntries(CITIES.map(c => [c.name, c]))

const ARCS = ROUTES.map(r => ({
  startLat:  cityMap[r.from].lat,
  startLng:  cityMap[r.from].lon,
  endLat:    cityMap[r.to].lat,
  endLng:    cityMap[r.to].lon,
  color: r.from === 'Nairobi' && r.to === 'Mombasa'
    ? ['#ffffff', '#ffffff']
    : ['#6fe898', '#4cb876'],
}))

const POINTS = CITIES.map(c => ({
  lat:   c.lat,
  lng:   c.lon,
  name:  c.name,
  size:  c.hub ? 0.8 : 0.5,
  color: c.hub ? '#ffffff' : '#6fe898',
}))

export default function Globe({ style }) {
  const globeRef = useRef(null)
  const [size, setSize]       = useState(500)
  const wrapRef               = useRef(null)

  // Match container size
  useEffect(() => {
    if (!wrapRef.current) return
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width
      setSize(w)
    })
    ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  // Point camera at East Africa once globe mounts
  useEffect(() => {
    if (!globeRef.current) return
    const timer = setTimeout(() => {
      globeRef.current.pointOfView(
        { lat: -1.0, lng: 35.0, altitude: 1.8 },
        1200  // animate in over 1.2s
      )
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        ...style,
        width: '100%',
        aspectRatio: '1',
        overflow: 'hidden',
        borderRadius: '50%',
      }}
    >
      <GlobeGL
        ref={globeRef}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#2d8a52"
        atmosphereAltitude={0.18}
        // Globe surface
        globeImageUrl={null}
        bumpImageUrl={null}
        showGlobe={true}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        onGlobeReady={() => {
          // Globe texture loaded — nothing extra needed
        }}
        // Slow auto-rotation centred on Africa
        enablePointerInteraction={true}
        animateIn={false}
        // Points
        pointsData={POINTS}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointRadius="size"
        pointAltitude={0.01}
        pointLabel="name"
        // Arcs
        arcsData={ARCS}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcAltitude={0.25}
        arcStroke={0.8}
        arcDashLength={0.6}
        arcDashGap={0.4}
        arcDashAnimateTime={2000}
        // Labels
        labelsData={CITIES}
        labelLat="lat"
        labelLng="lon"
        labelText="name"
        labelSize={0.5}
        labelDotRadius={0.3}
        labelColor={() => '#6fe898'}
        labelResolution={2}
        labelAltitude={0.015}
      />
    </div>
  )
}