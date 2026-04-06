import SkillCard from "../components/skillcard";
import type { Language, TranslationKey } from "../translations/translations";
import useActiveSection from "../hooks/useActiveSection";

type skillsProps = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: (key: TranslationKey) => string;
};



function Skills({ t }: skillsProps) {
    const skills = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Git", "Github", "TailwindCSS","Figma"];
    const doubleSkills = [...skills, ...skills];
    const activeSection = useActiveSection(["about","skills", "projects", "contact"]);
    return (
        <div className={`h-140 flex-col items-center justify-center ${activeSection === "skills"?'animate-fade-in-down':'animate-fade-out-up'}`}>
            <div className="justify-self-center p-20">
            <h1 className="text-5xl">{t("my")} {t("skills")}</h1>
            </div>
        <div className=" flex items-center overflow-hidden justify-end gap-10 carrousel-container h-60">
            <div className="flex flex-nowrap gap-10" id="carrousel">
                {doubleSkills.map((skill, index) => (
                    <SkillCard key={`${skill}-${index}`} skill={skill} />
                ))}
            </div>
        </div>
        </div>
    );
}

export default Skills;
