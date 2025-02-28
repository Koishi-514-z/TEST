import React, { useState } from 'react';
import './Profile.css';

function Profile({ user, onUpdateAvatar, onBack }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdateAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  return (
    <div className="profile-container">
      <h2>个人中心</h2>
      <div className="profile-content">
        <div className="avatar-section">
          <div className="avatar-container">
            <img 
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} 
              alt="用户头像" 
              className="avatar-image"
            />
            <div className="avatar-upload">
              <label htmlFor="avatar-input" className="upload-button">
                更换头像
              </label>
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>
        <div className="user-info">
          <div className="info-item">
            <label>用户ID：</label>
            <span>{user.id}</span>
          </div>
          <div className="info-item">
            <label>用户名：</label>
            <span>{user.username}</span>
          </div>
          <div className="info-item">
            <label>注册时间：</label>
            <span>{user.registerDate}</span>
          </div>
          <div className="info-item">
            <label>订单数量：</label>
            <span>{user.orderCount || 0} 个</span>
          </div>
        </div>
      </div>
      <button onClick={onBack} className="back-btn">
        返回首页
      </button>
    </div>
  );
}

export default Profile;