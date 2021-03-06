import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Games from "./Games";

function App() {
  return (
    <div className='container'>
      <Router>
        <Header/>
        <Route path='/' exact component={Home}/>
        <Route path='/about' exact component={About}/>
        <Route path='/games' component={Games}/>
      </Router>
    </div>
  )
}

export default App;
