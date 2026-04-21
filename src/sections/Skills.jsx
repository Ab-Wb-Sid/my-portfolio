import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Skills.css'

/* ── SKILL DATA ── */
const technicalSkills = [
  { name: 'Python',      color: '#3776AB', svg: 'python'      },
  { name: 'C',           color: '#A8B9CC', svg: 'c'           },
  { name: 'C++',         color: '#00599C', svg: 'cpp'         },
  { name: 'Java',        color: '#ED8B00', svg: 'java'        },
  { name: 'SQL Server',  color: '#CC2927', svg: 'sqlserver'   },
  { name: 'MySQL',       color: '#4479A1', svg: 'mysql'       },
  { name: 'Django',      color: '#092E20', svg: 'django'      },
  { name: 'HTML',        color: '#E34F26', svg: 'html5'       },
  { name: 'CSS',         color: '#1572B6', svg: 'css3'        },
  { name: 'JavaScript',  color: '#F7DF1E', svg: 'javascript'  },
  { name: 'Git',         color: '#F05032', svg: 'git'         },
  { name: 'GitHub',      color: '#ffffff', svg: 'github'      },
  { name: 'n8n',         color: '#EA4B71', svg: 'n8n'         },
  { name: 'Matplotlib',  color: '#11557C', svg: 'matplotlib'  },
]

const nonTechnicalSkills = [
  { name: 'Communication',    color: '#7C3AED', svg: 'communication'   },
  { name: 'Teamwork',         color: '#2563EB', svg: 'teamwork'        },
  { name: 'Problem Solving',  color: '#16A34A', svg: 'problemsolving'  },
  { name: 'Critical Thinking',color: '#D97706', svg: 'criticalthinking'},
  { name: 'Adaptability',     color: '#0891B2', svg: 'adaptability'    },
  { name: 'Leadership',       color: '#DC2626', svg: 'leadership'      },
  { name: 'Time Management',  color: '#059669', svg: 'timemanagement'  },
  { name: 'Creativity',       color: '#7C3AED', svg: 'creativity'      },
]

/* Returns raw SVG inner path markup for offscreen rendering & React badge rendering */
function getSVGPath(svg, color) {
  const c = color
  const paths = {
    python: `<path d="M11.99 0C5.9 0 6.27 2.64 6.27 2.64l.01 2.73h5.82v.82H3.93S0 5.73 0 11.87c0 6.15 3.4 5.93 3.4 5.93h2.03v-2.85s-.11-3.4 3.35-3.4h5.78s3.24.05 3.24-3.13V3.13S18.33 0 11.99 0zm-3.23 1.81a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z" fill="${c}"/><path d="M12.01 24c6.1 0 5.73-2.64 5.73-2.64l-.01-2.73h-5.82v-.82h8.17S24 18.27 24 12.13c0-6.15-3.4-5.93-3.4-5.93h-2.03v2.85s.11 3.4-3.35 3.4H9.44s-3.24-.05-3.24 3.13v5.29S5.67 24 12.01 24zm3.23-1.81a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z" fill="${c}"/>`,
    c: `<text x="5" y="19" font-size="18" font-weight="900" fill="${c}" font-family="monospace">C</text><circle cx="12" cy="12" r="11" stroke="${c}" stroke-width="2" fill="none" opacity="0.3"/>`,
    cpp: `<text x="1" y="18" font-size="13" font-weight="900" fill="${c}" font-family="monospace">C++</text><circle cx="12" cy="12" r="11" stroke="${c}" stroke-width="2" fill="none" opacity="0.3"/>`,
    java: `<path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.698 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.554 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.981.623-10.52-.568 2.082-1.006 3.774-.892 3.774-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" fill="${c}"/>`,
    sqlserver: `<path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 3c4.84 0 8 1.62 8 2s-3.16 2-8 2-8-1.62-8-2 3.16-2 8-2zm8 12c0 .38-3.16 2-8 2s-8-1.62-8-2v-2.52c1.7.94 4.56 1.52 8 1.52s6.3-.58 8-1.52V17zm0-4.5c0 .38-3.16 2-8 2s-8-1.62-8-2v-2.52c1.7.94 4.56 1.52 8 1.52s6.3-.58 8-1.52v2.52z" fill="${c}"/>`,
    mysql: `<text x="0" y="16" font-size="7.5" font-weight="900" fill="${c}" font-family="sans-serif">MySQL</text><ellipse cx="12" cy="12" rx="11" ry="8" stroke="${c}" stroke-width="2" fill="none" opacity="0.4"/>`,
    django: `<rect x="0" y="0" width="24" height="24" rx="4" fill="${c}"/><text x="2" y="16" font-size="7" font-weight="bold" fill="#fff" font-family="sans-serif">django</text>`,
    html5: `<path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="${c}"/>`,
    css3: `<path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" fill="${c}"/>`,
    javascript: `<rect width="24" height="24" rx="3" fill="${c}"/><path d="M6.5 17.5c.7.7 1.7 1.1 2.8 1.1 2 0 3.2-1.1 3.2-2.8V9.5h-2v6.2c0 .8-.3 1.3-1.1 1.3-.6 0-1-.4-1.4-.9l-1.5 1.4zm7.5-.3c.8.9 2 1.4 3.5 1.4 2.1 0 3.4-1.1 3.4-2.8 0-1.5-.9-2.3-2.6-2.8l-.6-.2c-.9-.3-1.3-.5-1.3-1 0-.4.3-.7.9-.7.6 0 1 .3 1.4.8l1.4-1.5c-.8-.9-1.8-1.3-2.9-1.3-1.9 0-3.2 1.1-3.2 2.8 0 1.5 1 2.3 2.6 2.8l.6.2c.9.3 1.4.6 1.4 1.1 0 .5-.4.8-1.1.8-.8 0-1.4-.4-1.8-1l-1.7 1.4z" fill="#000"/>`,
    git: `<path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.606-.404-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="${c}"/>`,
    github: `<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="${c}"/>`,
    n8n: `<circle cx="4" cy="12" r="3" fill="${c}"/><circle cx="20" cy="12" r="3" fill="${c}"/><circle cx="12" cy="12" r="3" fill="${c}"/><path d="M7 12h2M15 12h2" stroke="${c}" stroke-width="1.5"/><path d="M4 12v3a3 3 0 0 0 3 3h4M20 12V9a3 3 0 0 0-3-3h-4" stroke="${c}" stroke-width="1.5" fill="none"/>`,
    matplotlib: `<circle cx="12" cy="12" r="10" stroke="${c}" stroke-width="1.5" fill="none"/><path d="M4 16 L8 10 L12 13 L16 7 L20 11" stroke="${c}" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 18 h16" stroke="${c}" stroke-width="1" opacity="0.5"/><path d="M4 4 v14" stroke="${c}" stroke-width="1" opacity="0.5"/>`,
    communication: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M8 10h8M8 14h5" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`,
    teamwork: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="${c}" stroke-width="1.8" stroke-linecap="round" fill="none"/><circle cx="9" cy="7" r="4" stroke="${c}" stroke-width="1.8" fill="none"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>`,
    problemsolving: `<circle cx="12" cy="12" r="10" stroke="${c}" stroke-width="1.8" fill="none"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
    criticalthinking: `<path d="M12 2a9 9 0 0 1 9 9c0 3.6-2.1 6.7-5.2 8.2L15 21H9l.2-1.8C6.1 17.7 4 14.6 4 11a9 9 0 0 1 9-9z" stroke="${c}" stroke-width="1.8" fill="none"/><path d="M9 21h6" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/><path d="M12 7v4l2 2" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>`,
    adaptability: `<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="3" stroke="${c}" stroke-width="1.8" fill="none"/>`,
    leadership: `<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    timemanagement: `<circle cx="12" cy="12" r="10" stroke="${c}" stroke-width="1.8" fill="none"/><path d="M12 6v6l4 2" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
    creativity: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="${c}" stroke-width="1.4" fill="none"/><circle cx="12" cy="12" r="3" stroke="${c}" stroke-width="1.4" fill="none"/>`,
  }
  return paths[svg] || `<circle cx="12" cy="12" r="10" stroke="${c}" stroke-width="2" fill="none"/>`
}

/* draw sphere wireframe (geodesic look) */
function drawWireframe(ctx, cx, cy, r) {
  ctx.save()
  ctx.strokeStyle = 'rgba(255,78,5,0.25)' // stronger visible color
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

/* ── 3-D SPHERE COMPONENT (Technical Skills Only) ── */
function SkillSphere({ skills }) {
  const canvasRef = useRef(null)
  const items = useRef([])
  const animRef = useRef(null)
  const container = useRef(null)
  const offscreenIcons = useRef({})

  // Interaction State
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0.003, y: 0.006 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Responsive sizing — always square to not clip the sphere
    const resize = () => {
      const w = container.current?.clientWidth || 480
      const size = Math.min(w, 520)
      canvas.width = size
      canvas.height = size
    }
    resize()
    window.addEventListener('resize', resize)

    const N = skills.length

    // Fibonacci sphere point distribution
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    items.current = skills.map((skill, i) => {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / N)
      const phi = 2 * Math.PI * i / goldenRatio
      return {
        skill,
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta)
      }
    })

    // Pre-render icons at a larger, higher resolution size for crispness
    skills.forEach(skill => {
      const oc = document.createElement('canvas')
      oc.width = 64; oc.height = 64
      const octx = oc.getContext('2d')
      // Draw SVG as blob
      const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${
        getSVGPath(skill.svg, skill.color)
      }</svg>`
      const blob = new Blob([svgStr], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const img = new Image()
      img.onload = () => {
        octx.drawImage(img, 0, 0, 64, 64)
        URL.revokeObjectURL(url)
        offscreenIcons.current[skill.svg] = oc
      }
      img.src = url
    })

    const draw = () => {
      const W = canvas.width, H = canvas.height
      const cx = W / 2, cy = H / 2
      const r = Math.min(W, H) / 2 * 0.76

      ctx.clearRect(0, 0, W, H)

      // Friction / Auto-rotation logic
      if (!isDragging.current) {
        // Apply friction to slow down to a base rotation speed
        velocity.current.x *= 0.95
        velocity.current.y *= 0.95
        
        // Enforce a minimum continuous scroll if not dragging
        if (Math.abs(velocity.current.x) < 0.002) velocity.current.x = velocity.current.x < 0 ? -0.002 : 0.002
        if (Math.abs(velocity.current.y) < 0.003) velocity.current.y = velocity.current.y < 0 ? -0.003 : 0.003
      }

      const rotX = velocity.current.x
      const rotY = velocity.current.y

      // Rotate points
      items.current.forEach(it => {
        // rotate around Y
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
        const x1 = it.x * cosY - it.z * sinY
        const z1 = it.x * sinY + it.z * cosY
        // rotate around X
        const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
        const y1 = it.y * cosX - z1 * sinX
        const z2 = it.y * sinX + z1 * cosX
        it.x = x1; it.y = y1; it.z = z2
      })

      // Draw wireframe behind everything
      drawWireframe(ctx, cx, cy, r)

      // Sort by depth (z)
      const sorted = [...items.current].sort((a, b) => b.z - a.z)

      sorted.forEach(it => {
        // Deeper items are scaled down and faded
        const scale = (it.z + 1.8) / 2.8
        const px = cx + it.x * r
        const py = cy + it.y * r
        
        const opacity = Math.max(0.4, (it.z + 1.5) / 2.5)
        const iconSize = Math.round(44 * scale) // larger standalone icons like in the reference image
        const fontSize = Math.round(11 * scale)

        // Draw Icon directly (no background badge)
        const oc = offscreenIcons.current[it.skill.svg]
        if (oc) {
          ctx.save()
          ctx.globalAlpha = opacity
          ctx.drawImage(oc, px - iconSize / 2, py - iconSize / 2 - 8, iconSize, iconSize)
          ctx.restore()
        }

        // Draw Label Text
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

    // Interaction Handlers (drag rotating)
    const handlePointerDown = (e) => {
      isDragging.current = true
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      // Optional: stop velocity abruptly when touching
      // velocity.current = { x: 0, y: 0 }
    }

    const handlePointerMove = (e) => {
      if (!isDragging.current) return
      
      const dx = e.clientX - lastMousePos.current.x
      const dy = e.clientY - lastMousePos.current.y
      
      // Update velocity based on swipe (notice X speed maps to Y axis movement)
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

  return (
    <div ref={container} className="sphere__container">
      <canvas ref={canvasRef} className="sphere__canvas" />
    </div>
  )
}

/* ── NON-TECHNICAL BADGES COMPONENT ── */
function NonTechnicalList({ skills }) {
  // Define animation variants for staggered entry
  const containerVars = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }
  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <motion.div 
      className="nontechnical__list"
      variants={containerVars}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {skills.map(s => (
        <motion.div 
          key={s.name} 
          className="nontechnical__badge" 
          variants={itemVars}
          style={{ borderColor: `${s.color}66` }} // subtle color border
          whileHover={{ boxShadow: `0 8px 24px ${s.color}40`, borderColor: s.color }}
        >
          <div className="nontechnical__badge-icon">
            <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: getSVGPath(s.svg, s.color) }} />
          </div>
          <span>{s.name}</span>
        </motion.div>
      ))}
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
            <NonTechnicalList key="nontechnical" skills={nonTechnicalSkills} />
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
