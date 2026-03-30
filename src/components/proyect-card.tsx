import type { Language, TranslationKey } from "../translations/translations";

type ProjectCardProps = {
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>;
    t: (key: TranslationKey) => string;
    project: TranslationKey;
    projectdescription: TranslationKey;
};

function ProjectCard({ t,project,projectdescription }: ProjectCardProps) {
    let currentproject = "";
    let curretimage = "";
    switch (project) {
        case "todolist":
            currentproject = "https://facutateo.github.io/to-do-list/";
            curretimage = "todolist-image.png";
            break;
        case "projectrecipes":
            currentproject = "https://facutateo.github.io/recipes-page";
            curretimage = "recipe-image.png";
            break;
    }
    return (
        <div className="project-card rounded-lg p-4 w-100 h-auto justify-items-center text-center hover:animate-scale proyect-card">
        <a href={currentproject} className="view" target="_blank" rel="noopener noreferrer">
            <h2 className="text-2xl font-bold mb-4">{t(project)}</h2>
            <img src={curretimage} alt={`${t(project)} image`} className="rounded"/>
            <p className="mb-4 mt-4 text-xs text-left pdes">{t(projectdescription)}</p>
        {t("view")}</a>
        </div>
    );
}

export default ProjectCard;