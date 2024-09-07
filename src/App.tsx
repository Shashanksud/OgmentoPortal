import './App.css';
import NavBar from './component/NavBar';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div>
      <NavBar>
        <AllRoutes />
      </NavBar>
    </div>
  );
}

export default App;
