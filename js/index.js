import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Todo from './components/todo';
import Graph from './components/graph';

ReactDOM.render(
  <App>
    <Graph/>
  </App>,
  document.getElementById('react-app')
)
