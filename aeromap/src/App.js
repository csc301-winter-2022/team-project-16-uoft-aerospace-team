import NavBar from './components/NavBar';
import { Routes, Route,} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import PlannerPage from './components/PlannerPage';
import FlightLogPage from './components/FlightLogPage';

import appStyle from './styles/appStyle';

const App = () => {
  return(
      <div style={appStyle}>
        <NavBar />

        <Routes> 
          <Route path="/" exact element={<Dashboard />}/>
          <Route path="/PlannerPage" exact element={<PlannerPage />}/>
          <Route path="/FlightLogPage" exact element={<FlightLogPage />} />
        </Routes>
      </div>
  );
}

export default App