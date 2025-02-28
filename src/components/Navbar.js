import React from 'react';
import './Navbar.css';

function Navbar({ onHomeClick, onCartClick, onOrderClick, onProfileClick, currentPage }) {
  return (
    <nav className="navbar">
      <div className="logo">电子书商城</div>
      <div className="nav-links">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            onHomeClick();
          }}
          className={currentPage === 'home' ? 'active' : ''}
        >
          首页
        </a>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            onCartClick();
          }}
          className={currentPage === 'cart' ? 'active' : ''}
        >
          购物车
        </a>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            onOrderClick();
          }}
          className={currentPage === 'orders' ? 'active' : ''}
        >
          我的订单
        </a>
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            onProfileClick();
          }}
          className={currentPage === 'profile' ? 'active' : ''}
        >
          个人中心
        </a>
      </div>
    </nav>
  );
}

export default Navbar;