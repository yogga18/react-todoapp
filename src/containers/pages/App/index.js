import './App.css';

// React Router
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

// Pages
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';


// Redux
import { Provider } from 'react-redux';
import { store } from '../../../config/redux';
import Todolist from '../Todolist/Todolist';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
              <Route path="/" exact component={Login} />
              <Route path="/Register" component={Register} />
              <Route path="/Dashboard" component={Dashboard} />
              <Route path="/Todolist" component={Todolist} />
            </div>
      </Router>
    </Provider>
  );
}

export default App;
