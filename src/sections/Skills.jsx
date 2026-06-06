import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Skills.css'

/* ── SKILL DATA ── */
const technicalSkills = [
  { name: 'Python',      deviconClass: 'devicon-python-plain',                 level: 'Advanced',     experience: '3+ Years', projects: '12', color: '#4B8BBE', emoji: '🐍' },
  { name: 'C',           deviconClass: 'devicon-c-plain',                      level: 'Intermediate', experience: '2 Years',   projects: '5',  color: '#B0BEC5', emoji: '💻' },
  { name: 'C++',         deviconClass: 'devicon-cplusplus-plain',              level: 'Intermediate', experience: '2 Years',   projects: '6',  color: '#64B5F6', emoji: '⚙️' },
  { name: 'Java',        deviconClass: 'devicon-java-plain',                   level: 'Intermediate', experience: '1.5 Years', projects: '4',  color: '#FFA726', emoji: '☕' },
  { name: 'SQL Server',  deviconClass: 'devicon-microsoftsqlserver-plain',     level: 'Advanced',     experience: '3 Years',   projects: '10', color: '#E63946', emoji: '💾' },
  { name: 'MySQL',       deviconClass: 'devicon-mysql-plain',                  level: 'Advanced',     experience: '3 Years',   projects: '8',  color: '#33B5E5', emoji: '🐬' },
  { name: 'Django',      deviconClass: 'devicon-django-plain',                 level: 'Intermediate', experience: '2 Years',   projects: '6',  color: '#10B981', emoji: '🦄' },
  { name: 'HTML',        deviconClass: 'devicon-html5-plain',                  level: 'Advanced',     experience: '4 Years',   projects: '20', color: '#FF7043', emoji: '🌐' },
  { name: 'CSS',         deviconClass: 'devicon-css3-plain',                   level: 'Advanced',     experience: '4 Years',   projects: '20', color: '#29B6F6', emoji: '🎨' },
  { name: 'JavaScript',  deviconClass: 'devicon-javascript-plain',             level: 'Advanced',     experience: '3 Years',   projects: '15', color: '#F7DF1E', emoji: '⚡' },
  { name: 'Git',         deviconClass: 'devicon-git-plain',                    level: 'Advanced',     experience: '4 Years',   projects: '25', color: '#FF7043', emoji: '🌿' },
  { name: 'GitHub',      deviconClass: 'devicon-github-original',              level: 'Advanced',     experience: '4 Years',   projects: '25', color: '#ffffff', emoji: '🐙' },
  { name: 'n8n',         icon: '/skills/n8n.svg',                              level: 'Advanced',     experience: '1.5 Years', projects: '8',  color: '#EA4B71', emoji: '🔗' },
]

const marketingCreativeSkills = [
  { name: 'Outreach',        detail: 'Partnerships & Communication', emoji: '📢', color: '#EA4B71' },
  { name: 'Marketing',       detail: 'Digital, Affiliate & PR',      emoji: '📈', color: '#10B981' },
  { name: 'Graphic Design',  detail: 'Canva Mockups & Assets',       emoji: '🎨', color: '#8B5CF6' },
  { name: 'Video Editing',   detail: 'Capcut & Shorts Production',   emoji: '🎬', color: '#3B82F6' },
  { name: 'Blogging',        detail: 'SEO & Technical Writing',      emoji: '✍️', color: '#F59E0B' },
]

const softSkills = [
  { name: 'Communication',    detail: 'Meetings & Clear Reporting', emoji: '💬', color: '#7C3AED' },
  { name: 'Analytical Thinking', detail: 'Reasoning & Data Analysis', emoji: '🧠', color: '#16A34A' },
  { name: 'Teamwork',         detail: 'Peer Review & Support',      emoji: '🤝', color: '#2563EB' },
  { name: 'Problem Solving',  detail: 'Troubleshooting Systems',    emoji: '🧩', color: '#10B981' },
  { name: 'Critical Thinking',detail: 'Decisions & Trade-offs',     emoji: '🔬', color: '#D97706' },
  { name: 'Adaptability',     detail: 'Agile & New Tools Adoption', emoji: '🔄', color: '#0891B2' },
  { name: 'Leadership',       detail: 'Mentoring & Motivation',     emoji: '👑', color: '#DC2626' },
  { name: 'Time Management',  detail: 'Estimates & Prompt Delivery', emoji: '⏱️', color: '#059669' },
  { name: 'Creativity',       detail: 'Inventive UX & Code Design',  emoji: '💡', color: '#EC4899' },
]

/* ── 3-D SPHERE COMPONENT ── */
function SkillSphere({ skills }) {
  const containerRef = useRef(null)
  const nodeRefs = useRef([])
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0.003, y: 0.006 })
  const animRef = useRef(null)

  // Coordinates of items
  const items = useRef([])

  useEffect(() => {
    const N = skills.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    items.current = skills.map((skill, i) => {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / N)
      const phi = (2 * Math.PI * i) / goldenRatio
      return {
        skill,
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta)
      }
    })
  }, [skills])

  // Animation Loop updating refs directly for high performance
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return

      const W = containerRef.current.clientWidth || 480
      const cx = W / 2
      const cy = W / 2
      const r = (W / 2) * 0.76

      // Slow down auto-rotation on hover
      const isHovered = hoveredSkill !== null

      if (!isDragging.current) {
        if (isHovered) {
          velocity.current.x *= 0.85
          velocity.current.y *= 0.85
          if (Math.abs(velocity.current.x) < 0.0006) velocity.current.x = 0.0006
          if (Math.abs(velocity.current.y) < 0.0008) velocity.current.y = 0.0008
        } else {
          velocity.current.x *= 0.95
          velocity.current.y *= 0.95
          if (Math.abs(velocity.current.x) < 0.002) velocity.current.x = velocity.current.x < 0 ? -0.002 : 0.002
          if (Math.abs(velocity.current.y) < 0.003) velocity.current.y = velocity.current.y < 0 ? -0.003 : 0.003
        }
      }

      const rotX = velocity.current.x
      const rotY = velocity.current.y

      // Rotate coordinates
      items.current.forEach((it, idx) => {
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
        const x1 = it.x * cosY - it.z * sinY
        const z1 = it.x * sinY + it.z * cosY

        const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
        const y1 = it.y * cosX - z1 * sinX
        const z2 = it.y * sinX + z1 * cosX

        it.x = x1
        it.y = y1
        it.z = z2

        // Apply visual properties to the DOM element directly
        const el = nodeRefs.current[idx]
        if (el) {
          const scale = (it.z + 1.8) / 2.8
          const px = cx + it.x * r
          const py = cy + it.y * r
          const opacity = Math.max(0.22, (it.z + 1.5) / 2.5)
          const zIndex = Math.round((it.z + 1) * 100) + 10

          el.style.left = `${px}px`
          el.style.top = `${py}px`
          el.style.transform = `translate(-50%, -50%) scale(${scale})`
          el.style.opacity = opacity
          el.style.zIndex = zIndex
        }
      })

      animRef.current = requestAnimationFrame(update)
    }

    animRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animRef.current)
  }, [hoveredSkill])

  // Dragging event handlers
  useEffect(() => {
    const handlePointerDown = (e) => {
      isDragging.current = true
      lastMousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handlePointerMove = (e) => {
      if (!isDragging.current) return
      const dx = e.clientX - lastMousePos.current.x
      const dy = e.clientY - lastMousePos.current.y
      
      velocity.current.x = dy * 0.008
      velocity.current.y = dx * 0.008

      lastMousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handlePointerUp = () => {
      isDragging.current = false
    }

    const el = containerRef.current
    if (el) {
      el.addEventListener('pointerdown', handlePointerDown)
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
    }

    return () => {
      if (el) el.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="sphere__container" 
      style={{ 
        position: 'relative', 
        userSelect: 'none', 
        touchAction: 'none',
        cursor: 'grab' 
      }}
    >
      {/* SVG Sphere Background Wireframe for depth and 3D visual look */}
      <svg 
        className="sphere__wireframe" 
        viewBox="0 0 480 480" 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          pointerEvents: 'none',
          opacity: 0.6,
          width: '100%',
          height: '100%'
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => {
          if (i === 0) return null
          const lat = (Math.PI * i) / 8 - Math.PI / 2
          const ry = Math.cos(lat) * 180
          const y = 240 + Math.sin(lat) * 180
          return (
            <ellipse 
              key={`lat-${i}`} 
              cx="240" 
              cy={y} 
              rx={ry} 
              ry={ry * 0.22} 
              fill="none" 
              stroke="rgba(255, 78, 5, 0.42)" 
              strokeWidth="0.8" 
            />
          )
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (Math.PI * i) / 8
          return (
            <ellipse 
              key={`lon-${i}`} 
              cx="240" 
              cy="240" 
              rx={Math.sin(angle) * 180} 
              ry="180" 
              fill="none" 
              stroke="rgba(255, 78, 5, 0.42)" 
              strokeWidth="0.8" 
              transform={`rotate(${(angle * 180) / Math.PI} 240 240)`} 
            />
          )
        })}
      </svg>

      {/* Render 3D DOM Nodes */}
      {skills.map((skill, idx) => (
        <div
          key={idx}
          ref={el => nodeRefs.current[idx] = el}
          className="sphere-node"
          style={{ '--node-color': skill.color }}
          onMouseEnter={(e) => {
            setHoveredSkill({
              skill,
              clientX: e.clientX,
              clientY: e.clientY
            })
          }}
          onMouseMove={(e) => {
            setHoveredSkill(prev => prev ? {
              ...prev,
              clientX: e.clientX,
              clientY: e.clientY
            } : null)
          }}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          {skill.deviconClass ? (
            <i className={skill.deviconClass} style={{ color: skill.color }} />
          ) : (
            <img src={skill.icon} alt={skill.name} />
          )}
        </div>
      ))}

      <AnimatePresence>
        {hoveredSkill && (
          <motion.div 
            className="sphere-tooltip"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ 
              position: 'fixed',
              left: hoveredSkill.clientX + 15, 
              top: hoveredSkill.clientY + 15,
              borderColor: hoveredSkill.skill.color + '40',
              borderLeft: `4px solid ${hoveredSkill.skill.color}`,
              zIndex: 99999
            }}
          >
            <div className="tooltip-title">
              <span className="tooltip-emoji">{hoveredSkill.skill.emoji}</span>
              <span className="tooltip-name">{hoveredSkill.skill.name}</span>
            </div>
            <div className="tooltip-level" style={{ color: hoveredSkill.skill.color }}>
              {hoveredSkill.skill.level}
            </div>
            <div className="tooltip-detail">{hoveredSkill.skill.experience} Experience</div>
            <div className="tooltip-detail">{hoveredSkill.skill.projects} Projects</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── NON-TECHNICAL BADGES COMPONENT ── */
function NonTechnicalList() {
  const containerVars = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } }
  }
  const itemVars = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <motion.div 
      className="nontechnical__container"
      variants={containerVars}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <div className="nontechnical__section">
        <h3 className="nontechnical__subtitle">Creative &amp; Marketing Skills</h3>
        <div className="nontechnical__list">
          {marketingCreativeSkills.map(s => (
            <motion.div 
              key={s.name} 
              className="nontechnical__badge" 
              variants={itemVars}
              style={{ '--badge-color': s.color }}
              whileHover={{ y: -4 }}
            >
              <div className="nontechnical__badge-emoji">{s.emoji}</div>
              <div className="nontechnical__badge-info">
                <span className="nontechnical__badge-name">{s.name}</span>
                <span className="nontechnical__badge-desc">{s.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="nontechnical__section">
        <h3 className="nontechnical__subtitle">Soft Skills</h3>
        <div className="nontechnical__list">
          {softSkills.map(s => (
            <motion.div 
              key={s.name} 
              className="nontechnical__badge" 
              variants={itemVars}
              style={{ '--badge-color': s.color }}
              whileHover={{ y: -4 }}
            >
              <div className="nontechnical__badge-emoji">{s.emoji}</div>
              <div className="nontechnical__badge-info">
                <span className="nontechnical__badge-name">{s.name}</span>
                <span className="nontechnical__badge-desc">{s.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── MAIN PORTFOLIO EXPORT ── */
export default function Skills() {
  const [activeTab, setActiveTab] = useState('technical')

  return (
    <section className="skills" id="skills">
      <div className="section__container skills__container">
        
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="skills__header"
        >
          <span className="section__label">What I Know</span>
          <h2 className="section__title"><span>My</span> Skills</h2>

          {/* Tab switcher */}
          <div className="skills__tabs">
            <button
              id="tab-technical"
              className={`skills__tab${activeTab === 'technical' ? ' skills__tab--active' : ''}`}
              onClick={() => setActiveTab('technical')}
            >
              Technical
            </button>
            <button
              id="tab-nontechnical"
              className={`skills__tab${activeTab === 'nontechnical' ? ' skills__tab--active' : ''}`}
              onClick={() => setActiveTab('nontechnical')}
            >
              Non-Technical
            </button>
          </div>
        </motion.div>

        {/* Tab Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'technical' ? (
            <motion.div
              key="technical"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <SkillSphere skills={technicalSkills} />
            </motion.div>
          ) : (
            <NonTechnicalList key="nontechnical" />
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
