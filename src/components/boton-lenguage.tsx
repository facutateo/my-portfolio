import type React from "react"
import type { Language } from "../translations/translations"

type BotonLenguageProps = {
    language: Language
    setLanguage: React.Dispatch<React.SetStateAction<Language>>
}

function BotonLenguage({ language, setLanguage }: BotonLenguageProps) {

    const toggleLenguage = () => {
        setLanguage((prevLenguage) => (prevLenguage === 'es' ? 'en' : 'es'))
    }
    return (
        <label className="relative cursor-pointer hover:animate-squeeze hover:animate-iteration-count-infinite">
        <input type="checkbox" className="peer sr-only " checked={language === 'es'} onChange={toggleLenguage} />
            <div className="w-4 select-none">
                <img src={language === 'es' ? 'SPANISH.svg' : 'ENGLISH.svg'} alt= {language === 'es' ? 'es' : 'en'}/>
            </div>
        </label>
    )
}

export default BotonLenguage
