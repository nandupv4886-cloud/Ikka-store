import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { CartContext } from './context/CartContext'
import { ProductContext } from './context/ProductContext'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Tracking from './pages/Tracking'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

// Admin Pages
import AdminDashboard from './admin/Dashboard'
import AdminProducts from './admin/Products'
import AdminOrders from './admin/Orders'
import AdminCustomers from './admin/Customers'
import AdminReviews from './admin/Reviews'

// Components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Loader from './components/Loader/Loader'

import './App.css'

function App() {
  return (
    <Router>
      <AuthContext>
        <ProductContext>
          <CartContext>
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/tracking/:orderId" element={<Tracking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
            </Routes>
            <Footer />
          </CartContext>
        </ProductContext>
      </AuthContext>
    </Router>
  )
}

export default App
