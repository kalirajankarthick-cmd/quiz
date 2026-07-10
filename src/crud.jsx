// App.js - No external dependencies needed!
import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  // Generate unique ID (replaces uuid)
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // READ - Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data.slice(0, 10));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CREATE - Add User
  const addUser = async (newUser) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });
      
      if (!response.ok) throw new Error('Failed to add user');
      const data = await response.json();
      setUsers([...users, { ...newUser, id: data.id || generateId() }]);
      alert('✅ User added successfully!');
    } catch (err) {
      setError(err.message);
      alert('❌ Failed to add user');
    }
  };

  // UPDATE - Update User
  const updateUser = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });
      
      if (!response.ok) throw new Error('Failed to update user');
      const data = await response.json();
      setUsers(users.map(user => 
        user.id === id ? { ...user, ...data } : user
      ));
      alert('✅ User updated successfully!');
    } catch (err) {
      setError(err.message);
      alert('❌ Failed to update user');
    }
  };

  // DELETE - Delete User
  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(user => user.id !== id));
      alert('✅ User deleted successfully!');
    } catch (err) {
      setError(err.message);
      alert('❌ Failed to delete user');
    }
  };

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('⚠️ Name and Email are required!');
      return;
    }

    if (isEditing) {
      updateUser(formData.id, formData);
      setIsEditing(false);
    } else {
      addUser({ 
        name: formData.name, 
        email: formData.email, 
        phone: formData.phone || '',
        id: generateId()
      });
    }

    setFormData({ id: '', name: '', email: '', phone: '' });
  };

  // Handle Edit
  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || ''
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Cancel Edit
  const handleCancel = () => {
    setFormData({ id: '', name: '', email: '', phone: '' });
    setIsEditing(false);
  };

  // Filter Users
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading users...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <h2>❌ Error</h2>
      <p>{error}</p>
      <button onClick={fetchUsers}>Try Again</button>
    </div>
  );

  return (
    <div className="app-container">
      <h1>📋 User Management System</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="clear-search">
            ✕
          </button>
        )}
      </div>

      <div className="form-container">
        <h2>{isEditing ? '✏️ Edit User' : '➕ Add New User'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <div className="form-buttons">
            <button type="submit" className="btn-submit">
              {isEditing ? '🔄 Update User' : '➕ Add User'}
            </button>
            {isEditing && (
              <button type="button" onClick={handleCancel} className="btn-cancel">
                ❌ Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="users-container">
        <div className="users-header">
          <h2>👥 Users List</h2>
          <span className="user-count">{filteredUsers.length} users</span>
        </div>
        <div className="users-grid">
          {filteredUsers.length === 0 ? (
            <div className="no-users">
              <p>😕 No users found</p>
              {searchTerm && <p>Try adjusting your search</p>}
            </div>
          ) : (
            filteredUsers.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>📧 {user.email}</p>
                  {user.phone && <p>📱 {user.phone}</p>}
                </div>
                <div className="user-actions">
                  <button onClick={() => handleEdit(user)} className="btn-edit">
                    ✏️ Edit
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="btn-delete">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;