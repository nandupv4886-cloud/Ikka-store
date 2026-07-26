import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import { FiShoppingCart, FiHeart, FiUser, FiLogOut, FiMenu, FiX, FiSearch } from 'react-icons/fi'
import './Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const { user, logout } = useContext(AuthContext)
  const { getTotalItems, cartItems } = useContext(CartContext)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`)
      setSearchTerm('')
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-wrapper">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">Ikka Store</span>
          </Link>

          {/* Search Bar */}
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FiSearch />
            </button>
          </form>

          {/* Navbar Links */}
          <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>

            {user && (
              <Link to="/admin/dashboard" className="nav-link">
                Admin
              </Link>
            )}
          </div>

          {/* Action Icons */}
          <div className="navbar-actions">
            <Link to="/wishlist" className="nav-icon">
              <FiHeart />
            </Link>

            <Link to="/cart" className="nav-icon cart-icon">
              <FiShoppingCart />
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </Link>

            {user ? (
              <div className="user-menu">
                <button className="nav-icon user-icon">
                  <FiUser />
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <button onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
