import React from 'react';
import {Route,Switch} from 'react-router-dom';

import './App.scss';
import IndividualStateData from './components/DataToDisplay/IndividualStateData';
import AppNavigation from './components/UI/AppNavigation';
import CountryDataPage from './pages/CountryDataPage';
import StateDataPage from './pages/StateDataPage';

function App() 
{
  return (
    <div className="container">
      <AppNavigation></AppNavigation>
      <Switch>
        <Route path="/" exact><CountryDataPage/></Route>
        <Route path="/country-data" exact><CountryDataPage/></Route>
        <Route path="/state-data" exact><StateDataPage/></Route>
        <Route path="/state-data/:stateid"><IndividualStateData/></Route>
        <Route path="*"><p>No such page found</p></Route>
      </Switch>
    </div>
  );
}

export default App;
