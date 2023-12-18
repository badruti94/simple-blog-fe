import { Provider } from 'react-redux'
import Routes from '../src/routes'
import logo from './logo.svg';
import './App.css';
import { store } from './config/redux/store';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
