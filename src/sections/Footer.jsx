import { useState } from 'react'
import { motion } from 'framer-motion'
import { RiFacebookFill, RiMailLine, RiInstagramLine, RiLinkedinFill, RiSendPlaneLine } from 'react-icons/ri'
import Modal from '../components/Modal'
import './Footer.css'

export default function Footer() {
  const [thankYou, setThankYou] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://formspree.io/f/xdkazezp', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setThankYou(true); e.target.reset() }
      else alert('Failed. Please try again.')
    } catch {
      alert('Failed. Please try again.')
    }
  }

  return (
    <footer id="contact" className="footer-section">
      <div className="section__container footer__container">
        <motion.div className="footer__content"
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <span className="section__label">Get In Touch</span>
          <h2 className="section__title">Contact <span>Me!</span></h2>
          <p className="section__subtitle">Have a project in mind?</p>
          <div className="footer__details">
            <p>Fill out the form and I'll get back to you as soon as possible.</p>
            <p>Digital Agency Network, 20</p>
            <p>Shad Bagh, Lahore, Pakistan</p>
          </div>
          <div className="social__icons">
            <a href="#" className="icon"><RiFacebookFill /></a>
            <a href="mailto:aw1411175@gmail.com" className="icon" target="_blank" rel="noreferrer"><RiMailLine /></a>
            <a href="https://www.instagram.com/ab_wb_sid?igsh=MWRlYXd6YWY4ejhseQ==" className="icon" target="_blank" rel="noreferrer"><RiInstagramLine /></a>
            <a href="https://www.linkedin.com/in/abdul-wahab-siddiqi-03a6ab33b" className="icon" target="_blank" rel="noreferrer"><RiLinkedinFill /></a>
          </div>
        </motion.div>

        <motion.form className="footer__form" onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email Address" required />
          <input type="text" name="phone" placeholder="Your Phone Number" />
          <textarea name="message" rows="8" placeholder="Tell me about your project..." required />
          <button type="submit" className="btn">Send Message <RiSendPlaneLine /></button>
        </motion.form>
      </div>

      <div className="footer__bottom">
        Made with <span>♥</span> by Abdul Wahab Siddiqi &nbsp;·&nbsp; Software Engineer
      </div>

      <Modal open={thankYou} onClose={() => setThankYou(false)}>
        <h2>Thank You! 🎉</h2>
        <p>Your message has been sent successfully. I'll get back to you soon.</p>
      </Modal>
    </footer>
  )
}
