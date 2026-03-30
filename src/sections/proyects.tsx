import type { Language, TranslationKey } from "../translations/translations";
import useActiveSection from "../hooks/useActiveSection";
import ProjectCard from "../components/proyect-card";

type proyectsProps = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: (key: TranslationKey) => string;
};




function Proyects({ t,language,setLanguage }: proyectsProps) {
    const activeSection = useActiveSection(["about","skills", "projects", "contact"]);
    return (
        <div className={`h-140 flex-col items-center justify-center ${activeSection === "projects"?'animate-fade-in-down':'animate-fade-out-up'}`}>
            <h1 className="text-4xl font-bold justify-self-center">{t("my")} {t("projects")}</h1>
            <div className="flex gap-10 mt-10 justify-center">
            <ProjectCard t={t} language={language} setLanguage={setLanguage} project="projectrecipes" projectdescription="recipedes"/>
            <ProjectCard t={t} language={language} setLanguage={setLanguage} project="todolist" projectdescription="tododes"/>
            </div>
        </div>
    );
}

export default Proyects;