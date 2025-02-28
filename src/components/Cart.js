import React from 'react';
import './Cart.css';

function Cart({ cartItems, updateQuantity, removeFromCart, onBack, onCheckout }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>购物车</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>购物车是空的</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.cover} alt={item.title} />
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p className="price">¥{item.price.toFixed(2)}</p>
                </div>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="total">
              总计: ¥{total.toFixed(2)}
            </div>
            <button 
              className="checkout-btn"
              onClick={onCheckout}
              disabled={cartItems.length === 0}
            >
              结算
            </button>
          </div>
        </>
      )}
      <button onClick={onBack} className="back-btn">
        返回首页
      </button>
    </div>
  );
}

export default Cart;