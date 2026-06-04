import { useState } from 'react'
import { RiInstagramLine, RiMailLine, RiLinkedinFill, RiArrowRightSLine } from 'react-icons/ri'
import './SocialSidebar.css'

export default function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className={`social-tab-container ${isOpen ? 'open' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Sliding Panel containing the icons */}
      <div className="social-tab-panel">
        <div className="social-tab-links">
          <a 
            href="https://www.instagram.com/ab_wb_sid?igsh=MWRlYXd6YWY4ejhseQ==" 
            className="social-icon-link" 
            target="_blank" 
            rel="noreferrer" 
            title="Instagram"
          >
            <RiInstagramLine />
          </a>
          <a 
            href="mailto:aw1411175@gmail.com" 
            className="social-icon-link" 
            target="_blank" 
            rel="noreferrer" 
            title="Email"
          >
            <RiMailLine />
          </a>
          <a 
            href="https://www.linkedin.com/in/abdul-wahab-siddiqi-03a6ab33b" 
            className="social-icon-link" 
            target="_blank" 
            rel="noreferrer" 
            title="LinkedIn"
          >
            <RiLinkedinFill />
          </a>
        </div>
      </div>

      {/* The clickable/hoverable Tab trigger */}
      <button 
        className="social-tab-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle social links"
      >
        <span className="social-tab-text">SOCIALS</span>
        <div className="social-tab-arrow">
          <RiArrowRightSLine style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
        </div>
      </button>
    </div>
  )
}
