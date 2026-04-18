import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { RiHandHeartLine, RiPlayFill } from 'react-icons/ri'
import Modal from '../components/Modal'
import headerBg from '../assets/header-bg.png'
import './Hero.css'

const typingText = "Software Engineer & Full-Stack Developer with a passion for building scalable systems, AI-powered automation, and elegant web experiences. Let's create something great together."

const stats = [
  { num: '3', label: 'Projects Built' },
  { num: '5', label: 'Technologies' },
  { num: '2', label: 'Years Coding' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }),
}

function useTypingEffect(text, speed = 22, startDelay = 700) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.substring(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return { displayed, done }
}

function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 78, 5, ${p.alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="hero__particles" />
}

function AnimatedCounter({ target, suffix = '+' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const end = parseInt(target)
        const duration = 1500
        const startTime = performance.now()
        const step = (now) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          setCount(Math.floor(progress * end))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.unobserve(el)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count}<span>{suffix}</span></span>
}

export default function Hero() {
  const { displayed } = useTypingEffect(typingText)
  const [helloOpen, setHelloOpen] = useState(false)

  return (
    <header id="home" className="hero" style={{ backgroundImage: `url(${headerBg})` }}>
      <Particles />
      <div className="hero__container">
        <motion.div className="hero__badge" custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="dot" />
          Available for opportunities
        </motion.div>

        <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible"
          style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.2rem' }}>
          Hello, I'm
        </motion.p>

        <motion.h1 custom={2} variants={fadeUp} initial="hidden" animate="visible">
          Abdul Wahab<br />Siddiqi
        </motion.h1>

        <motion.h2 className="section__title" custom={3} variants={fadeUp} initial="hidden" animate="visible">
          Software <span>Engineer.</span>
        </motion.h2>

        <motion.p className="hero__typing" custom={4} variants={fadeUp} initial="hidden" animate="visible">
          {displayed}<span className="typing-cursor" />
        </motion.p>

        <motion.div className="action__btns" custom={5} variants={fadeUp} initial="hidden" animate="visible">
          <button className="btn" onClick={() => setHelloOpen(true)}>
            <RiHandHeartLine /> Say Hello
          </button>
          <a href="#" className="video">
            <div className="play"><RiPlayFill /></div>
            <span>Watch My Video</span>
          </a>
        </motion.div>
      </div>

      <motion.div className="hero__stats" custom={6} variants={fadeUp} initial="hidden" animate="visible">
        {stats.map(s => (
          <div className="hero__stat" key={s.label}>
            <div className="hero__stat-num"><AnimatedCounter target={s.num} /></div>
            <div className="hero__stat-label">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div className="scroll-indicator" custom={7} variants={fadeUp} initial="hidden" animate="visible">
        <span>Scroll</span>
        <div className="scroll-indicator__line" />
      </motion.div>

      <Modal open={helloOpen} onClose={() => setHelloOpen(false)}>
        <h2>Hello! 👋</h2>
        <p>Welcome to my portfolio! I'm Abdul Wahab, a Software Engineer passionate about building great things. Feel free to explore and get in touch!</p>
      </Modal>
    </header>
  )
}
