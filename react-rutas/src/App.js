import ConceptosBasicos from "./components/ConceptosBasicos";
import CrudApi from "./components/CrudApi";
import SelectsAnidados from "./components/SelectsAnidados";

function App() {
  return (
    <div>
      <h1>React Router</h1>
      <a
        href="https://v5.reactrouter.com/web/guides/quick-start"
        target="_blank"
        rel="noreferrer"
      >
        Documentación
      </a>
      <hr />
      {/* <SelectsAnidados /> */}
      <hr />
      <CrudApi />
      <hr />
      {/* <ConceptosBasicos /> */}
      <hr />
    </div>
  );
}

export default App;
