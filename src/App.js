import { Provider } from 'react-redux'
import Routes from '../src/routes'
import store from '../src/config/redux/store'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
