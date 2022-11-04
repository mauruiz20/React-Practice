import React, { useState } from "react";
import SelectList from "./SelectList";

const SelectsAnidados = () => {
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [suburb, setSuburb] = useState("");

  return (
    <div>
      <h2>Selects Anidados</h2>
      <h3>Argentina</h3>
      <SelectList
        title="provincias"
        url={`https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre&max=100`}
        handleChange={(e) => {
          setState(e.target.value);
        }}
      />
      {state && (
        <SelectList
          title="departamentos"
          url={`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${state}&campos=id,nombre&max=100`}
          handleChange={(e) => {
            setTown(e.target.value);
          }}
        />
      )}
      {town && (
        <SelectList
          title="localidades"
          url={`https://apis.datos.gob.ar/georef/api/localidades?provincia=${state}&departamento=${town}&max=5000`}
          handleChange={(e) => {
            setSuburb(e.target.value);
          }}
        />
      )}
      <pre>
        <code>
          {state} - {town} - {suburb}
        </code>
      </pre>
    </div>
  );
};

export default SelectsAnidados;
