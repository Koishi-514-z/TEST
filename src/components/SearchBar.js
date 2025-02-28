import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchType, setSearchType] = useState('title');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchType, searchTerm);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <select 
        value={searchType} 
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="title">书名</option>
        <option value="author">作者</option>
        <option value="isbn">ISBN</option>
      </select>
      <input
        type="text"
        placeholder="搜索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">搜索</button>
    </form>
  );
}

export default SearchBar;