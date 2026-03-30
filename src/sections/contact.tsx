import type { Language , TranslationKey } from "../translations/translations";
import useActiveSection from "../hooks/useActiveSection";
import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser'

type contactProps = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: (key: TranslationKey) => string;
};



function Contact({ t }: contactProps) {
  const activesection = useActiveSection(["about", "skills", "projects", "contact"])
  const form = useRef<HTMLFormElement>(null)
  const [isSending, SetIsSending]=useState(false)
  const handleSend = (e: React.FormEvent) =>{
    e.preventDefault();
    if(!form.current) return;
    SetIsSending(true);
    emailjs.sendForm('service_k2t0wnk','template_dyuhpud',form.current,'vSwrrQaUFp83cgZ9J').then(
      ()=>{
        form.current?.reset();
        
      })
      .catch((error)=>{
        console.error("Error", error)
      }
    )
    .finally(() => SetIsSending(false));
  };

  return (
    <div className={`h-170 flex-col justify-self-center justify-center ${activesection === "contact"? "animate-fade-in-down": "animate-fade-out-up"}`}>
            <div className="justify-self-center p-20">
            <h1 className="text-5xl">{t("contactme")}</h1>
            </div>
      <form 
        ref={form} 
        onSubmit={handleSend}
        className="w-auto flex-col divcontac rounded justify-items-center items-center p-10"
      >
        <div>
        <input type="text" name="user_name" className="inputcont " placeholder={t("name")} required/>
        </div>
        <div>
        <input type="text" name="user_email" className="inputcont" placeholder="email" required/>
        </div>
        <div className="">
        <textarea className="inputcont h-50" name="message" placeholder={t("text")} rows={4} required/>
        </div>
        <div>
        <button type="submit" disabled={isSending}
            className={isSending ? "cursor-not-allowed animate-contract-vertically" : "animate-expand-vertically"}>{t("send")}</button>
        </div>
      </form>
    </div>
  );
}

export default Contact;