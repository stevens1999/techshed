import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faBox, 
  faHeart, 
  faSignOutAlt,
  faEdit,
  faEnvelope,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';
import { useFavorites } from '../FavoritesContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="mt-34 lg:mt-47 lg:mx-10 min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'account', label: 'My Account', icon: faUser },
    { id: 'orders', label: 'Orders', icon: faBox },
    { id: 'wishlist', label: 'Wishlist', icon: faHeart },
  ];

  const renderAccountContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Account</h2>
        {/* <button className="text-blue-600 hover:text-blue-800">
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit Profile
        </button> */}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-3" />
            <span className="text-gray-900">{user.name}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-3" />
            <span className="text-gray-900">{user.email}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <FontAwesomeIcon icon={faPhone} className="text-gray-400 mr-3" />
            <span className="text-gray-900">{user.phone || 'Not provided'}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-3" />
            <span className="text-gray-900">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
      <div className="text-center py-12">
        <FontAwesomeIcon icon={faBox} className="text-6xl text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6">When you place your first order, it will appear here.</p>
        <button 
          onClick={() => navigate('/ShopAll')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );

  const renderWishlistContent = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
      {favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
              <p className="text-blue-600 font-bold mb-3">${product.price.toFixed(2)}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FontAwesomeIcon icon={faHeart} className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Save items you love to your wishlist.</p>
          <button 
            onClick={() => navigate('/ShopAll')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountContent();
      case 'orders':
        return renderOrdersContent();
      case 'wishlist':
        return renderWishlistContent();
      default:
        return renderAccountContent();
    }
  };

  return (
    <div className="mt-34 lg:mt-47 lg:mx-10 min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faUser} className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
              </div>
              
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="mr-3" />
                    {item.label}
                  </button>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-left rounded-md text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;