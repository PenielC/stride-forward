import React, {Component} from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './layout/Home';
import Landing from './layout/Landing';

class App extends Component { 
  render() {   
    return (
      <Router>
        <div className="App">  
          <Home />
          <Switch>  
            <Route path='/home'><Landing/></Route>               
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
