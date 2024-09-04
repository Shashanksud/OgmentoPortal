import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
export default AllRoutes;
