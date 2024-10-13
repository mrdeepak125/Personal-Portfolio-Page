import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useAnimation } from 'framer-motion'
import { Sun, Moon, Github, Linkedin, Mail, ChevronDown, GraduationCap, Award, Menu, X } from 'lucide-react'
import Deepak from "./assets/Deepak.png";
import DeepakAbout from "./assets/DeepakAbout.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "./loader.css";
import { Analytics } from "@vercel/analytics/react"

export default function Component() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    education: useRef(null),
    projects: useRef(null),
    certificates: useRef(null),
    contact: useRef(null),
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current && ref.current.offsetTop <= scrollPosition && 
            ref.current.offsetTop + ref.current.offsetHeight > scrollPosition) {
          setActiveSection(section)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <ToastContainer />
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-blue-500 origin-[0%] z-50"
        style={{ scaleX }}
      />
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
          >
            Deepak Puri Goswami
          </motion.h1>
          <div className="hidden md:flex space-x-6">
            {['home', 'about', 'education', 'projects', 'certificates', 'contact'].map((section) => (
              <motion.button
                key={section}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(section)}
                className={`capitalize ${
                  activeSection === section
                    ? 'text-blue-500 font-bold border-b-2 border-blue-500'
                    : 'hover:text-blue-400'
                }`}
              >
                {section}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-1 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-30 bg-white dark:bg-gray-800 ${mobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          {['home', 'about', 'education', 'projects', 'certificates', 'contact'].map((section) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(section)}
              className={`text-2xl capitalize ${
                activeSection === section
                  ? 'text-blue-500 font-bold'
                  : 'hover:text-blue-400'
              }`}
            >
              {section}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </motion.button>
        </div>
      </motion.div>

      <main className="container mx-auto px-6 pt-24 pb-12">
        <AnimatedSection sectionRef={sectionRefs.home}>
          <Home scrollToProjects={() => scrollToSection('projects')} />
        </AnimatedSection>
        <AnimatedSection sectionRef={sectionRefs.about}>
          <About />
        </AnimatedSection>
        <AnimatedSection sectionRef={sectionRefs.education}>
          <Education />
        </AnimatedSection>
        <AnimatedSection sectionRef={sectionRefs.projects}>
          <Projects />
        </AnimatedSection>
        <AnimatedSection sectionRef={sectionRefs.certificates}>
          <Certificates />
        </AnimatedSection>
        <AnimatedSection sectionRef={sectionRefs.contact}>
          <Contact />
        </AnimatedSection>
      </main>

      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; 2024 Deepak Puri Goswami. All rights reserved.</p>
          <div className="flex space-x-4">
            <motion.a 
              href="https://github.com/mrdeepak125"
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-500 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/deepak-puri-goswami-621054291/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-500 transition-colors"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a 
              href="mailto:deepakpuri9190@gmail.com" 
              className="hover:text-blue-500 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={20} />
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function AnimatedSection({ children, sectionRef }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    } else {
      mainControls.start("hidden")
    }
  }, [isInView, mainControls])

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20"
      initial="hidden"
      animate={mainControls}
      exit="hidden"
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <div ref={ref} className="w-full">
        {children}
      </div>
    </motion.section>
  )
}

function Home({ scrollToProjects }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="mb-8 relative"
      >
        <motion.div 
          className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 blur-lg opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        ></motion.div>
       <img
          src={Deepak}
          alt="Deepak Puri Goswami"
          className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-white dark:border-gray-800 shadow-lg"
        />
      </motion.div>
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
       Hi, I'm Deepak
      </motion.h2>
      <motion.p
        className="text-lg md:text-xl mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Full-stack Developer
      </motion.p>
      <motion.button
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToProjects}
      >
        View My Work
      </motion.button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8"
      >
        <ChevronDown size={32} className="text-gray-400" />
      </motion.div>
    </div>
  )
}

function About() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  return (
    <motion.div 
      className="grid md:grid-cols-2 gap-12 items-center"
      style={{ scale }}
    >
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">About Me</h2>
        <p className="mb-4 text-base md:text-lg leading-relaxed">
          I'm a passionate full-stack developer with 2 years of experience in creating
          beautiful and functional web applications. My expertise includes React, Node.js,
          and Basic HTML, CSS and JavaScript.
        </p>
        <p className="mb-6 text-base md:text-lg leading-relaxed">
          When I'm not coding, you can find me exploring new technologies.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.button>
          <motion.button
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            My Skills
          </motion.button>
        </div>
      </div>
      <motion.div
        className="relative mt-8 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div 
          className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg absolute top-4 left-4 -z-10 blur-lg opacity-30"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        ></motion.div>
        <img
          src={DeepakAbout}
          alt="Deepak working"
          className="rounded-lg shadow-2xl w-full h-auto object-cover"
        />
      </motion.div>
    </motion.div>
  )
}

function Education() {
  const educationData = [
    {
      degree: "Bachelor of Technology",
      institution: "Poornima University",
      year: "2023 - 2027",
      description: "Specialized in Computer Science"
    },
    {
      degree: "12th RBSE Board",
      institution: "Shri Maheshwari Senior Secondary School",
      year: "2016 - 2023",
      description: "Graduated"
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Education
      </h2>
      <div className="space-y-8">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex items-start space-x-4"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap size={24} className="text-blue-500" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{edu.institution}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{edu.year}</p>
              <p className="text-gray-700 dark:text-gray-200">{edu.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Projects() {
  const projects = [
    { id: 1, image: "https://res.cloudinary.com/djdi5hkyx/image/upload/v1725260012/Screenshot_2024-09-02_122003_lvnwyf.png" , title: 'Movie Streaming', description: 'A full-stack movie streaming website with React and Node.js', link:"https://cineflow.netlify.app/#/"},
    { id: 2, image: "https://res.cloudinary.com/djdi5hkyx/image/upload/v1722598011/logo-white_cdtrzl.png" , title: 'Music Streaming', description: 'A full-stack music streaming website with React, Next.js and Node.js', link:"https://echoplay.vercel.app/"},
    // { id: 3, image: "" , title: 'Weather Forecast App', description: 'Real-time weather data visualization using React and D3.js' },
  ]

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        My Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div 
              className="h-48 bg-gradient-to-br from-blue-400 to-purple-500"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            > 
              <img 
                  className='h-full w-full' 
                  src={project.image} 
                  alt={project.title}
              />  
            </motion.div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
              <motion.button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
               <a href={project.link} target='__blank'>Visit Project</a>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Certificates() {
  const certificates = [
    { id: 1, title: 'Prayogam-2024', issuer: 'Poornima University', year: '2024', link:"https://res.cloudinary.com/djdi5hkyx/image/upload/v1726307766/Deepak_puri_goswami_page-0001_ngvw5x.jpg" },
    { id: 2, title: 'Google Workspace for Education - Higher Ed Program', issuer: 'Google Cloud', year: '2024',link:"https://res.cloudinary.com/djdi5hkyx/image/upload/v1726307758/Deepak_Puri_Goswami_page-0001_1_hbpmhf.jpg" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Certificates
      </h2>
      <div className="space-y-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex items-center space-x-4"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Award size={24} className="text-blue-500" />
              </motion.div>
            </div>
            <a href={cert.link} target='__blank'>
              <div>
                <h3 className="text-xl font-semibold">{cert.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{cert.issuer}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{cert.year}</p>
            </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://email-server-er04.onrender.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Get in Touch
      </h2>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <label htmlFor="email" className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500"
            required
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500"
            required
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <label htmlFor="message" className="block mb-2 font-medium">Message</label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500"
            required
          ></textarea>
        </motion.div>
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-md shadow-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </motion.form>
      <ToastContainer />
      <Analytics />
    </div>
  )
}