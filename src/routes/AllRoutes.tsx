import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Administration from '../pages/Administration';
import KioskManagement from '../pages/KioskManagement';
import POS from '../pages/POS';
import ProductManagement from '../pages/ProductManagement';
import Signage from '../pages/Signage';
import Inventory from '../pages/Inventory';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/pm" element={<ProductManagement />} />

      <Route path="/pos" element={<POS />} />

      <Route path="/kiosk" element={<KioskManagement />} />

      <Route path="/signage" element={<Signage />} />

      <Route path="/admin" element={<Administration />} />

      <Route path="/inventory" element={<Inventory />} />
    </Routes>
  );
}
export default AllRoutes;
