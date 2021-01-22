import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PokemonIndex from './pages/pindex';
import NotFound from './NotFound';
import Bag from "./pages/bag";
import PokemonDetails from "./pages/details";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PokemonIndex} />
        <Route path="/bag" component={Bag} />
        <Route path='/details/:id' component={PokemonDetails} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default Routes;