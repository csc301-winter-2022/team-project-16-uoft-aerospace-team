import { Routes, Route,} from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import SitePlanner from './components/SitePlanner';
import InfoPage from './components/InfoPage';
import FlightPlanner from './components/FlightPlanner';

import appStyle from './styles/appStyle';

const path = 'http://localhost:3001/api/'

const create_site = () => [];

const create_flight = async (date, siteName, pilotName, droneInfo, notes) => {
  const res = await fetch (`${path}create-flight`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({date: date, sitename: siteName, pilot: pilotName, drone: droneInfo, notes: notes})
  })
  return res;
};

const App = () => {

  fetch(`${path}login`)

  return(
      <div style={appStyle}>
        <NavBar />

        <Routes> 
          <Route path="/" exact element={<Dashboard path={path}/> }/>
          <Route path="/add-site" exact element={<SitePlanner create_site={create_site} path={path}/>}/>
          <Route path="/add-flight" exact element={<FlightPlanner create_flight={create_flight} path={path}/>}/>
          <Route path="/info" exact element={<InfoPage path={path}/>} />
        </Routes>
      </div>
  );
}

export default App