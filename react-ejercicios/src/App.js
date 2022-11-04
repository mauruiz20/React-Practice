import React from "react";
import CrudApi from "./components/CrudApi";
import { CrudApp } from "./components/CrudApp";

function App() {
  return (
    <div>
      <h1>Ejercicios con React</h1>
      <hr />
      <CrudApi />
      <hr />
      <CrudApp />
    </div>
  );
}

export default App;
