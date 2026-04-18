import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ dotX: 0, dotY: 0, ringX: 0, ringY: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      pos.current.dotX = e.clientX
      pos.current.dotY = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    let rafId
    const animRing = () => {
      pos.current.ringX += (pos.current.dotX - pos.current.ringX) * 0.12
      pos.current.ringY += (pos.current.dotY - pos.current.ringY) * 0.12
      ring.style.left = pos.current.ringX + 'px'
      ring.style.top = pos.current.ringY + 'px'
      rafId = requestAnimationFrame(animRing)
    }

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animRing)

    const addHover = () => ring.classList.add('hovering')
    const removeHover = () => ring.classList.remove('hovering')

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
    <>
      <div className="cursor__dot" ref={dotRef} />
      <div className="cursor__ring" ref={ringRef} />
    </>
  )
}
