import { createContext, useContext, useEffect, useMemo, useState } from "react"

const LangContext = createContext(null)

const TITLES = {
  en: "Angket — Check Before You Trust",
  km: "Angket — ពិនិត្យមុនពេលជឿ",
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState("km")

  useEffect(() => {
    document.documentElement.lang = lang === "km" ? "km" : "en"
    document.documentElement.classList.toggle("km", lang === "km")
    document.title = TITLES[lang]
  }, [lang])

  const value = useMemo(() => {
    const t = (obj) => obj[lang]
    return { lang, setLang, t }
  }, [lang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
