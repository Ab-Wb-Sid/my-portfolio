import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import AboutDetails from './pages/AboutDetails'

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

function ScrollToHash() {
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: 'smooth' })
      }, 100)
    }
  }, [hash])
  return null
}

function AnimatedPage({ children }) {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <CustomCursor />
      <Navbar />
      <ScrollToHash />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/projects" element={<AnimatedPage><ProjectsPage /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><AboutDetails /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
