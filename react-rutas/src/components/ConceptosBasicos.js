import {
  BrowserRouter as Router,
  HashRouter,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../pages/Home";
import Acerca from "../pages/Acerca";
import Contacto from "../pages/Contacto";
import Error404 from "../pages/Error404";
import MenuConceptos from "./MenuConceptos";
import Usuario from "../pages/Usuario";
import Productos from "../pages/Productos";
import ReactTopics from "../pages/ReactTopics";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

const ConceptosBasicos = () => {
  return (
    <div>
      <h2>Hash Router</h2>
      <HashRouter>
        <MenuConceptos />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/acerca" component={Acerca} />

          <Route exact path="/contacto" component={Contacto} />

          <Route exact path="/usuario/:username" component={Usuario} />

          <Route exact path="/productos" component={Productos} />

          <Route exact path="/about">
            <Redirect to="/acerca" />
          </Route>

          <Route path="/contact">
            <Redirect to="/contacto" />
          </Route>

          <Route path="/react" component={ReactTopics} />

          <Route exact path="/login" component={Login} />

          {/* <Route exact path="/dashboard" component={Dashboard} /> */}

          <PrivateRoute exact path="/dashboard" component={Dashboard} />

          <Route path="*" component={Error404} />
        </Switch>
      </HashRouter>
      <hr />
      <h2>Conceptos Básicos</h2>
      <Router>
        <MenuConceptos />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/acerca" component={Acerca} />

          <Route exact path="/contacto" component={Contacto} />

          <Route exact path="/usuario/:username" component={Usuario} />

          <Route exact path="/productos" component={Productos} />

          <Route exact path="/about">
            <Redirect to="/acerca" />
          </Route>

          <Route path="/contact">
            <Redirect to="/contacto" />
          </Route>

          <Route path="/react" component={ReactTopics} />

          <Route exact path="/login" component={Login} />

          {/* <Route exact path="/dashboard" component={Dashboard} /> */}

          <PrivateRoute exact path="/dashboard" component={Dashboard} />

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
