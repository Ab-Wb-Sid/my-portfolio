import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiHandHeartLine, RiTerminalBoxFill } from 'react-icons/ri'
import Modal from '../components/Modal'
import headerBg from '../assets/header-bg.png'
import './Hero.css'

const typingText = "Software Engineer & Full-Stack Developer with a passion for building scalable systems, AI-powered automation, and elegant web experiences. Let's create something great together."

const stats = [
  { num: '4', label: 'Projects Built' },
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

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '' })
  const [touched, setTouched] = useState({ name: false, email: false })
  const [submitStatus, setSubmitStatus] = useState('idle') // idle | submitting | success | error

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      validateField(name, value)
    }
  }

  // Input blur handler
  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name, value)
  }

  // Field validation
  const validateField = (name, value) => {
    let errorMsg = ''
    if (name === 'name') {
      if (!value.trim()) {
        errorMsg = 'Full Name is required'
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        errorMsg = 'Email Address is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = 'Please enter a valid email address'
      }
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }))
    return errorMsg
  }

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    const nameError = validateField('name', formData.name)
    const emailError = validateField('email', formData.email)
    setTouched({ name: true, email: true })

    if (nameError || emailError) {
      return
    }

    setSubmitStatus('submitting')
    try {
      const res = await fetch('https://formspree.io/f/xdkazezp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      if (res.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTouched({ name: false, email: false })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <header id="home" className="hero" style={{ backgroundImage: `url(${headerBg})` }}>
      <Particles />
      <div className="hero__container">
        <motion.p className="hero__greeting" custom={0} variants={fadeUp} initial="hidden" animate="visible">
          Hello, I'm
        </motion.p>

        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible">
          Abdul Wahab<br />Siddiqi
        </motion.h1>

        <motion.h2 className="section__title" custom={2} variants={fadeUp} initial="hidden" animate="visible">
          Software <span>Engineer.</span>
        </motion.h2>

        <motion.p className="hero__typing" custom={3} variants={fadeUp} initial="hidden" animate="visible">
          {displayed}<span className="typing-cursor" />
        </motion.p>

        <motion.div className="action__btns" custom={4} variants={fadeUp} initial="hidden" animate="visible">
          <button className="btn btn--say-hello" onClick={() => setHelloOpen(true)}>
            <RiHandHeartLine /> Say Hello
          </button>
          <Link to="/projects" className="projects-btn">
            <div className="icon-box"><RiTerminalBoxFill /></div>
            <span>View My Projects</span>
          </Link>
        </motion.div>
      </div>

      <motion.div className="hero__stats" custom={5} variants={fadeUp} initial="hidden" animate="visible">
        {stats.map(s => (
          <div className="hero__stat" key={s.label}>
            <div className="hero__stat-num"><AnimatedCounter target={s.num} /></div>
            <div className="hero__stat-label">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <Modal open={helloOpen} onClose={() => { setHelloOpen(false); setSubmitStatus('idle'); }}>
        <div className="contact-modal">
          <h2>Hello 👋</h2>
          <p className="contact-modal__subtitle">Feel free to explore my portfolio and get in touch.</p>

          {submitStatus === 'success' ? (
            <div className="contact-modal__success">
              <div className="success-icon">✓</div>
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. I'll get back to you soon.</p>
              <button className="btn" onClick={() => { setHelloOpen(false); setSubmitStatus('idle'); }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="contact-modal__form">
              <div className={`form-group ${touched.name ? (errors.name ? 'has-error' : 'has-success') : ''}`}>
                <label htmlFor="modal-name">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  disabled={submitStatus === 'submitting'}
                  required
                />
                {touched.name && errors.name && <span className="error-message" role="alert">{errors.name}</span>}
              </div>

              <div className={`form-group ${touched.email ? (errors.email ? 'has-error' : 'has-success') : ''}`}>
                <label htmlFor="modal-email">Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email address"
                  disabled={submitStatus === 'submitting'}
                  required
                />
                {touched.email && errors.email && <span className="error-message" role="alert">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="modal-message">Message</label>
                <textarea
                  id="modal-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="4"
                  disabled={submitStatus === 'submitting'}
                />
              </div>

              {submitStatus === 'error' && (
                <div className="submit-error-message" role="alert">
                  Failed to send message. Please try again.
                </div>
              )}

              <button
                type="submit"
                className="btn btn--submit"
                disabled={submitStatus === 'submitting'}
              >
                {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </Modal>
    </header>
  )
}
