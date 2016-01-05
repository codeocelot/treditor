import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Graph from './components/graph';

import store from './stores/store';
import actions from './actions/actions';

ReactDOM.render(
  <App>
    <Graph store={store} actions={actions} />
  </App>,
  document.getElementById('react-app')
)
