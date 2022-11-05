import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Acerca from "../pages/Acerca";
import Contacto from "../pages/Contacto";
import Error404 from "../pages/Error404";
import MenuConceptos from "./MenuConceptos";

const ConceptosBasicos = () => {
  return (
    <div>
      <h2>Conceptos Básicos</h2>
      <Router>
        <MenuConceptos />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/acerca" component={Acerca} />

          <Route exact path="/contacto" component={Contacto} />

          <Route path="*" component={Error404} />
        </Switch>
      </Router>
    </div>
  );
};

// const ConceptosBasicos = () => {
//   return (
//     <div>
//       <h2>Conceptos Básicos</h2>
//       <Router>
//         <Switch>
//           <Route exact path="/">
//             <h3>Home</h3>
//             <p>Bienvenidos al tema de las Rutas en React</p>
//           </Route>
//           <Route exact path="/acerca" component={Acerca} />

//           <Route exact path="/contacto" component={Contacto} />
//         </Switch>
//       </Router>
//     </div>
//   );
// };

export default ConceptosBasicos;
