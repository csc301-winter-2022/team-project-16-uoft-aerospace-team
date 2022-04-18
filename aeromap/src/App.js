import { Routes, Route, } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import InfoPage from './components/InfoPage';
import FlightPlanner from './components/FlightPlanner';
import AddSite from './components/AddSite';
import ViewFlight from './components/ViewFlight';

import appStyle from './styles/appStyle';

const path = 'http://localhost:3001/api/'

const App = () => {

  return(
      <div style={appStyle}>
        <NavBar />

        <Routes> 
          <Route path="/" exact element={<Dashboard path={path}/> }/>
          <Route path="/add-site" exact element={<AddSite path={path}/>}/>
          <Route path="/add-flight" exact element={<FlightPlanner />}/>
          <Route path="/info" exact element={<InfoPage />} />
          <Route path="/view-flight/:fid" exact element={<ViewFlight path={path}/>} />
        </Routes>
      </div>
  )
}

export default App