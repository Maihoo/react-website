import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PageLayout from "./components/pageLayout";

import App          from './App';
//import Gallery      from "./pages/gallery";
import About        from "./pages/about";
import Models       from "./pages/models";
import Chess        from "./pages/chess";
import Gravity      from "./pages/gravity";
import TowerDefense from "./pages/towerdefense";
import GoL          from "./pages/GoL";
import Tetris       from "./pages/Tetris";
//import Tuner        from "./pages/Tuner";
import Playground   from "./pages/playground";
import Privacy      from "./pages/privacy";
import Contact      from "./pages/contact";

/*
          <Route path="/gallery">
            <Gallery/>
          </Route>
          <Route path="/Tuner">
            <Tuner/>
          </Route>
*/

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <PageLayout>
          <Route path="/chess">
            <Chess/>
          </Route>
          <Route path="/gravity">
            <Gravity/>
          </Route>
          <Route path="/towerdefense">
            <TowerDefense/>
          </Route>
          <Route path="/GoL">
            <GoL/>
          </Route>
          <Route path="/Tetris">
            <Tetris/>
          </Route>
          <Route path="/playground">
            <Playground/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/models">
            <Models/>
          </Route>
          <Route path="/privacy">
            <Privacy/>
          </Route>
          <Route path="/contact">
            <Contact/>
          </Route>

          {/* FALLBACK */}
          <Route path="/" exact={true}>
            <App />
          </Route>
        </PageLayout>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

