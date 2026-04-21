import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const pos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = (e) => {
      pos.current.targetX = e.clientX
      pos.current.targetY = e.clientY
    }

    let rafId
    const anim = () => {
      // Smooth interpolation for the arrowhead
      pos.current.x += (pos.current.targetX - pos.current.x) * 0.35
      pos.current.y += (pos.current.targetY - pos.current.y) * 0.35
      
      cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      rafId = requestAnimationFrame(anim)
    }

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(anim)

    const addHover = () => cursor.classList.add('hovering')
    const removeHover = () => cursor.classList.remove('hovering')

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, .service__card, .project__preview__card, .skills__category, .pcard').forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="cursor__arrow" ref={cursorRef}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 2.5L23.5 10.5L13.5 13.5L10.5 24.5L2.5 2.5Z" fill="var(--secondary-color)" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}
