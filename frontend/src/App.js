import { Routes, Route,} from 'react-router-dom';

import * as services from './backend/controllers/services';

import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import SitePlanner from './components/SitePlanner';
import FlightLogPage from './components/FlightLogPage';
import FlightPlanner from './components/FlightPlanner';

import appStyle from './styles/appStyle';

const App = () => {

  services.login('max', 'sucks');

  return(
      <div style={appStyle}>
        <NavBar />

        <Routes> 
          <Route path="/" exact element={<Dashboard />}/>
          <Route path="/add-site" exact element={<SitePlanner create_site={services.create_site} />}/>
          <Route path="/add-flight" exact element={<FlightPlanner create_flight={services.create_flight}/>}/>
          <Route path="/log" exact element={<FlightLogPage />} />
        </Routes>
      </div>
  );
}

export default App