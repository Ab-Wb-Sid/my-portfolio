import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiCodeSSlashLine,
  RiMegaphoneLine,
  RiRocketLine,
  RiTeamLine,
} from 'react-icons/ri'
import Footer from '../sections/Footer'
import headerBg from '../assets/header-bg.png'
import './AboutDetails.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
}

const strengths = [
  {
    icon: <RiCodeSSlashLine />,
    title: 'Engineering',
    text: 'Python, C++, full-stack systems, automation workflows, and performance-minded application design.',
  },
  {
    icon: <RiMegaphoneLine />,
    title: 'Growth',
    text: 'SEO, affiliate marketing, ad campaigns, e-commerce operations, and content built for discoverability.',
  },
  {
    icon: <RiRocketLine />,
    title: 'Execution',
    text: 'I connect technical delivery with practical business outcomes, from prototype to polished launch.',
  },
  {
    icon: <RiTeamLine />,
    title: 'Mentorship',
    text: 'Teaching and guiding others in programming, design, and digital marketing with clear, hands-on support.',
  },
]

export default function AboutDetails() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <section className="about-hero" style={{ backgroundImage: `url(${headerBg})` }}>
        <div className="about-hero__content">
          <div className="about-hero__breadcrumb">
            <Link to="/">Home</Link>
            <RiArrowRightSLine />
            <span>About</span>
          </div>
          <motion.h1 className="about-hero__title" custom={0} variants={fadeUp} initial="hidden" animate="visible">
            About <span>Me</span>
          </motion.h1>
          <motion.p className="about-hero__sub" custom={1} variants={fadeUp} initial="hidden" animate="visible">
            Software Engineer, full-stack developer, and digital growth builder.
          </motion.p>
        </div>
      </section>

      <section className="about-details">
        <div className="about-details__inner">
          <Link to="/" className="back-btn">
            <RiArrowLeftLine /> Back to Portfolio
          </Link>

          <motion.div className="about-details__intro-card" custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <span className="section__label">Profile</span>
            <h2 className="section__title">Building useful software with <span>business context</span></h2>
            <p className="section__subtitle">
              I work across engineering, automation, and digital marketing, which helps me think beyond the code and design solutions that are practical, scalable, and easy to use.
            </p>
          </motion.div>

          <div className="about-details__grid">
            {strengths.map((item, i) => (
              <motion.article className="about-details__card" key={item.title} custom={i + 3} variants={fadeUp} initial="hidden" animate="visible">
                <div className="about-details__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>

          <motion.div className="about-details__story" custom={7} variants={fadeUp} initial="hidden" animate="visible">
            <p>
              I am a versatile professional with expertise in both technical development and digital marketing. Proficient in <strong>Python</strong> and <strong>C++</strong>, I specialize in building scalable applications, automating workflows, and optimizing system performance.
            </p>
            <p>
              I also bring hands-on experience in <strong>SEO optimization</strong>, <strong>affiliate marketing</strong>, social media campaigns, e-commerce platforms, and SEO-friendly content. That blend helps me create digital products that are not only functional, but also positioned to grow.
            </p>
            <p>
              Beyond development and marketing, I enjoy <strong>teaching and mentoring</strong>. I am constantly exploring new technologies and trends, with a focus on delivering clean, reliable, and thoughtful work for every project.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
