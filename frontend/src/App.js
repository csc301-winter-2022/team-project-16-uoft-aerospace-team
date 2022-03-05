import * as services from './backend/controllers/services'
import NavBar from './components/NavBar';
import { Routes, Route,} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import PlannerPage from './components/SitePlanner';
import FlightLogPage from './components/FlightLogPage';
import AddFlight from './components/FlightPlanner';

import appStyle from './styles/appStyle';

const App = () => {

  services.login('max', 'sucks');

  return(
      <div style={appStyle}>
        <NavBar />

        <Routes> 
          <Route path="/" exact element={<Dashboard />}/>
          <Route path="/add-site" exact element={<PlannerPage />}/>
          <Route path="/add-flight" exact element={<AddFlight />}/>
          <Route path="/log" exact element={<FlightLogPage />} />
        </Routes>
      </div>
  );
}

export default App