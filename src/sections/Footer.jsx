import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  RiMailLine,
  RiInstagramLine,
  RiLinkedinFill,
  RiSendPlaneLine,
  RiMapPinLine,
  RiPhoneLine,
  RiUserLine,
  RiChat3Line,
  RiShieldCheckLine,
  RiGithubFill
} from 'react-icons/ri'
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
      if (res.ok) {
        setThankYou(true)
        e.target.reset()
      } else {
        alert('Failed. Please try again.')
      }
    } catch {
      alert('Failed. Please try again.')
    }
  }

  return (
    <footer id="contact" className="footer-section">
      <div className="noise-overlay" />

      <div className="section__container footer__container">

        {/* Left Side: Info Panel */}
        <motion.div className="contact__info-panel"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <span className="section__label">Get In Touch</span>
          <h2 className="section__title">Let's Work <span>Together</span></h2>
          <p className="section__subtitle">
            Have a project in mind, looking to collaborate, or just want to chat? Fill out the form and I'll get back to you as soon as possible.
          </p>

          <div className="contact__cards">
            <div className="contact__card">
              <div className="contact__card-icon">
                <RiMapPinLine />
              </div>
              <div className="contact__card-details">
                <h4>Location</h4>
                <p>Lahore, Pakistan</p>
              </div>
            </div>

            <div className="contact__card">
              <div className="contact__card-icon">
                <RiMailLine />
              </div>
              <div className="contact__card-details">
                <h4>Email</h4>
                <p><a href="mailto:connect.abdulwahabsiddiqi@gmail.com">connect.abdulwahabsiddiqi@gmail.com</a></p>
              </div>
            </div>

          </div>

          <div className="contact__socials-title">Follow Me</div>
          <div className="contact__socials">
            <a href="https://github.com/Ab-Wb-Sid" className="social-icon" target="_blank" rel="noreferrer" title="GitHub">
              <RiGithubFill />
            </a>
            <a href="https://www.instagram.com/ab_wb_sid?igsh=MWRlYXd6YWY4ejhseQ==" className="social-icon" target="_blank" rel="noreferrer" title="Instagram">
              <RiInstagramLine />
            </a>
            <a href="https://www.linkedin.com/in/abdul-wahab-siddiqi-03a6ab33b" className="social-icon" target="_blank" rel="noreferrer" title="LinkedIn">
              <RiLinkedinFill />
            </a>
            <a href="mailto:connect.abdulwahabsiddiqi@gmail.com" className="social-icon" target="_blank" rel="noreferrer" title="Email">
              <RiMailLine />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Form Card */}
        <motion.div className="contact__form-card"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="form-row-2">
              <div className="form-input-wrapper">
                <label htmlFor="contact-name">Full Name</label>
                <div className="input-with-icon">
                  <input type="text" id="contact-name" name="name" placeholder="John Doe" required />
                  <RiUserLine className="input-icon" />
                </div>
              </div>
              <div className="form-input-wrapper">
                <label htmlFor="contact-email">Email Address</label>
                <div className="input-with-icon">
                  <input type="email" id="contact-email" name="email" placeholder="john@example.com" required />
                  <RiMailLine className="input-icon" />
                </div>
              </div>
            </div>

            <div className="form-input-wrapper">
              <label htmlFor="contact-phone">Phone Number</label>
              <div className="input-with-icon">
                <input type="text" id="contact-phone" name="phone" placeholder="+00 000 0000000" />
                <RiPhoneLine className="input-icon" />
              </div>
            </div>

            <div className="form-input-wrapper">
              <label htmlFor="contact-message">Your Message</label>
              <div className="input-with-icon align-top">
                <textarea id="contact-message" name="message" rows="6" placeholder="Tell me about your project..." required />
                <RiChat3Line className="input-icon" />
              </div>
            </div>

            <button type="submit" className="btn btn--submit-contact">
              <span>Send Message</span>
              <RiSendPlaneLine className="btn-icon" />
            </button>

            <div className="form-privacy-msg">
              <RiShieldCheckLine className="privacy-icon" />
              <span>Your privacy is protected. I will never share your information.</span>
            </div>
          </form>
        </motion.div>
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
