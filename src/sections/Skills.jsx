import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Skills.css'

/* ── SKILL DATA ── */
const technicalSkills = [
  { name: 'Python',      icon: '/skills/python.svg',      level: 'Advanced',     experience: '3+ Years', projects: '12 Projects', color: '#3776AB', emoji: '🐍' },
  { name: 'C',           icon: '/skills/c.svg',           level: 'Intermediate', experience: '2 Years',   projects: '5 Projects',  color: '#A8B9CC', emoji: '💻' },
  { name: 'C++',         icon: '/skills/cpp.svg',         level: 'Intermediate', experience: '2 Years',   projects: '6 Projects',  color: '#00599C', emoji: '⚙️' },
  { name: 'Java',        icon: '/skills/java.svg',        level: 'Intermediate', experience: '1.5 Years', projects: '4 Projects',  color: '#ED8B00', emoji: '☕' },
  { name: 'SQL Server',  icon: '/skills/sqlserver.svg',  level: 'Advanced',     experience: '3 Years',   projects: '10 Projects', color: '#CC2927', emoji: '💾' },
  { name: 'MySQL',       icon: '/skills/mysql.svg',       level: 'Advanced',     experience: '3 Years',   projects: '8 Projects',  color: '#4479A1', emoji: '🐬' },
  { name: 'Django',      icon: '/skills/django.svg',      level: 'Intermediate', experience: '2 Years',   projects: '6 Projects',  color: '#092E20', emoji: '🦄' },
  { name: 'HTML',        icon: '/skills/html5.svg',       level: 'Advanced',     experience: '4 Years',   projects: '20 Projects', color: '#E34F26', emoji: '🌐' },
  { name: 'CSS',         icon: '/skills/css3.svg',         level: 'Advanced',     experience: '4 Years',   projects: '20 Projects', color: '#1572B6', emoji: '🎨' },
  { name: 'JavaScript',  icon: '/skills/javascript.svg',  level: 'Advanced',     experience: '3 Years',   projects: '15 Projects', color: '#F7DF1E', emoji: '⚡' },
  { name: 'Git',         icon: '/skills/git.svg',         level: 'Advanced',     experience: '4 Years',   projects: '25 Projects', color: '#F05032', emoji: '🌿' },
  { name: 'GitHub',      icon: '/skills/github.svg',      level: 'Advanced',     experience: '4 Years',   projects: '25 Projects', color: '#ffffff', emoji: '🐙' },
  { name: 'n8n',         icon: '/skills/n8n.svg',         level: 'Advanced',     experience: '1.5 Years', projects: '8 Projects',  color: '#EA4B71', emoji: '🔗' },
  { name: 'Matplotlib',  icon: '/skills/matplotlib.svg',  level: 'Intermediate', experience: '1.5 Years', projects: '5 Projects',  color: '#11557C', emoji: '📊' },
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

/* draw sphere wireframe (geodesic look) */
function drawWireframe(ctx, cx, cy, r) {
  ctx.save()
  ctx.strokeStyle = 'rgba(255, 78, 5, 0.18)'
  ctx.lineWidth = 0.8

  const latLines = 8
  for (let i = 1; i < latLines; i++) {
    const lat = (Math.PI * i) / latLines - Math.PI / 2
    const ry = Math.cos(lat) * r
    const y = cy + Math.sin(lat) * r
    ctx.beginPath()
    ctx.ellipse(cx, y, ry, ry * 0.22, 0, 0, 2 * Math.PI)
    ctx.stroke()
  }

  const lonLines = 8
  for (let i = 0; i < lonLines; i++) {
    const angle = (Math.PI * i) / lonLines
    ctx.beginPath()
    ctx.ellipse(cx, cy, Math.sin(angle) * r, r, angle, 0, 2 * Math.PI)
    ctx.stroke()
  }
  ctx.restore()
}

/* ── 3-D SPHERE COMPONENT ── */
function SkillSphere({ skills }) {
  const canvasRef = useRef(null)
  const items = useRef([])
  const animRef = useRef(null)
  const container = useRef(null)
  const offscreenIcons = useRef({})

  // Interaction & Hover States
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0.003, y: 0.006 })
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const hoveredSkillRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Responsive sizing
    const resize = () => {
      const w = container.current?.clientWidth || 480
      const size = Math.min(w, 520)
      canvas.width = size
      canvas.height = size
    }
    resize()
    window.addEventListener('resize', resize)

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

    // Pre-render SVGs to offscreen canvases
    skills.forEach(skill => {
      const oc = document.createElement('canvas')
      oc.width = 64
      oc.height = 64
      const octx = oc.getContext('2d')
      const img = new Image()
      img.onload = () => {
        octx.drawImage(img, 0, 0, 64, 64)
        offscreenIcons.current[skill.name] = oc
      }
      img.src = skill.icon
    })

    const draw = () => {
      const W = canvas.width, H = canvas.height
      const cx = W / 2, cy = H / 2
      const r = (Math.min(W, H) / 2) * 0.76

      ctx.clearRect(0, 0, W, H)

      // Slow rotation down on hover trigger
      const isHovered = hoveredSkillRef.current !== null

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

      // Apply rotation matrices
      items.current.forEach(it => {
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
        const x1 = it.x * cosY - it.z * sinY
        const z1 = it.x * sinY + it.z * cosY

        const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
        const y1 = it.y * cosX - z1 * sinX
        const z2 = it.y * sinX + z1 * cosX

        it.x = x1
        it.y = y1
        it.z = z2
      })

      // Wireframe background rendering
      drawWireframe(ctx, cx, cy, r)

      // Render items sorted by depth
      const sorted = [...items.current].sort((a, b) => b.z - a.z)

      sorted.forEach(it => {
        const scale = (it.z + 1.8) / 2.8
        const px = cx + it.x * r
        const py = cy + it.y * r
        
        const opacity = Math.max(0.35, (it.z + 1.5) / 2.5)
        const iconSize = Math.round(44 * scale)
        const fontSize = Math.round(11 * scale)

        // Draw cached offscreen canvas icon
        const oc = offscreenIcons.current[it.skill.name]
        if (oc) {
          ctx.save()
          ctx.globalAlpha = opacity
          ctx.drawImage(oc, px - iconSize / 2, py - iconSize / 2 - 8, iconSize, iconSize)
          ctx.restore()
        }

        // Draw label text below icon
        ctx.save()
        ctx.globalAlpha = opacity
        ctx.font = `600 ${Math.max(9, fontSize)}px 'Poppins', sans-serif`
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = '#000000'
        ctx.shadowBlur = 6
        ctx.textAlign = 'center'
        ctx.fillText(it.skill.name, px, py + iconSize / 2 + 6)
        ctx.restore()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    // Event Handlers for Dragging
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

    canvas.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [skills])

  // Mouse hover event detection on front-facing sphere nodes
  const handleCanvasMouseMove = (e) => {
    if (isDragging.current) {
      hoveredSkillRef.current = null
      setHoveredSkill(null)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    
    // Convert client coordinates to canvas internal coordinates
    const mouseX = ((e.clientX - rect.left) / rect.width) * canvas.width
    const mouseY = ((e.clientY - rect.top) / rect.height) * canvas.height

    const W = canvas.width, H = canvas.height
    const cx = W / 2, cy = H / 2
    const r = (Math.min(W, H) / 2) * 0.76

    let found = null

    items.current.forEach(it => {
      if (it.z < -0.25) return // Ignore elements at the back of the sphere
      
      const scale = (it.z + 1.8) / 2.8
      const px = cx + it.x * r
      const py = cy + it.y * r
      const iconSize = Math.round(44 * scale)
      
      const dist = Math.hypot(mouseX - px, mouseY - (py - 8))
      if (dist < iconSize * 0.95) {
        found = {
          skill: it.skill,
          clientX: e.clientX,
          clientY: e.clientY
        }
      }
    })

    hoveredSkillRef.current = found
    setHoveredSkill(found)
  }

  const handleCanvasMouseLeave = () => {
    hoveredSkillRef.current = null
    setHoveredSkill(null)
  }

  return (
    <div ref={container} className="sphere__container" style={{ position: 'relative' }}>
      <canvas 
        ref={canvasRef} 
        className="sphere__canvas" 
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={handleCanvasMouseLeave}
      />

      <AnimatePresence>
        {hoveredSkill && (
          <motion.div 
            className="sphere-tooltip"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{ 
              left: hoveredSkill.clientX - container.current.getBoundingClientRect().left + 15, 
              top: hoveredSkill.clientY - container.current.getBoundingClientRect().top + 15,
              borderColor: hoveredSkill.skill.color + '40',
              borderLeft: `4px solid ${hoveredSkill.skill.color}`
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
