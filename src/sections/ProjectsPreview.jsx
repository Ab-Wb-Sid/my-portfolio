import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiArrowRightLine } from 'react-icons/ri'
import project1 from '../assets/project-1.png'
import project2 from '../assets/project-2.png'
import project3 from '../assets/project-3.png'
import './ProjectsPreview.css'

const projects = [
  { img: project1, title: 'AI Automation Workflow Builder', tech: 'Python · Node.js · OpenAI API · WhatsApp API', tag: 'In Progress' },
  { img: project2, title: 'Plagiarism Detection System', tech: 'C++ · NLP · Rabin-Karp Algorithm', tag: '2025' },
  { img: project3, title: 'Ping-Pong Game', tech: 'Java · JavaFX · Game Loop', tag: '2024' },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export default function ProjectsPreview() {
  return (
    <section className="project" id="projects">
      <div className="section__container project__container">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <span className="section__label">Portfolio</span>
          <h2 className="section__title"><span>Latest</span> Projects</h2>
        </motion.div>

        <motion.div className="project__preview__grid" variants={stagger}
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          {projects.map(p => (
            <motion.div className="project__preview__card" key={p.title} variants={cardVariant}>
              <div className="project__preview__img">
                <img src={p.img} alt={p.title} />
                <div className="project__preview__overlay">
                  <span className="project__preview__tag">{p.tag}</span>
                </div>
              </div>
              <div className="project__preview__info">
                <h4>{p.title}</h4>
                <p>{p.tech}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div>
          <Link to="/projects" className="btn projects__view__all__btn">
            View All Projects <RiArrowRightLine />
          </Link>
        </div>
      </div>
    </section>
  )
}
