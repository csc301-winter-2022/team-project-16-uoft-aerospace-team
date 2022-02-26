import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Plots from './components/Plots';
import Dash from './components/Dash';
import Log from './components/Log';

const App = () => {
  return(
    
      <div>
        <NavBar /> 
        <Routes> 
          <Route path="/" exact element={<Dash/>}/> {/*max is the best*/}
          <Route path="/plots" exact element={<Plots/>}/>
          <Route path="/logs" exact element={<Log/>}/>
        </Routes>
      </div>
  );
}

export default App