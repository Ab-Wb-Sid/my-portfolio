import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  RiArrowLeftLine,
  RiExternalLinkLine,
  RiGithubLine,
} from 'react-icons/ri'
import Footer from '../sections/Footer'
import { projects } from '../data/projects'
import './ProjectDetailsPage.css'

export default function ProjectDetailsPage() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!project) {
    return (
      <>
        <main className="project-detail project-detail--missing">
          <Link to="/#projects" className="project-detail__back">
            <RiArrowLeftLine /> Back to projects
          </Link>
          <h1>Project not found</h1>
          <p>The project you opened is not available in this portfolio yet.</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className="project-detail">
        <div className="project-detail__inner">
          <Link to="/#projects" className="project-detail__back">
            <RiArrowLeftLine /> Back
          </Link>

          <section className="project-detail__intro">
            <motion.div
              className="project-detail__heading"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="project-detail__eyebrow">Project / {project.index}</span>
              <h1>{project.title}</h1>
              <p>{project.subtitle}</p>
            </motion.div>

            <motion.div
              className="project-detail__links"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}>
                  <RiGithubLine />
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live preview`}>
                  <RiExternalLinkLine />
                </a>
              )}
            </motion.div>
          </section>

          <section className="project-detail__meta">
            <div>
              <span>Year</span>
              <strong>{project.year}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{project.status === 'progress' ? 'In Progress' : 'Completed'}</strong>
            </div>
            <div>
              <span>Tech & Technique</span>
              <strong>{project.tags.join(', ')}</strong>
            </div>
          </section>

          <section className="project-detail__copy">
            <div>
              <span>Description</span>
              <p>{project.desc}</p>
            </div>
            <div>
              <span>My Role</span>
              <p>{project.role}</p>
            </div>
          </section>

          <section className="project-detail__gallery" aria-label={`${project.title} screenshots`}>
            {project.gallery.map((image, index) => (
              <motion.a
                href={image}
                target="_blank"
                rel="noreferrer"
                className="project-detail__image"
                key={`${project.slug}-${index}`}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={image} alt={`${project.title} screenshot ${index + 1}`} />
                <span><RiExternalLinkLine /></span>
              </motion.a>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
