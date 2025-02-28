import React from 'react';
import './Order.css';

function Order({ orders, onCancelOrder, onPayOrder, onBack }) {
  return (
    <div className="order-container">
      <h2>我的订单</h2>
      {orders.length === 0 ? (
        <div className="empty-order">
          <p>暂无订单</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <div key={order.id} className="order-item">
              <div className="order-header">
                <span>订单号: {order.id}</span>
                <span>下单时间: {order.createTime}</span>
                <span className={`order-status ${order.status}`}>
                  {order.status === 'pending' ? '待付款' : 
                   order.status === 'paid' ? '已付款' : 
                   order.status === 'cancelled' ? '已取消' : ''}
                </span>
              </div>
              <div className="order-books">
                {order.books.map(book => (
                  <div key={book.id} className="order-book-item">
                    <img src={book.cover} alt={book.title} />
                    <div className="book-info">
                      <h3>{book.title}</h3>
                      <p className="price">¥{book.price.toFixed(2)}</p>
                      <p className="quantity">x {book.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <div className="order-total">
                  总计: ¥{order.total.toFixed(2)}
                </div>
                <div className="order-actions">
                  {order.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => onPayOrder(order.id)}
                        className="pay-btn"
                      >
                        立即付款
                      </button>
                      <button 
                        onClick={() => onCancelOrder(order.id)}
                        className="cancel-btn"
                      >
                        取消订单
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={onBack} className="back-btn">
        返回首页
      </button>
    </div>
  );
}

export default Order;