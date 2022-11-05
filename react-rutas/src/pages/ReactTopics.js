import React from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const Topic = () => {
  let { topic } = useParams();

  return (
    <div>
      <h4>{topic}</h4>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
        sunt esse eaque rem tempore! Repellat quis quos at facilis vitae
        cupiditate aliquam, dignissimos fugit provident corporis deserunt.
        Voluptate, doloremque aspernatur!
      </p>
    </div>
  );
};

const ReactTopics = () => {
  // let match = useRouteMatch();
  // console.log(match);

  let { path, url } = useRouteMatch();

  return (
    <div>
      <h3>Temas de React</h3>
      <ul>
        <li>
          <Link to={`${url}/jsx`}>JSX</Link>
        </li>
        <li>
          <Link to={`${url}/props`}>Props</Link>
        </li>
        <li>
          <Link to={`${url}/estado`}>Estado</Link>
        </li>
        <li>
          <Link to={`${url}/componentes`}>Componente</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h4>Elige un tema de React</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
            dicta aperiam itaque pariatur, nisi laborum deserunt quidem,
            molestias, porro quo dolore suscipit! Hic quae labore illum odio
            mollitia est quos?
          </p>
        </Route>
        <Route path={`${path}/:topic`} component={Topic} />
      </Switch>
    </div>
  );
};

export default ReactTopics;
