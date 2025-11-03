import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminNavbar from './components/Navbar';
import ProductTable from './pages/Products';
import AdminOrdersPage from './pages/Orders';
import CategoryManagement from './pages/Categories';
import ProductAddForm from './pages/ProductForm';

function App() {
  return (
   
      <div className="min-h-screen bg-gray-100">
        <AdminNavbar />
        <Routes>
          <Route path="/products" element={<ProductTable />} />
          <Route path="/orders" element={<AdminOrdersPage />} />
          <Route path='/categories' element={<CategoryManagement />} />
           <Route path='/add-product' element={<ProductAddForm />} />
          <Route path="/" element={<div className="container mx-auto p-4">Welcome to the Admin Dashboard</div>} />
        </Routes>
      </div>
    
  );
}

export default App;