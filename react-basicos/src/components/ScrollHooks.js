import React, { useState, useEffect } from "react";

export default function ScrollHooks() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    //console.log("Moviendo el Scroll");

    const detectarScroll = () => setScrollY(window.pageYOffset);

    window.addEventListener("scroll", detectarScroll);

    return () => window.removeEventListener("scroll", detectarScroll);
  }, [scrollY]); // Especificar parametro de actualizacion (DidUpdate)

  useEffect(() => {
    //console.log("Fase de Montaje");
  }, []); // Component DidMount

  useEffect(() => {
    //console.log("Fase de Actualización");
  }); // Component DidUpdate

  useEffect(() => {
    return () => {
      //console.log("Fase de Desmontaje");
    };
  }); // Component DidUnMount

  return (
    <>
      <h2>Hooks - useEffect y el Ciclo de Vida</h2>
      <p>Scroll Y del Navegador {scrollY}px</p>
    </>
  );
}
