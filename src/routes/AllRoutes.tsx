import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Administration from '../pages/Administration';
import KioskManagement from '../pages/KioskManagement';
import POS from '../pages/POS';
import ProductManagement from '../pages/ProductManagement';
import SalesManagement from '../pages/SalesManagement';
import Catalogue from '../pages/Catalogue';
import OrderManagement from '../pages/OrderManagement';
import Signage from '../pages/Signage';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/pm" element={<ProductManagement />} />

      <Route path="/admin" element={<Administration />} />

      <Route path="/sales" element={<SalesManagement />} />

      <Route path="/catalogue" element={<Catalogue />} />

      <Route path="/order" element={<OrderManagement />} />

      <Route path="/signage" element={<Signage />} />

      <Route path="/kiosk" element={<KioskManagement />} />

      <Route path="/pos" element={<POS />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
export default AllRoutes;
