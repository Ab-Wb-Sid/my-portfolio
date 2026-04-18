import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiArrowLeftLine, RiArrowRightSLine, RiGithubLine, RiImageAddLine } from 'react-icons/ri'
import Footer from '../sections/Footer'
import headerBg from '../assets/header-bg.png'
import './ProjectsPage.css'

const projects = [
  {
    index: '01',
    title: 'AI Automation Workflow Builder for SMEs',
    desc: "An AI-powered automation hub built in Python — processing inbound messages, generating GPT-based replies and PDF quotations, and logging records to Google Sheets. Targeting a ~60% reduction in manual SME workflows.",
    tags: ['Python', 'Node.js', 'Express.js', 'OpenAI API', 'WhatsApp Business API', 'Gmail API'],
    status: 'progress',
    progress: 45,
    github: 'https://github.com/Ab-Wb-Sid/AI-Automation-Workflow-Builder',
    reverse: false,
  },
  {
    index: '02',
    title: 'Plagiarism Detection System',
    desc: "A C++ detection engine using 5+ NLP techniques — tokenization, stemming, cosine similarity, and Rabin-Karp n-gram hashing — producing color-coded severity reports across 3 levels of granularity.",
    tags: ['C++', 'NLP', 'Rabin-Karp', 'Tokenization', 'Cosine Similarity', 'Stemming'],
    status: 'done',
    progress: 100,
    year: '2025',
    reverse: true,
  },
  {
    index: '03',
    title: 'Ping-Pong Game',
    desc: "A real-time two-player arcade game built with JavaFX — featuring animation timelines, collision detection logic, game state management, scorekeeping, and smooth 60fps rendering.",
    tags: ['Java', 'JavaFX', 'Game Loop', 'Collision Detection', '60fps Rendering'],
    status: 'done',
    progress: 100,
    year: '2024',
    github: 'https://github.com/Ab-Wb-Sid/OOP-Project-JavaFX',
    reverse: false,
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.05 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function ProjectsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      {/* Hero */}
      <section className="projects-hero" style={{ backgroundImage: `url(${headerBg})` }}>
        <div className="projects-hero__content">
          <div className="projects-hero__breadcrumb">
            <Link to="/">Home</Link>
            <RiArrowRightSLine />
            <span>Projects</span>
          </div>
          <motion.h1 className="projects-hero__title"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            My <span>Projects</span>
          </motion.h1>
          <motion.p className="projects-hero__sub"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            A collection of things I've built — from AI systems to game engines.
          </motion.p>
        </div>
      </section>

      {/* Projects List */}
      <section className="projects-full">
        <div className="projects-full__inner">
          <Link to="/" className="back-btn">
            <RiArrowLeftLine /> Back to Portfolio
          </Link>

          {projects.map((p, i) => (
            <motion.article
              className={`pcard ${p.reverse ? 'pcard--reverse' : ''}`}
              key={p.index}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="pcard__image pcard__image--placeholder">
                <div className="placeholder__deco" />
                <div className="placeholder__icon"><RiImageAddLine /></div>
                <span className="placeholder__label">Add screenshot</span>
              </div>

              <div className="pcard__body">
                <div>
                  <span className="pcard__index">Project / {p.index}</span>
                  <div className={`pcard__status pcard__status--${p.status}`}>
                    <span className="dot" />
                    {p.status === 'progress' ? 'In Progress' : 'Completed'}
                  </div>
                  <h2 className="pcard__title">{p.title}</h2>
                  <p className="pcard__desc">{p.desc}</p>
                </div>

                <div className="pcard__tech">
                  {p.tags.map(t => <span className="pcard__tech-tag" key={t}>{t}</span>)}
                </div>

                <div className="pcard__footer">
                  <div className="pcard__progress">
                    <span className="pcard__progress-label">Progress</span>
                    <div className="pcard__progress-bar">
                      <div className="pcard__progress-fill"
                        style={{
                          width: `${p.progress}%`,
                          background: p.progress === 100 ? 'linear-gradient(90deg,#4ade80,#22c55e)' : undefined,
                        }}
                      />
                    </div>
                    <span className="pcard__progress-label" style={{ minWidth: '2.5rem' }}>{p.progress}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {p.year && <span className="pcard__year">{p.year}</span>}
                    {p.github && (
                      <div className="pcard__links">
                        <a href={p.github} className="pcard__link" title="GitHub" target="_blank" rel="noreferrer">
                          <RiGithubLine />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
