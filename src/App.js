import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import Characters from './components/Characters';
import SingleCharacter from './components/SingleCharacter';

const App = ()=> {
  const [progress, setProgress] = useState(0);
  const[name,setName]=useState("");

  const fetchChar =async(name)=>{ 
    setName(name);
  }
 
    return (
      <div>
        <Router>
        <NavBar fetchChar={fetchChar}/> 
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />
        <Switch>
          <Route exact path='/'><Characters key={name} setProgress={setProgress}></Characters></Route>
          <Route exact path='/name'><SingleCharacter key={name} name={name} setProgress={setProgress}></SingleCharacter></Route>
        </Switch>
        </Router>
      </div>
    )
 
}

export default App;