import React from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { LenguageProvider } from "../context/LenguageContext";
import FooterContext from "./FooterContext";
import HeaderContext from "./HeaderContext";
import MainContext from "./MainContext";
import { AuthProvider } from "../context/AuthContext";

const MyPageContext = () => {
  return (
    <div className="my-page">
      <AuthProvider>
        <ThemeProvider>
          <LenguageProvider>
            <HeaderContext />
            <MainContext />
            <FooterContext />
          </LenguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
};

export default MyPageContext;
