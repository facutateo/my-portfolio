import type React from "react";
import BotonLenguage from "./boton-lenguage";
import ButtonMode from "./button-mode";
import type { Language, TranslationKey } from "../translations/translations";
import  useActiveSection  from "../hooks/useActiveSection";

const SECTION_IDS = ["about", "skills", "projects", "contact"] as const;

type NavbarProps = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: (key: TranslationKey) => string;
};

function Navbar({ language, setLanguage, t }: NavbarProps) {
  const activeSection = useActiveSection(SECTION_IDS);

  const getLinkClass = (sectionId: string) => {
    return activeSection === sectionId
      ? "!text-blue-500 drop-shadow-[0_0_6px_#3b82f6] dark:drop-shadow-[0_0_8px_#3b82f6] animate-pulsing animate-iteration-count-infinite"
      : "";
  };
  return (
    <nav className= "p-2 gap-2 flex items-center justify-center animate-fade-in-down shadow-blue-800/30 shadow-md sticky top-0 z-50" id="navbar">
      <div className="absolute left-4 top-4 w-24 h-24 ">
        <a href="#home">
        <img src="/ft-full.png"alt="logo" className="hover:animate-pulse hover:animate-iteration-count-infinite cursor-pointer" />
        </a>
      </div>
        <a className={`p-4 hover:animate-pulsing hover:animate-iteration-count-infinite cursor-pointer ${getLinkClass("about")}`} href="#about">{t("about")}</a>
        .
        <a className={`p-4 hover:animate-pulsing hover:animate-iteration-count-infinite cursor-pointer ${getLinkClass("skills")}`} href="#skills">{t("skills")}</a>
        .
        <a className={`p-4 hover:animate-pulsing hover:animate-iteration-count-infinite cursor-pointer ${getLinkClass("projects")}`} href="#projects">{t("projects")}</a>
        .
        <a className={`p-4 hover:animate-pulsing hover:animate-iteration-count-infinite cursor-pointer ${getLinkClass("contact")}`} href="#contact">{t("contact")}</a>
        <div className="absolute right-4 top-5 flex items-center gap-2 px-2 py-1.5 rounded-xl backdrop-blur-lg borde shadow-lg shadow-blue-800/20" id="settigns-div" >
            <ButtonMode />
            <BotonLenguage language={language} setLanguage={setLanguage} />
        </div>
    </nav>
  );
}
export default Navbar;
