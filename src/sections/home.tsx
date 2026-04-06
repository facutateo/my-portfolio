import type { Language, TranslationKey } from "../translations/translations";
import { GitHub } from "../../public/logos/github";
import { LinkedIn } from "../../public/logos/linkedln";
import { useState } from "react";

type homeProps = {
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>;
    t: (key: TranslationKey) => string;
};

function Home({ t }: homeProps) {
    const [isclicked, setIsClicked] = useState<boolean>(false);
    const handleClick = () => {
    setIsClicked(!isclicked);
    setTimeout(() => {
        setIsClicked(false);
    }, 2000);
    };
    return (
        <div className="h-screen flex flex-col items-center justify-center relative animate-fade-in">
            <div className="flex flex-col items-center">
                <h1 className="text-7xl font-bold">Facundo Tateossian</h1>
                <h1 className="text-6xl font-bold">{t("dev")}</h1>
            </div>
            <div className="flex gap-5 mt-8"> 
                <a href="https://github.com/facutateo" target="_blank" rel="noopener noreferrer" className="hover:animate-jelly">
                    <GitHub className="w-8 h-8"/>
                </a>
                <a href="/CV-Facundo-Tateossian.pdf" download={"CV-Facundo-Tateossian.pdf"} className={`buttondw ${isclicked? "animate-contract-vertically" : "animate-expand-vertically"}`} onClick={handleClick}>{t("download")}</a>
                <a href="https://www.linkedin.com/in/facundo-tateossian/" target="_blank" rel="noopener noreferrer" className="hover:animate-jelly">
                    <LinkedIn className="w-8 h-8"/>
                </a>
            </div>
        </div>
    );
}

export default Home;
