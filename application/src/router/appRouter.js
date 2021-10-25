import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } from '../components';
import {connect} from 'react-redux'

const AppRouter = (props) => {
  return (
    <Router>
      {props.auth.token === null ? (
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
        ) : (
          <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/order" exact component={OrderForm} />
          <Route path="/view-orders" exact component={ViewOrders} />
          <Redirect to="/" />
        </Switch>
        )
        }

    </Router>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AppRouter);
