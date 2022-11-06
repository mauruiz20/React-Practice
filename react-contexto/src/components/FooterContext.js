import React, { useContext } from "react";
import LenguageContext from "../context/LenguageContext";
import ThemeContext from "../context/ThemeContext";

const FooterContext = () => {
  const { theme } = useContext(ThemeContext);
  const { texts } = useContext(LenguageContext);

  return (
    <footer className={theme}>
      <h4>{texts.footerTitle}</h4>
    </footer>
  );
};

export default FooterContext;
