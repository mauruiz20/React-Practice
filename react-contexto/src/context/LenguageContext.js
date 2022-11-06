import { createContext, useState } from "react";

const LenguageContext = createContext();

const initialLenguage = "es";

const translations = {
  es: {
    headerTitle: "Mi aplicación CON Context API",
    headerSubtitle: "Mi cabecera",
    headerLight: "Claro",
    headerDark: "Oscuro",
    buttonLogin: "Iniciar Sesión",
    buttonLogout: "Cerrar Sesión",
    mainWelcome: "Bienvenid@ invitad@",
    mainHello: "Hola Usuari@",
    mainContent: "Mi contenido principal",
    footerTitle: "Mi pié de página",
  },
  en: {
    headerTitle: "My application WITH Context API",
    headerSubtitle: "My header",
    headerLight: "Light",
    headerDark: "Dark",
    buttonLogin: "Login",
    buttonLogout: "Logout",
    mainWelcome: "Welcome Guest",
    mainHello: "Hello User",
    mainContent: "My main content",
    footerTitle: "My footer",
  },
};

const LenguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(initialLenguage);
  const [texts, setTexts] = useState(translations[language]);

  const handleLenguage = (e) => {
    if (e.target.value === "es") {
      setLanguage("es");
      setTexts(translations.es);
    } else {
      setLanguage("en");
      setTexts(translations.en);
    }
  };

  const data = { texts, handleLenguage };

  return (
    <LenguageContext.Provider value={data}>{children}</LenguageContext.Provider>
  );
};

export { LenguageProvider };
export default LenguageContext;
