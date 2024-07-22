import { useState } from 'react';
// import viteLogo from '/vite.svg'; // this is in public folder
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        </a>
      </div>
      <h1>Ogmento</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((prev) => prev + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
