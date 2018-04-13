import React from 'react';
import { Route, Link } from 'react-router-dom';
import ToDoList from './Components/ToDoList';
import Login from './Components/Login';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/to-do-list" component={ToDoList} />
    </main>
  </div>
);

export default App;
