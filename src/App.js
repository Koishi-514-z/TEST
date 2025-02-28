import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import BookDetail from './components/BookDetail';
import Cart from './components/Cart';
import Order from './components/Order';
import Profile from './components/Profile';
import { books } from './data/books';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({
    id: 'USER' + Date.now(),
    username: 'Koishi',
    avatar: null,
    registerDate: new Date().toLocaleDateString(),
    orderCount: 0
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Koishi' && password === '123456') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('用户名或密码错误');
    }
  };

  const handleSearch = (searchType, searchTerm) => {
    const filtered = books.filter(book => 
      book[searchType].toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleAddToCart = (book) => {
    const existingItem = cartItems.find(item => item.id === book.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === book.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
    alert('已添加到购物车！');
  };

  const handleUpdateQuantity = (bookId, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === bookId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveFromCart = (bookId) => {
    setCartItems(cartItems.filter(item => item.id !== bookId));
  };

  const handleHomeClick = () => {
    setShowCart(false);
    setShowOrders(false);
    setShowProfile(false);
    setSelectedBook(null);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setShowOrders(false);
    setShowProfile(false);
    setSelectedBook(null);
  };

  const handleBackFromCart = () => {
    setShowOrders(false);
    setShowCart(false); 
    setShowProfile(false);
    setSelectedBook(null);
  };

  const handleBuyNow = (book) => {
    const newOrder = {
      id: `ORDER${Date.now()}`,
      createTime: new Date().toLocaleString(),
      status: 'pending',
      books: [{ ...book, quantity: 1 }],
      total: book.price
    };
    setOrders([newOrder, ...orders]);
    // 更新用户订单数量
    setUser(prevUser => ({
      ...prevUser,
      orderCount: prevUser.orderCount + 1
    }));
    setShowOrders(true);
    setSelectedBook(null);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    const newOrder = {
      id: `ORDER${Date.now()}`,
      createTime: new Date().toLocaleString(),
      status: 'pending',
      books: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };
    setOrders([newOrder, ...orders]);
    setUser(prevUser => ({
      ...prevUser,
      orderCount: prevUser.orderCount + 1
    }));
    setCartItems([]);
    setShowCart(false);
    setShowOrders(true);
  };

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'cancelled' }
        : order
    ));
    setUser(prevUser => ({
      ...prevUser,
      orderCount: Math.max(0, prevUser.orderCount - 1)
    }));
  };

  const handlePayOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'paid' }
        : order
    ));
  };

  const handleOrderClick = () => {
    setShowOrders(true);
    setShowCart(false);
    setShowProfile(false);
    setSelectedBook(null);
  };

  const handleBackFromOrders = () => {
    setShowOrders(false);
    setShowCart(false); 
    setShowProfile(false);
    setSelectedBook(null);
  };

  const handleBackToHome = () => {
    setShowOrders(false);
    setShowCart(false); 
    setShowProfile(false);
    setSelectedBook(null);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowCart(false);
    setShowOrders(false);
    setSelectedBook(null);
  };

  const handleUpdateAvatar = (newAvatar) => {
    setUser({
      ...user,
      avatar: newAvatar
    });
  };

  const handleBackFromProfile = () => {
    setShowOrders(false);
    setShowCart(false); 
    setShowProfile(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <div className="login-container">
          <h2>商城登录</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>用户名：</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>密码：</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit">登录</button>
          </form>
        </div>
      </div>
    );
  }

  if (showCart) {
    return (
      <div className="App">
        <Navbar 
          onHomeClick={handleHomeClick}
          onCartClick={handleCartClick} 
          onOrderClick={handleOrderClick}
          onProfileClick={handleProfileClick}
          currentPage="cart"
        />
        <Cart
          cartItems={cartItems}
          updateQuantity={handleUpdateQuantity}
          removeFromCart={handleRemoveFromCart}
          onBack={handleBackFromCart}
          onCheckout={handleCheckout}
        />
      </div>
    );
  }

  if (selectedBook) {
    return (
      <div className="App">
        <Navbar 
          onHomeClick={handleHomeClick}
          onCartClick={handleCartClick} 
          onOrderClick={handleOrderClick}
          onProfileClick={handleProfileClick}
          currentPage="home"
        />
        <BookDetail
          book={selectedBook}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onBack={handleBackToHome}
        />
      </div>
    );
  }

  if (showOrders) {
    return (
      <div className="App">
        <Navbar 
          onHomeClick={handleHomeClick}
          onCartClick={handleCartClick} 
          onOrderClick={handleOrderClick}
          onProfileClick={handleProfileClick}
          currentPage="orders"
        />
        <Order
          orders={orders}
          onCancelOrder={handleCancelOrder}
          onPayOrder={handlePayOrder}
          onBack={handleBackFromOrders}
        />
      </div>
    );
  }

  if (showProfile) {
    return (
      <div className="App">
        <Navbar 
          onHomeClick={handleHomeClick}
          onCartClick={handleCartClick} 
          onOrderClick={handleOrderClick}
          onProfileClick={handleProfileClick}
          currentPage="profile"
        />
        <Profile
          user={user}
          onUpdateAvatar={handleUpdateAvatar}
          onBack={handleBackFromProfile}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar 
        onHomeClick={handleHomeClick}
        onCartClick={handleCartClick} 
        onOrderClick={handleOrderClick}
        onProfileClick={handleProfileClick}
        currentPage="home"
      />
      <SearchBar onSearch={handleSearch} />
      <div className="books-container">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card" onClick={() => handleBookClick(book)}>
            <img src={book.cover} alt={book.title} />
            <h3>{book.title}</h3>
            <p className="price">¥{book.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;