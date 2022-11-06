import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import LenguageContext from "../context/LenguageContext";
import ThemeContext from "../context/ThemeContext";

const HeaderContext = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  const { texts, handleLenguage } = useContext(LenguageContext);
  const { auth, handleAuth } = useContext(AuthContext);
  return (
    <header className={theme}>
      <h2>{texts.headerTitle}</h2>
      <h3>{texts.headerSubtitle}</h3>
      <select name="language" onChange={handleLenguage}>
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
      <input
        type="radio"
        name="theme"
        id="light-context"
        onClick={handleTheme}
        value="light"
      />
      <label htmlFor="light-context">{texts.headerLight}</label>
      <input
        type="radio"
        name="theme"
        id="dark-context"
        onClick={handleTheme}
        value="dark"
      />
      <label htmlFor="dark-context">{texts.headerDark}</label>
      <button onClick={handleAuth}>
        {auth ? texts.buttonLogout : texts.buttonLogin}
      </button>
    </header>
  );
};

export default HeaderContext;
