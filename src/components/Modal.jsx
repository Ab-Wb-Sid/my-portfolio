import { useEffect, useRef } from 'react'
import './Modal.css'

export default function Modal({ open, onClose, children }) {
  const modalRef = useRef(null)
  const previousFocus = useRef(null)

  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement
      document.body.style.overflow = 'hidden'

      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusables = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (focusables.length > 0) {
            focusables[0].focus()
          } else {
            modalRef.current.focus()
          }
        }
      }, 50)

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose()
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusables = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (focusables.length === 0) return

          const firstElement = focusables[0]
          const lastElement = focusables[focusables.length - 1]

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
              e.preventDefault()
            }
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => {
        clearTimeout(timer)
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
        if (previousFocus.current && typeof previousFocus.current.focus === 'function') {
          previousFocus.current.focus()
        }
      }
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()} 
        ref={modalRef} 
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">&times;</button>
        {children}
      </div>
    </div>
  )
}
