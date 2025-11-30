import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import "./App.css";
import ProductDetailPage from "./pages/ProductDetailPage";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from './pages/AdminDashboard'
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin/add" element={<AddProductPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/edit/:id" element={<EditProductPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
