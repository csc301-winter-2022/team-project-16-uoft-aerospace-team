import { Routes, Route,} from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import SitePlanner from './components/SitePlanner';
import FlightLogPage from './components/FlightLogPage';
import FlightPlanner from './components/FlightPlanner';

import appStyle from './styles/appStyle';

const create_site = () => [];

const create_flight = () => [];

const App = () => {

  const path = 'http://localhost:3001/api/'

  fetch(`${path}login`)

  return(
      <div style={appStyle}>
        <NavBar />

        <Routes> 
          <Route path="/" exact element={<Dashboard path={path}/> }/>
          <Route path="/add-site" exact element={<SitePlanner create_site={create_site} path={path}/>}/>
          <Route path="/add-flight" exact element={<FlightPlanner create_flight={create_flight} path={path}/>}/>
          <Route path="/log" exact element={<FlightLogPage path={path}/>} />
        </Routes>
      </div>
  );
}

export default App