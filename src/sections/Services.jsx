import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { RiSmartphoneLine, RiCodeSSlashLine, RiRobotLine } from 'react-icons/ri'
import './Services.css'

const services = [
  {
    icon: <RiSmartphoneLine />,
    title: 'Web Design',
    desc: 'High-quality, responsive web design tailored to your business goals and users.',
    details: 'Our process involves understanding your goals, creating wireframes, and designing user-friendly interfaces that look great on all devices.',
  },
  {
    icon: <RiCodeSSlashLine />,
    title: 'Web Development',
    desc: 'Fast, secure, and scalable web applications using modern technologies.',
    details: 'Full-stack development covering front-end, back-end, API integration, and database management — optimized for performance and security.',
  },
  {
    icon: <RiRobotLine />,
    title: 'AI & Automation',
    desc: 'AI-powered workflow automation to reduce manual effort and boost efficiency.',
    details: 'Building intelligent automation hubs with GPT integration, API orchestration, and custom workflows to streamline business operations.',
  },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function ServiceCard({ icon, title, desc, details }) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`
  }
  const handleMouseLeave = () => {
    const card = cardRef.current
    if (card) card.style.transform = ''
  }

  return (
    <motion.div
      ref={cardRef}
      className={`service__card ${expanded ? 'active' : ''}`}
      variants={cardVariant}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="service__icon">{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
      <div className="service__details"><p>{details}</p></div>
      {!expanded
        ? <button className="read__more" onClick={() => setExpanded(true)}>Read more</button>
        : <button className="read__less" onClick={() => setExpanded(false)}>Read less</button>
      }
    </motion.div>
  )
}

export default function Services() {
  return (
    <section className="service" id="services">
      <div className="section__container service__container">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <span className="section__label">What I Offer</span>
          <h2 className="section__title"><span>My</span> Services</h2>
        </motion.div>

        <motion.div className="service__grid" variants={stagger}
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
          {services.map(s => <ServiceCard key={s.title} {...s} />)}
        </motion.div>
      </div>
    </section>
  )
}
