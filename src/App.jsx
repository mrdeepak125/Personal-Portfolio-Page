import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useAnimation } from 'framer-motion'
import { Sun, Moon, Github, Linkedin, Mail, ChevronDown, GraduationCap, Award, Menu, X, Code, Music, Film, Type } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-[0%] z-50"
        style={{ scaleX }}
      />
      
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/20 dark:bg-purple-400/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              size: Math.random() * 5 + 2,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
            }}
          />
        ))}
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
          >
            Deepak Puri Goswami
          </motion.h1>
          
          <div className="hidden md:flex space-x-6 items-center">
            {['home', 'about', 'education', 'projects', 'certificates', 'contact'].map((section) => (
              <motion.button
                key={section}
                whileHover={{ 
                  scale: 1.05,
                  background: theme === 'light' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(168, 85, 247, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(section)}
                className={`capitalize px-3 py-1 rounded-full transition-all ${
                  activeSection === section
                    ? 'text-blue-500 dark:text-purple-400 font-medium bg-blue-500/10 dark:bg-purple-500/10'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-purple-400'
                }`}
              >
                {section}
              </motion.button>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>
          </div>
          
          <motion.button
            className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-700"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-30 bg-white dark:bg-gray-900 backdrop-blur-lg pt-24 ${mobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="flex flex-col items-center justify-start h-full space-y-6 px-6">
          {['home', 'about', 'education', 'projects', 'certificates', 'contact'].map((section) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(section)}
              className={`text-2xl capitalize px-6 py-3 w-full max-w-xs rounded-xl ${
                activeSection === section
                  ? 'bg-blue-500 dark:bg-purple-600 text-white font-bold'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
              }`}
            >
              {section}
            </motion.button>
          ))}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md mt-8"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </motion.button>
        </div>
      </motion.div>

      <main className="container mx-auto px-6 pt-24 pb-12">
        <AnimatedSection sectionRef={sectionRefs.home}>
          <Home scrollToProjects={() => scrollToSection('projects')} scrollToContact={()=> scrollToSection('contact')}/>
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

      <footer className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0 text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Deepak Puri Goswami. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <motion.a 
              href="https://github.com/mrdeepak125"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub"
            >
              <Github size={22} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/deepak-puri-goswami-621054291/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </motion.a>
            <motion.a 
              href="mailto:deepakpuri9190@gmail.com" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Email"
            >
              <Mail size={22} />
            </motion.a>
          </div>
        </div>
      </footer>
      
      <Analytics />
    </div>
  )
}

function AnimatedSection({ children, sectionRef }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const mainControls = useAnimation()
  const slideControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
      slideControls.start("visible")
    } else {
      mainControls.start("hidden")
      slideControls.start("hidden")
    }
  }, [isInView, mainControls, slideControls])

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
      initial="hidden"
      animate={mainControls}
      exit="hidden"
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <motion.div
        className="absolute inset-0 bg-blue-500/5 dark:bg-purple-500/5 z-0"
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
      />
      
      <div ref={ref} className="w-full relative z-10">
        {children}
      </div>
    </motion.section>
  )
}

function Home({ scrollToProjects , scrollToContact }) {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="mb-8 relative"
      >
        <motion.div 
          className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 blur-xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        />
        
        <motion.div
          className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={Deepak}
            alt="Deepak Puri Goswami"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="overflow-hidden"
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          variants={textVariants}
          custom={0}
        >
          Hi, I'm Deepak
        </motion.h2>
        
        <motion.div 
          className="text-2xl md:text-3xl font-medium mb-6"
          variants={textVariants}
          custom={1}
        >
          <span className="inline-block mr-2">I build</span>
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 -rotate-1" />
            <span className="relative z-10">web experiences</span>
          </span>
        </motion.div>
        
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
          variants={textVariants}
          custom={2}
        >
          Full-stack developer passionate about creating beautiful, functional applications
        </motion.p>
      </motion.div>

      <motion.div
        variants={textVariants}
        custom={3}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-4"
      >
        <motion.button
          className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToProjects}
        >
          <span className="relative z-10">View My Work</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
        
        <motion.a
          onClick={scrollToContact}
          className="relative overflow-hidden group border-2 border-blue-500 dark:border-purple-500 text-blue-500 dark:text-purple-400 font-bold py-3 px-8 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Contact Me</span>
          <span className="absolute inset-0 bg-blue-500/10 dark:bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8"
      >
        <ChevronDown size={32} className="text-gray-400" />
      </motion.div>
    </div>
  )
}

function About() {
  const skills = [
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Next.js", level: 70 },
    { name: "MongoDB", level: 80 },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">About Me</span>
        </h2>
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            I'm a passionate full-stack developer with experience in building modern web applications. 
            My journey in web development started when I was in college, and since then I've been 
            constantly learning and improving my skills.
          </p>
          
          <p>
            I specialize in creating responsive, user-friendly interfaces with React and Next.js, 
            while also handling backend development with Node.js and MongoDB.
          </p>
          
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source 
            projects, or participating in hackathons to challenge myself.
          </p>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">My Skills</h3>
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                  <span className="text-xs text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <motion.div
        className="relative order-1 md:order-2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative group">
          <motion.div 
            className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          
          <img
            src={DeepakAbout}
            alt="Deepak working"
            className="rounded-xl shadow-2xl w-full h-auto object-cover transform group-hover:-translate-y-1 transition-transform duration-300"
          />
        </div>
        
        <motion.div
          className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-purple-900 rounded-full mr-3">
              <Code className="text-blue-500 dark:text-purple-400" size={20} />
            </div>
            <div>
              <p className="font-bold text-sm">2+ Years</p>
              <p className="text-xs text-gray-500">Experience</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function Education() {
  const educationData = [
    {
      degree: "Bachelor of Technology",
      institution: "Poornima University",
      year: "2023 - 2027",
      description: "Specialized in Computer Science",
      icon: <GraduationCap className="text-blue-500" size={24} />
    },
    {
      degree: "12th RBSE Board",
      institution: "Shri Maheshwari Senior Secondary School",
      year: "2016 - 2023",
      description: "Graduated with distinction",
      icon: <GraduationCap className="text-purple-500" size={24} />
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Education
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          My academic journey and qualifications that have shaped my knowledge and skills.
        </p>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 top-0 hidden md:block" />
        
        <div className="space-y-8 md:space-y-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline dot for desktop */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white dark:border-gray-900 z-10" />
              
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative group">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 dark:bg-purple-600 transform rotate-45 origin-bottom-left translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>
                  
                  <div className="flex items-start mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-purple-900 rounded-lg mr-4">
                      {edu.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{edu.institution}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-200 mb-3">{edu.description}</p>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-purple-900 text-blue-800 dark:text-purple-200 rounded-full">
                    {edu.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const projects = [
    { 
      id: 1, 
      image: "https://res.cloudinary.com/djdi5hkyx/image/upload/v1725260012/Screenshot_2024-09-02_122003_lvnwyf.png",
      title: 'Movie Streaming', 
      description: 'A full-stack movie streaming platform with React, Node.js and MongoDB', 
      link: "https://cineflow.netlify.app/#/",
      icon: <Film className="text-blue-500" size={20} />,
      tags: ['React', 'Node.js', 'MongoDB']
    },
    { 
      id: 2, 
      image: "https://res.cloudinary.com/djdi5hkyx/image/upload/v1722598011/logo-white_cdtrzl.png",
      title: 'Music Streaming', 
      description: 'A full-stack music streaming service with React, Next.js and Node.js', 
      link: "https://echoplay.vercel.app/",
      repo: "https://github.com/mrdeepak125/EchoPlay",
      icon: <Music className="text-purple-500" size={20} />,
      tags: ['Next.js', 'React', 'Node.js']
    },
    { 
      id: 3, 
      image: "https://res.cloudinary.com/djdi5hkyx/image/upload/v1747838222/yzxvozfoam2oxtnqzbbx.png",
      title: 'Text Sharing App', 
      description: 'A real-time text sharing application with end-to-end encryption', 
      link: "https://dtext.vercel.app/",
      repo: "https://github.com/mrdeepak125/text-share",
      icon: <Type className="text-pink-500" size={20} />,
      tags: ['Next.js', 'WebSockets', 'Encryption']
    },
    { 
      id: 4, 
      image: "https://res.cloudinary.com/djdi5hkyx/image/upload/v1747838206/wouolgb7lrdbz1927jou.png",
      title: 'Anime Streaming', 
      description: 'An anime streaming platform with custom video player and recommendations', 
      link: "https://kamiflix.xyz",
      icon: <Film className="text-blue-500" size={20} />,
      tags: ['React', 'Node.js', 'MongoDB']
    }
  ]

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          My Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Here are some of my recent projects. Each one was built to solve a specific problem or explore new technologies.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Project image */}
            <div className="h-48 overflow-hidden relative">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src={project.image} 
                alt={project.title}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Project content */}
            <div className="p-6">
              <div className="flex items-center mb-3">
                <div className="mr-3 p-2 bg-blue-100 dark:bg-purple-900 rounded-lg">
                  {project.icon}
                </div>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              
              <div className="flex space-x-3">
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Live Demo
                </motion.a>
                
                {project.repo && (
                  <motion.a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Code
                  </motion.a>
                )}
              </div>
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
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingCertificate, setViewingCertificate] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://email-server-er04.onrender.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'deepakpuri9190@gmail.com' // Your email address
        }),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCertificate = (certUrl) => {
    setViewingCertificate(certUrl);
  };

  const closeCertificate = () => {
    setViewingCertificate(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Certificate Modal */}
      {viewingCertificate && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button 
              onClick={closeCertificate}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
            <img 
              src={viewingCertificate} 
              alt="Certificate" 
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Let's Connect
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Have a project in mind or want to discuss opportunities? Feel free to reach out!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Contact Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-purple-900 rounded-lg">
                <Mail className="text-blue-500 dark:text-purple-400" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Email</h4>
                <a 
                  href="mailto:deepakpuri9190@gmail.com" 
                  className="text-blue-500 dark:text-purple-400 hover:underline"
                >
                  deepakpuri9190@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-purple-900 rounded-lg">
                <Linkedin className="text-blue-500 dark:text-purple-400" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">LinkedIn</h4>
                <a 
                  href="https://www.linkedin.com/in/deepak-puri-goswami-621054291/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-purple-400 hover:underline"
                >
                  linkedin.com/in/deepak-puri-goswami
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-purple-900 rounded-lg">
                <Github className="text-blue-500 dark:text-purple-400" size={20} />
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">GitHub</h4>
                <a 
                  href="https://github.com/mrdeepak125" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-purple-400 hover:underline"
                >
                  github.com/mrdeepak125
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Send Me a Message</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}