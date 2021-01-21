import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PokemonIndex from './pages/pindex';
// import About from './pages/About';
import NotFound from './NotFound';
import Cart from "./pages/cart";
import PokemonDetails from "./pages/details";

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/about" component={About} /> */}
        <Route exact path="/" component={PokemonIndex} />
        <Route path="/cart" component={Cart} />
        <Route path='/details/:id' component={PokemonDetails} />
        {/* <Route path='/details/' component={PokemonDetails} /> */}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default Routes;