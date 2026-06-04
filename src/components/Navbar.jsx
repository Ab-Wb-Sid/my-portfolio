import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RiInstagramLine, RiMailLine, RiLinkedinFill, RiMenuLine, RiCloseLine } from 'react-icons/ri'
import './Navbar.css'

const navItems = [
  { label: 'Home', path: '/', hash: '#home' },
  { label: 'About', path: '/', hash: '#about' },
  { label: 'Services', path: '/', hash: '#services' },
  { label: 'Skills', path: '/', hash: '#skills' },
  { label: 'Projects', path: '/', hash: '#projects' },
  { label: 'Contact', path: '/', hash: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      if (location.pathname === '/') {
        const sections = document.querySelectorAll('header, section, footer')
        let current = 'home'
        sections.forEach(s => {
          if (window.scrollY >= s.offsetTop - 120) current = s.id || current
        })
        setActiveSection(current)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const handleNavClick = (item) => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/' + item.hash)
    } else {
      const el = document.querySelector(item.hash)
      if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: 'smooth' })
    }
  }

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav__logo">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>AW<span>S</span>.</Link>
      </div>

      <div className={`nav__links ${menuOpen ? 'active' : ''}`}>
        {navItems.map(item => (
          <li key={item.hash}>
            <a
              className={location.pathname === '/' && activeSection === item.hash.slice(1) ? 'active' : ''}
              onClick={() => handleNavClick(item)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </div>

      <button className="nav__toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
      </button>
    </nav>
  )
}
