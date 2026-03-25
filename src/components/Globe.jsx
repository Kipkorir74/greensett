// const CITIES = [
//   { name: 'Nairobi',       lat: -1.29,  lon: 36.82, hub: true  },
//   { name: 'Mombasa',       lat: -4.05,  lon: 39.67, hub: true  },
//   { name: 'Dar es Salaam', lat: -6.77,  lon: 39.27, hub: false },
//   { name: 'Kampala',       lat:  0.32,  lon: 32.57, hub: false },
//   { name: 'Kigali',        lat: -1.94,  lon: 30.06, hub: false },
//   { name: 'Goma',          lat: -1.68,  lon: 29.23, hub: false },
//   { name: 'Juba',          lat:  4.86,  lon: 31.57, hub: false },
//   { name: 'Butembo',       lat:  0.12,  lon: 29.29, hub: false },
//   { name: 'Beni',          lat:  0.49,  lon: 29.46, hub: false },
//   { name: 'Mogadishu',     lat:  2.03,  lon: 45.33, hub: false },
// ]

// const ROUTES = [
//   { from: 'Nairobi',   to: 'Mombasa'       },
//   { from: 'Nairobi',   to: 'Dar es Salaam' },
//   { from: 'Nairobi',   to: 'Kampala'       },
//   { from: 'Nairobi',   to: 'Kigali'        },
//   { from: 'Nairobi',   to: 'Addis Ababa'   },
//   { from: 'Nairobi',   to: 'Mogadishu'     },
//   { from: 'Mombasa',   to: 'Butembo'       },
//   { from: 'Mombasa',   to: 'Mogadishu'     },
//   { from: 'Mombasa',   to: 'Beni'          },
//   { from: 'Mombasa',   to: 'Dar es Salaam' },
//   { from: 'Kampala',   to: 'Juba'          },
//   { from: 'Kigali',    to: 'Goma'          },
// ]



import { useRef, useEffect, useState } from 'react'
import GlobeGL from 'react-globe.gl'

const CITIES = [
  { name: 'Nairobi',       lat: -1.29,  lng: 36.82, hub: true  },
  { name: 'Mombasa',       lat: -4.05,  lng: 39.67, hub: true  },
  { name: 'Dar es Salaam', lat: -6.77,  lng: 39.27, hub: false },
  { name: 'Kampala',       lat:  0.32,  lng: 32.57, hub: false },
  { name: 'Kigali',        lat: -1.94,  lng: 30.06, hub: false },
  { name: 'Goma',          lat: -1.68,  lng: 29.23, hub: false },
  { name: 'Juba',          lat:  4.86,  lng: 31.57, hub: false },
  { name: 'Addis Ababa',   lat:  9.03,  lng: 38.74, hub: false },
  { name: 'Butembo',       lat:  0.15,  lng: 29.29, hub: false },
  { name: 'Beni',          lat:  0.49,  lng: 29.47, hub: false },
  { name: 'Mogadishu',     lat:  2.05,  lng: 45.34, hub: false },
]
const ROUTES = [
  // Existing routes
  { from: 'Nairobi',   to: 'Mombasa'       },
  { from: 'Nairobi',   to: 'Dar es Salaam' },
  { from: 'Nairobi',   to: 'Kampala'       },
  { from: 'Nairobi',   to: 'Kigali'        },
  { from: 'Nairobi',   to: 'Addis Ababa'   },
  { from: 'Mombasa',   to: 'Dar es Salaam' },
  { from: 'Kampala',   to: 'Juba'          },
  { from: 'Kigali',    to: 'Goma'          },
  // New routes — Nairobi to new cities
  { from: 'Nairobi',   to: 'Butembo'       },
  { from: 'Nairobi',   to: 'Beni'          },
  { from: 'Nairobi',   to: 'Mogadishu'     },
  // New routes — Mombasa to new cities
  { from: 'Mombasa',   to: 'Butembo'       },
  { from: 'Mombasa',   to: 'Beni'          },
  { from: 'Mombasa',   to: 'Mogadishu'     },
  // Connecting routes between nearby new cities
  { from: 'Goma',      to: 'Butembo'       },
  { from: 'Butembo',   to: 'Beni'          },
]

// Build city lookup using lng (consistent key)
const cityMap = Object.fromEntries(CITIES.map(c => [c.name, c]))

const ARCS = ROUTES
  .filter(r => cityMap[r.from] && cityMap[r.to])
  .map(r => ({
    startLat: cityMap[r.from].lat,
    startLng: cityMap[r.from].lng,
    endLat:   cityMap[r.to].lat,
    endLng:   cityMap[r.to].lng,
    color: (r.from === 'Nairobi' && r.to === 'Mombasa')
      ? ['#ffffff', '#ffffff']
      : ['#6fe898', '#4cb876'],
  }))

const POINTS = CITIES.map(c => ({
  lat:   c.lat,
  lng:   c.lng,
  name:  c.name,
  size:  c.hub ? 0.8 : 0.5,
  color: c.hub ? '#ffffff' : '#6fe898',
}))

export default function Globe({ style }) {
  const globeRef = useRef(null)
  const wrapRef  = useRef(null)
  const [size, setSize] = useState(500)
  const [ready, setReady] = useState(false)

  // Match container width
  useEffect(() => {
    if (!wrapRef.current) return
    const ro = new ResizeObserver(entries => {
      const w = Math.floor(entries[0].contentRect.width)
      if (w > 0) setSize(w)
    })
    ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  // Point camera at East Africa after globe is ready
  useEffect(() => {
    if (!ready || !globeRef.current) return
    const timer = setTimeout(() => {
      try {
        globeRef.current.pointOfView(
          { lat: -2.0, lng: 34.0, altitude: 2.5 },
          1200
        )
      } catch (e) {
        // ignore if not ready yet
      }
    }, 600)
    return () => clearTimeout(timer)
  }, [ready])

  return (
    <div
      ref={wrapRef}
      style={{
        ...style,
        width: '100%',
        aspectRatio: '1',
        overflow: 'visible',
      }}
    >
      {size > 0 && (
        <GlobeGL
          ref={globeRef}
          width={size}
          height={size}
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="#2d8a52"
          atmosphereAltitude={0.18}
          animateIn={false}
          enablePointerInteraction={true}
          onGlobeReady={() => setReady(true)}

          // Earth texture
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

          // City points
          pointsData={POINTS}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointRadius="size"
          pointAltitude={0.01}
          pointLabel="name"

          // Route arcs
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

          // City labels
          labelsData={POINTS}
          labelLat="lat"
          labelLng="lng"
          labelText="name"
          labelSize={0.45}
          labelDotRadius={0.3}
          labelColor={() => '#6fe898'}
          labelResolution={2}
          labelAltitude={0.015}
        />
      )}
    </div>
  )
}

