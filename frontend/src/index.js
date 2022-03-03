import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { setIndexStyle } from './styles/indexStyle'

setIndexStyle();

ReactDOM.render(
  <HashRouter> 
    <App /> 
  </HashRouter>,
  document.getElementById('root')
);