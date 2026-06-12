import project1 from '../assets/project-1.png'
import project2 from '../assets/project-2.png'
import project3 from '../assets/project-3.png'
import project4 from '../assets/project-4.png'
import project5 from '../assets/project-5.png'
import project6 from '../assets/project-6.png'

export const projects = [
  {
    index: '01',
    slug: 'ai-automation-workflow-builder',
    title: 'AI Automation Workflow Builder',
    subtitle: 'Automation hub for SMEs',
    desc: 'An AI-powered automation hub built to process inbound messages, generate GPT-based replies and PDF quotations, and log records to Google Sheets for leaner SME workflows.',
    role: 'Designed the workflow architecture, connected API services, and shaped the response and quotation flow around practical business operations.',
    tags: ['Python', 'Node.js', 'OpenAI API', 'WhatsApp API', 'Gmail API'],
    status: 'progress',
    progress: 45,
    year: 'In Progress',
    github: 'https://github.com/Ab-Wb-Sid/AI-Automation-Workflow-Builder',
    image: project1,
    gallery: [project1, project5],
  },
  {
    index: '02',
    slug: 'plagiarism-detection-system',
    title: 'Plagiarism Detection System',
    subtitle: 'NLP and similarity engine',
    desc: 'A C++ detection engine using NLP techniques such as tokenization, stemming, cosine similarity, and Rabin-Karp n-gram hashing to produce severity-based reports.',
    role: 'Built the core matching logic, scoring approach, and report output structure for comparing documents across multiple granularities.',
    tags: ['C++', 'NLP', 'Rabin-Karp', 'Cosine Similarity', 'Stemming'],
    status: 'done',
    progress: 100,
    year: '2025',
    github: 'https://github.com/Ab-Wb-Sid/Plagiarism-Detection-System',
    image: project2,
    gallery: [project2, project4],
  },
  {
    index: '03',
    slug: 'ping-pong-game',
    title: 'Ping-Pong Game',
    subtitle: 'JavaFX arcade game',
    desc: 'A real-time two-player arcade game built with JavaFX, featuring animation timelines, collision detection, game state management, scorekeeping, and smooth rendering.',
    role: 'Implemented the game loop, collision behavior, scoring rules, and JavaFX scene interactions.',
    tags: ['Java', 'JavaFX', 'Game Loop', 'Collision Detection'],
    status: 'done',
    progress: 100,
    year: '2024',
    github: 'https://github.com/Ab-Wb-Sid/OOP-Project-JavaFX',
    image: project3,
    gallery: [project3, project6],
  },
  {
    index: '04',
    slug: 'crm-software',
    title: 'CRM Software',
    subtitle: 'Client and lead management',
    desc: 'A CRM system tailored for software houses, helping teams organize leads, clients, projects, follow-ups, and internal sales activity in one focused workspace.',
    role: 'Defined the core CRM workflow and built project, client, and lead-tracking surfaces for repeated daily use.',
    tags: ['CRM', 'Client Management', 'Lead Tracking', 'Dashboard'],
    status: 'done',
    progress: 100,
    year: '2026',
    github: 'https://github.com/Ab-Wb-Sid/CRM-System',
    image: project5,
    gallery: [project5, project1],
  },
]
