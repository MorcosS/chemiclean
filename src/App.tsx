import React from 'react';
import { Route, Switch, Redirect, Router } from "react-router-dom";
import Products from "./pages/products/Products";
import history from "./config/history"
import './App.css';
import AddProduct from './components/product/NewProduct';

const App: React.FC = () => {
  return (
    <Router history={history}>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to="/products" />}
              />
              <Route exact path="/products" component={Products} />
              <Route exact path="/products/new" component={AddProduct} />
            </Switch>
          </Router>
  );
}

export default App;
