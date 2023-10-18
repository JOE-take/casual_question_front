import axios from 'axios';
import {HashRouter as Router} from 'react-router-dom';
import './css/App.css';
import './css/Nav.css'
import './css/Form.css'
import './css/PostQuestion.css'
import './css/Channel.css'
import AppContent from './components/AppContent';
import { UserProvider } from './components/UserContent';

axios.defaults.withCredentials = true;

function App() {

  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;