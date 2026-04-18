import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  RiCodeLine, RiBracesLine, RiJavascriptLine, RiHtml5Line,
  RiSearchLine, RiShareLine, RiShoppingCartLine,
  RiArticleLine, RiMovieLine, RiPencilRulerLine
} from 'react-icons/ri'
import './Skills.css'

const categories = [
  {
    title: 'Technical Skills',
    skills: [
      { icon: <RiCodeLine />, name: 'Python Development', percent: 90 },
      { icon: <RiBracesLine />, name: 'C++ Development', percent: 85 },
      { icon: <RiJavascriptLine />, name: 'JavaScript', percent: 80 },
      { icon: <RiHtml5Line />, name: 'HTML / CSS', percent: 95 },
    ],
  },
  {
    title: 'Digital Marketing',
    skills: [
      { icon: <RiSearchLine />, name: 'SEO Optimization', percent: 85 },
      { icon: <RiShareLine />, name: 'Social Media Marketing', percent: 80 },
      { icon: <RiShoppingCartLine />, name: 'E-Commerce', percent: 75 },
    ],
  },
  {
    title: 'Creative Skills',
    skills: [
      { icon: <RiArticleLine />, name: 'Content Creation', percent: 90 },
      { icon: <RiMovieLine />, name: 'Video Editing', percent: 65 },
      { icon: <RiPencilRulerLine />, name: 'Graphic Design', percent: 80 },
    ],
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

function SkillBar({ percent }) {
  const barRef = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setAnimate(true); obs.unobserve(el) }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="skill__bar" ref={barRef}>
      <div
        className={`skill__progress ${animate ? 'animate' : ''}`}
        style={{ '--target-width': `${percent}%` }}
      />
    </div>
  )
}

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="section__container skills__container">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <span className="section__label">What I Know</span>
          <h2 className="section__title"><span>My</span> Skills</h2>
        </motion.div>

        <motion.div className="skills__grid" variants={stagger}
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
          {categories.map(cat => (
            <motion.div className="skills__category" key={cat.title} variants={cardVariant}>
              <h3 className="skills__category-title">{cat.title}</h3>
              {cat.skills.map(s => (
                <div className="skill__card" key={s.name}>
                  <div className="skill__info">
                    <div className="skill__icon">{s.icon}</div>
                    <h4>{s.name}</h4>
                    <span className="skill__percent">{s.percent}%</span>
                  </div>
                  <SkillBar percent={s.percent} />
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
