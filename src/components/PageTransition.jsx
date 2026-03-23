import { motion } from 'framer-motion'

const variants = {
  initial: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: 'blur(4px)',
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  )
}
