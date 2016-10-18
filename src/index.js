import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

import App from './App';

import Games from './pages/games';
import Ranking from './pages/ranking';
import Group from './pages/group';
import Profile from './pages/profile';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <Router history={hashHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={Games}></IndexRoute>
          <Route path="ranking" component={Ranking}></Route>
          <Route path="group" component={Group}></Route>
          <Route path="profile" component={Profile}></Route>
      </Route>
  </Router>,
  document.getElementById('root')
);
