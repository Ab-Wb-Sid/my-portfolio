import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const planeContainerRef = useRef(null)
  const trailRefs = useRef([])

  const mousePos = useRef({ x: 0, y: 0 })
  const planePos = useRef({ x: 0, y: 0 })
  const planeAngle = useRef(0)
  const rollAngle = useRef(0)
  const displayRoll = useRef(0)
  const isHovered = useRef(false)
  const isClicked = useRef(false)
  
  // Interpolated scale values for hover and click states
  const hoverScale = useRef(1)
  const clickScale = useRef(1)

  // Array to hold coordinates and angles of trail particles (8 particles for a longer stream)
  const TRAIL_LENGTH = 8
  const trailCoords = useRef(
    Array(TRAIL_LENGTH).fill(null).map(() => ({ x: 0, y: 0 }))
  )
  const trailAngles = useRef(Array(TRAIL_LENGTH).fill(0))

  useEffect(() => {
    const planeContainer = planeContainerRef.current
    if (!planeContainer) return

    // Initialize position to prevent jumping from (0,0)
    const handleInitialMove = (e) => {
      const { clientX, clientY } = e
      mousePos.current = { x: clientX, y: clientY }
      planePos.current = { x: clientX, y: clientY }
      trailCoords.current.forEach(pt => {
        pt.x = clientX
        pt.y = clientY
      })
      trailAngles.current.fill(0)
      window.removeEventListener('mousemove', handleInitialMove)
    }
    window.addEventListener('mousemove', handleInitialMove)

    const onMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }

    const onMouseDown = () => {
      isClicked.current = true
      // Trigger a 360-degree barrel roll by adding 360 to target roll
      rollAngle.current += 360
    }

    const onMouseUp = () => {
      isClicked.current = false
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    let rafId
    const anim = () => {
      // 1. Paper plane: trails behind the mouse (lerp 0.12 for snappy yet smooth flight)
      const dx = mousePos.current.x - planePos.current.x
      const dy = mousePos.current.y - planePos.current.y
      planePos.current.x += dx * 0.12
      planePos.current.y += dy * 0.12

      // Calculate direction angle based on velocity
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI)
        
        // Easing the angle with 180 deg wrap handling
        let diff = targetAngle - planeAngle.current
        while (diff < -180) diff += 360
        while (diff > 180) diff -= 360
        planeAngle.current += diff * 0.15
      }
      
      // Calculate display roll angle (barrel roll) and scale
      displayRoll.current += (rollAngle.current - displayRoll.current) * 0.12
      hoverScale.current += ((isHovered.current ? 1.3 : 1) - hoverScale.current) * 0.15
      clickScale.current += ((isClicked.current ? 0.8 : 1) - clickScale.current) * 0.2
      const finalScale = hoverScale.current * clickScale.current

      planeContainer.style.transform = `translate3d(${planePos.current.x}px, ${planePos.current.y}px, 0) perspective(400px) rotate(${planeAngle.current}deg) rotateX(${displayRoll.current}deg) scale(${finalScale})`

      // 2. Update trail particles
      // Particle 0 follows the paper plane (offset backwards by 14px based on angle)
      const rad = (planeAngle.current * Math.PI) / 180
      const tailStartX = planePos.current.x - Math.cos(rad) * 14
      const tailStartY = planePos.current.y - Math.sin(rad) * 14

      trailCoords.current[0].x += (tailStartX - trailCoords.current[0].x) * 0.35
      trailCoords.current[0].y += (tailStartY - trailCoords.current[0].y) * 0.35
      trailAngles.current[0] += (planeAngle.current - trailAngles.current[0]) * 0.35

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trailCoords.current[i].x += (trailCoords.current[i - 1].x - trailCoords.current[i].x) * 0.35
        trailCoords.current[i].y += (trailCoords.current[i - 1].y - trailCoords.current[i].y) * 0.35
        
        // Angle lerp for curling trail alignment
        let diff = trailAngles.current[i - 1] - trailAngles.current[i]
        while (diff < -180) diff += 360
        while (diff > 180) diff -= 360
        trailAngles.current[i] += diff * 0.35
      }

      // Update trail DOM elements
      trailRefs.current.forEach((el, idx) => {
        if (el) {
          // Scale down subsequent trail elements
          const scale = 1 - idx * 0.1
          const opacity = (1 - idx * 0.12) * (isHovered.current ? 0.95 : 0.7)
          
          // Apply position, rotation, and scale
          el.style.transform = `translate3d(${trailCoords.current[idx].x}px, ${trailCoords.current[idx].y}px, 0) rotate(${trailAngles.current[idx]}deg) scale(${scale})`
          el.style.opacity = opacity
        }
      })

      rafId = requestAnimationFrame(anim)
    }

    rafId = requestAnimationFrame(anim)

    // Hover effect classes on clickable elements
    const addHover = () => {
      isHovered.current = true
    }
    const removeHover = () => {
      isHovered.current = false
    }

    const observer = new MutationObserver(() => {
      const targets = document.querySelectorAll(
        'a, button, .service__card, .project__preview__card, .skills__category, .pcard, .sphere-node, .social-icon, .skills__tab'
      )
      targets.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleInitialMove)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Curving Wind Trail Particles */}
      {Array(TRAIL_LENGTH).fill(null).map((_, i) => (
        <div 
          key={i} 
          className="cursor-trail-particle" 
          ref={el => (trailRefs.current[i] = el)} 
        />
      ))}

      {/* Sleek 3D Paper Plane */}
      <div className="cursor-plane-container" ref={planeContainerRef}>
        <svg className="cursor-plane" viewBox="0 0 24 24">
          {/* Left wing */}
          <polygon className="plane-wing-left" points="2 4 22 12 6 12" />
          {/* Right wing */}
          <polygon className="plane-wing-right" points="2 20 22 12 6 12" />
        </svg>
      </div>
    </>
  )
}
