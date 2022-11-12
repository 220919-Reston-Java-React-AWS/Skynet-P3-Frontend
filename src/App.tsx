import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext, User } from './context/user.context';
import { AppRoutes } from './router/AppRoutes';

function App() {
  let [user, setUser] = useState<User | undefined>();
  const value = { user, setUser };

  useEffect(() => {
    let loggedInUser = window.sessionStorage.getItem('userData');
    if (loggedInUser !== null) setUser(JSON.parse(loggedInUser));
  }, [setUser]);

  return (
    <UserContext.Provider value={value}>
      <Router>
        <AppRoutes></AppRoutes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
