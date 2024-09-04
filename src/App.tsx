import './App.css';
import NavBar from './component/NavBar';
import Portal from './component/Portal';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div>
      <NavBar />
      <AllRoutes>
        <h1>Users data </h1>
        <Portal />
      </AllRoutes>
    </div>
  );
}

export default App;
