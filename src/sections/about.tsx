import type { Language, TranslationKey } from "../translations/translations";
import useActiveSection from "../hooks/useActiveSection";

type aboutProps = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: (key: TranslationKey) => string;
};


function About({ t }: aboutProps) {
  const activeSection = useActiveSection(["about","skills", "projects", "contact"]);
  return (
    <div className={`h-140 flex-col ${activeSection === "about"?'animate-fade-in-down':'animate-fade-out-up'}`} id="about">
      <div>
        <h1 className="text-4xl font-bold justify-self-center">{t("about")}</h1>
      </div>
      <div className="flex-col p-8 rounded-lg shadow-lg w-auto h-auto mt-10 justify-self-center" id="presentationcard">
        <h1 className="text-2xl underline">{t("presentation")}</h1>
        <p className="mt-4">{t("h")}</p>
        <h1 className="text-2xl mt-4 underline">{t("education")}</h1>
        <div className="ml-4 mt-4">
        <li>{t("deseduc1")}</li>
        <li>{t("deseduc2")}</li>
        </div>
        <h1 className="text-2xl underline mt-4">{t("laboralexpirence")}</h1>
        <p className="mt-4">{t("experiencedes")}</p>
        </div>
    </div>
  );
}

export default About;