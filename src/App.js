import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './routes/Home'
import Edit from './routes/Edit'
import Enter from './routes/Enter'

function App() {
  return (
    <Router>
      <div className='App'>
        <Route exact path="/" component={Home} />
        <Route exact path="/edit" component={Edit} />
        <Route exact path="/enter" component={Enter} />
        {/* <Route exact path="/about" component={About} />
        <Route exact path="/online" component={Online} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/settings" component={Settings} /> */}

        {/* <OnlineAsync.Prefetch />
        <GameAsync.Prefetch />
        <SettingsAsync.Prefetch /> */}
      </div>
    </Router>
  );
}

export default App;
