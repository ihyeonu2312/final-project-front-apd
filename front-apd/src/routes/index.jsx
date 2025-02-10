import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Used from "../pages/Used";
import Support from "../pages/Support";
import Fashion from "../pages/Fashion";
import Living from "../pages/Living";
import Beauty from "../pages/Beauty";
import Bags from "../pages/Bags";
import Appliances from "../pages/Appliances";
import HomeInterior from "../pages/HomeInterior";
import Sports from "../pages/Sports";
import Jewelry from "../pages/Jewelry";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 메인 페이지 */}
      <Route path="/" element={<Main />} />

      {/* 주요 페이지 */}
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/used" element={<Used />} />
      <Route path="/support" element={<Support />} />

      {/* 카테고리 페이지 */}
      <Route path="/fashion" element={<Fashion />} />
      <Route path="/living" element={<Living />} />
      <Route path="/beauty" element={<Beauty />} />
      <Route path="/bags" element={<Bags />} />
      <Route path="/appliances" element={<Appliances />} />
      <Route path="/home-interior" element={<HomeInterior />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/jewelry" element={<Jewelry />} />

      {/* 404 페이지 (항상 맨 마지막에 위치) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;