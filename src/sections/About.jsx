import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiArrowRightLine } from 'react-icons/ri'
import aboutImg from '../assets/about-bg.jpg'
import './About.css'

const facts = [
  { num: '3+', label: 'Projects' },
  { num: '5+', label: 'Tech Stack' },
  { num: '2+', label: 'Years Exp.' },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="section__container about__container">
        <motion.div className="about__image"
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <img src={aboutImg} alt="Abdul Wahab Siddiqi" />
        </motion.div>

        <motion.div className="about__content"
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <span className="section__label">Who I Am</span>
          <h2 className="section__title">About <span>Me</span></h2>
          <p className="section__subtitle">Software Engineer, Full-Stack Developer &amp; Digital Marketer</p>
          <p className="about__details">
            I am a versatile Software Engineer with expertise in Python and C++ development,
            specializing in building scalable applications, automating workflows, and
            optimizing system performance. I excel in full-stack web development,
            API integration planning, and designing robust system architectures.
            I also have hands-on experience in digital marketing, including SEO,
            affiliate marketing, and managing e-commerce platforms.
          </p>
          <div className="about__facts">
            {facts.map(f => (
              <div className="about__fact" key={f.label}>
                <span className="about__fact-num">{f.num}</span>
                <span className="about__fact-label">{f.label}</span>
              </div>
            ))}
          </div>
          <Link to="/about" className="btn">
            More About Me <RiArrowRightLine />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
