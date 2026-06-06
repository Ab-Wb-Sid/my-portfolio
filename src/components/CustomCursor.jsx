import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  const mousePos = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }

    let rafId
    const anim = () => {
      // Inner dot follows mouse closely
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.4
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.4

      // Outer ring has a smooth delayed trail
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15

      dot.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`

      rafId = requestAnimationFrame(anim)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(anim)

    // Hover effect classes on clickable elements
    const addHover = () => {
      dot.classList.add('hover')
      ring.classList.add('hover')
    }
    const removeHover = () => {
      dot.classList.remove('hover')
      ring.classList.remove('hover')
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
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
