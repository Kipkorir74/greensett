import ReactGA from 'react-ga4'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export function initGA() {
  if (!GA_ID) return
  ReactGA.initialize(GA_ID)
}

// Track page views
export function trackPageView(path) {
  ReactGA.send({ hitType: 'pageview', page: path })
}

// Track custom events
export function trackEvent(category, action, label = '') {
  ReactGA.event({ category, action, label })
}