import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Dashboard from './pages/Dashboard';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Dashboard></Dashboard>
      <Contact></Contact>
    </div>
  );
}

export default App;
