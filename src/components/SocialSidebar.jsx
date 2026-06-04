import { motion } from 'framer-motion'
import { RiInstagramLine, RiMailLine, RiLinkedinFill } from 'react-icons/ri'
import './SocialSidebar.css'

export default function SocialSidebar() {
  return (
    <motion.div 
      className="social-sidebar"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="https://www.instagram.com/ab_wb_sid?igsh=MWRlYXd6YWY4ejhseQ==" className="icon" target="_blank" rel="noreferrer" title="Instagram">
        <RiInstagramLine />
      </a>
      <a href="mailto:aw1411175@gmail.com" className="icon" target="_blank" rel="noreferrer" title="Email">
        <RiMailLine />
      </a>
      <a href="https://www.linkedin.com/in/abdul-wahab-siddiqi-03a6ab33b" className="icon" target="_blank" rel="noreferrer" title="LinkedIn">
        <RiLinkedinFill />
      </a>
      <div className="social-sidebar__line" />
    </motion.div>
  )
}
