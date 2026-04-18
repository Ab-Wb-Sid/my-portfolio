import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './AboutDetails.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
}

export default function AboutDetails() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <section className="about-details">
      <div className="section__container about-details__container">
        <motion.h2 className="section__title" custom={0} variants={fadeUp} initial="hidden" animate="visible">
          About <span>Me</span>
        </motion.h2>
        <motion.p className="section__subtitle" custom={1} variants={fadeUp} initial="hidden" animate="visible">
          Software Engineer &amp; Full-Stack Developer
        </motion.p>

        <motion.p className="about-details__content" custom={2} variants={fadeUp} initial="hidden" animate="visible">
          I am a versatile professional with expertise in both technical development and digital marketing. Proficient in <strong>Python</strong> and <strong>C++</strong>, I specialize in building scalable applications, automating workflows, and optimizing system performance. My passion for problem-solving drives me to create efficient and innovative solutions for complex challenges.
        </motion.p>
        <motion.p className="about-details__content" custom={3} variants={fadeUp} initial="hidden" animate="visible">
          In the realm of digital marketing, I excel in <strong>SEO optimization</strong>, <strong>affiliate marketing</strong>, and designing effective <strong>ad campaigns</strong> for social media and search engines. I have hands-on experience in managing <strong>e-commerce platforms</strong>, ensuring seamless online shopping experiences for users. Additionally, I create engaging, <strong>SEO-friendly content</strong> for blogs, websites, and social media platforms, helping businesses grow their online presence.
        </motion.p>
        <motion.p className="about-details__content" custom={4} variants={fadeUp} initial="hidden" animate="visible">
          I am also skilled in <strong>video and photo editing</strong>, producing professional and creative visual content for various projects. Beyond my technical and creative skills, I am passionate about <strong>teaching and mentoring</strong> in programming, design, and digital marketing, empowering others to achieve their goals.
        </motion.p>
        <motion.p className="about-details__content" custom={5} variants={fadeUp} initial="hidden" animate="visible">
          Throughout my career, I have achieved several milestones, including developing high-performing applications, driving organic traffic growth, and delivering successful marketing campaigns. My collaborative approach and dedication to continuous learning enable me to deliver exceptional results for every project I undertake.
        </motion.p>
        <motion.p className="about-details__content" custom={6} variants={fadeUp} initial="hidden" animate="visible">
          I am constantly exploring new technologies and trends to stay ahead in the ever-evolving tech and marketing landscape. Whether it's building robust software solutions or crafting impactful marketing strategies, I am committed to delivering excellence in everything I do.
        </motion.p>

        <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible">
          <Link to="/" className="btn">Back to Home</Link>
        </motion.div>
      </div>
    </section>
  )
}
