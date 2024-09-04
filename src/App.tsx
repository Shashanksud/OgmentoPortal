import './App.css';
import './index.css';
import NavBar from './component/NavBar';

import Home from './pages/Home';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div>
      <NavBar />
      <AllRoutes>
        <Home />
      </AllRoutes>
    </div>
  );
}

export default App;
