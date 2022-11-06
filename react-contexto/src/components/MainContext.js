import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import LenguageContext from "../context/LenguageContext";
import ThemeContext from "../context/ThemeContext";

const MainContext = () => {
  const { theme } = useContext(ThemeContext);
  const { texts } = useContext(LenguageContext);
  const { auth } = useContext(AuthContext);
  return (
    <main className={theme}>
      {auth ? <p>{texts.mainHello}</p> : <p>{texts.mainWelcome}</p>}

      <p>{texts.mainContent}</p>
    </main>
  );
};

export default MainContext;
