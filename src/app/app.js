import React from 'react';
import routes from '~/routes';
import withStore from '~/hocs/withStore.js';
import styles from './app.module.css';
import { NavLink, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RoutesMap } from '~/routes';

class App extends React.Component {
  render() {
    return (
      <Router>
        <header>
          <div className="container">
            <hr/>
            <div className="row justify-content-between">
              <div className="col col-4">
                <div className="alert alert-success">Mobile Phone Store</div>
              </div>
              <div className="col col-3">
                <strong>
                  In Cart:
                  <br/>
                  Total:
                </strong>
              </div>
            </div>
            <hr/>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col col-3">
              <ul className="list-group">
                <li className="list-group-item">
                  <NavLink to={RoutesMap.home} exact activeClassName={styles.active}>
                    Home
                  </NavLink>
                </li>
                <li className="list-group-item">
                  <NavLink to={RoutesMap.cart} activeClassName={styles.active}>
                    Cart
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col col-9">
              <Switch>
                {routes.map(route =>
                  <Route
                    path={route.url}
                    component={route.component}
                    exact={route.exact}
                    key={route.url}
                  />)}
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default withStore(App);