import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { initialize_backend } from './services/service';
import './styles/App.css';

initialize_backend()

ReactDOM.render(
  <HashRouter> 
    <App /> 
  </HashRouter>,
  document.getElementById('root')
);