import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiArrowRightUpLine } from 'react-icons/ri'
import { projects } from '../data/projects'
import './ProjectsPreview.css'

const listVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const rowVariant = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

export default function ProjectsPreview() {
  const [selectedSlug, setSelectedSlug] = useState(projects[0]?.slug)
  const [previewTop, setPreviewTop] = useState(0)
  const listRef = useRef(null)

  const handlePointerMove = (event) => {
    const rect = listRef.current?.getBoundingClientRect()
    if (!rect) return
    setPreviewTop(event.clientY - rect.top)
  }

  return (
    <section className="project" id="projects">
      <div className="section__container project__container">
        <motion.div
          className="project__header"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section__label">Selected Work</span>
          <h2 className="section__title"><span>Selected</span> Projects</h2>
        </motion.div>

        <motion.div
          className="project__list"
          ref={listRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setSelectedSlug(projects[0]?.slug)}
          variants={listVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div
            className="project__float-preview"
            style={{ transform: `translateY(calc(${previewTop}px - 50%))` }}
            aria-hidden="true"
          >
            {projects.map(project => (
              <img
                src={project.image}
                alt=""
                className={project.slug === selectedSlug ? 'active' : ''}
                key={project.slug}
              />
            ))}
          </div>

          {projects.map((project, index) => (
            <motion.div variants={rowVariant} key={project.slug}>
              <Link
                to={`/projects/${project.slug}`}
                className="project__row"
                onPointerEnter={() => setSelectedSlug(project.slug)}
              >
                <img className="project__row-img" src={project.image} alt={project.title} />
                <span className="project__row-index">_{String(index + 1).padStart(2, '0')}.</span>
                <div className="project__row-main">
                  <h3>
                    {project.title}
                    <RiArrowRightUpLine />
                  </h3>
                  <div className="project__row-tech">
                    {project.tags.slice(0, 3).map((tag, tagIndex, visibleTags) => (
                      <span key={tag}>
                        {tag}
                        {tagIndex !== visibleTags.length - 1 && <i />}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
