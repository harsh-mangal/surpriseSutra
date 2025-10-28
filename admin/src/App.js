import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminNavbar from './components/Navbar';
import ProductTable from './pages/Products';

function App() {
  return (
   
      <div className="min-h-screen bg-gray-100">
        <AdminNavbar />
        <Routes>
          <Route path="/products" element={<ProductTable />} />
          <Route path="/" element={<div className="container mx-auto p-4">Welcome to the Admin Dashboard</div>} />
        </Routes>
      </div>
    
  );
}

export default App;