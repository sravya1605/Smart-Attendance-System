import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {user ? <Dashboard setUser={setUser} /> : <Login setUser={setUser} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;