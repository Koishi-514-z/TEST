import React from 'react';
import './BookDetail.css';

function BookDetail({ book, onAddToCart, onBuyNow, onBack }) {
  if (!book) return null;

  return (
    <div className="book-detail">
      <div className="book-detail-container">
        <div className="book-image">
          <img src={book.cover} alt={book.title} />
        </div>
        <div className="book-info">
          <h2>{book.title}</h2>
          <p><strong>作者：</strong>{book.author}</p>
          <p><strong>ISBN：</strong>{book.isbn}</p>
          <p><strong>出版社：</strong>{book.publisher}</p>
          <p><strong>出版时间：</strong>{book.publishDate}</p>
          <p><strong>库存：</strong>{book.stock}本</p>
          <p className="price"><strong>价格：</strong>¥{book.price.toFixed(2)}</p>
          <div className="action-buttons">
            <button onClick={() => onAddToCart(book)} className="cart-button">
              加入购物车
            </button>
            <button onClick={() => onBuyNow(book)} className="buy-button">
              立即购买
            </button>
            <button onClick={onBack} className="back-button">
              返回首页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;