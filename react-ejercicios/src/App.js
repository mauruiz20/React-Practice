import React from "react";
import ContactForm from "./components/ContactForm";
import CrudApi from "./components/CrudApi";
import { CrudApp } from "./components/CrudApp";
import SelectsAnidados from "./components/SelectsAnidados";
import SongSearch from "./components/SongSearch";

function App() {
  return (
    <div>
      <h1>Ejercicios con React</h1>
      <hr />
      <ContactForm />
      <hr />
      <SelectsAnidados />
      <hr />
      <SongSearch />
      <hr />
      <CrudApi />
      <hr />
      <CrudApp />
    </div>
  );
}

export default App;
