import Navbar from './components/navbar'
import type {Language,TranslationKey } from './translations/translations'
import { translations } from './translations/translations'
import { useEffect, useState } from 'react'
import About from './sections/about'
import Contact from './sections/contact'
import Proyects from './sections/proyects'
import Skills from './sections/skills'
import Home from './sections/home'
import './App.css'
import Scene from './components/scene'
import useActiveSection from './hooks/useActiveSection'
import Footer from './components/footer'


function App() {
  const getInitialLanguage = (): Language => {
    const storedLanguage = localStorage.getItem('lenguage')
    if (storedLanguage === 'es' || storedLanguage === 'en') return storedLanguage

    const browserLanguage = navigator.language.toLowerCase()
    if (browserLanguage.includes('es')) return 'es'
    return 'en'
  }

  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem('lenguage', language)
  }, [language])

  const t = (key: TranslationKey) => translations[language][key]
  const activeSection = useActiveSection(["about", "skills", "projects", "contact"]);
  
  return (
    <>
      <div className='fixed w-full backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 z-50'>
      <Navbar language ={language} setLanguage= {setLanguage} t={t} />
      </div>
      <section id='home'>
      <Home language={language} setLanguage={setLanguage} t={t}/>
      </section>
      <div className={`fixed inset-0 pointer-events-none grid items-center justify-self-start ${activeSection === "home" ? "animate-fade-out" : "animate-fade-in-right"}`}>
      <div className="w-[400px] h-[400px]">
        <Scene />
      </div>
    </div>

    <main className="relative transition-all duration-1000 ease-in-out pl-[400px] pr-[100px]">
      <section id='about' >
      <About language={language} setLanguage={setLanguage} t={t} />
      </section>
      <section id='skills'>
      <Skills language={language} setLanguage={setLanguage} t={t} />
      </section>
      <section id='projects'>
      <Proyects language={language} setLanguage={setLanguage} t={t}/>
      </section>
      <section id='contact'>
      <Contact language={language} setLanguage={setLanguage} t={t}/>
      </section>
        <Footer/>
      </main>
    </>
  )
}

export default App
