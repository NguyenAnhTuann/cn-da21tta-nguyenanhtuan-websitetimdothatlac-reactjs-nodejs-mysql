import React from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import EditProfile from './components/EditProfile';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import EditMyPosts from './components/EditMyPosts';
import PostDetails from './components/PostDetails';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";




const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <div className="main-content">
            <PostList />
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/my-posts" element={<EditMyPosts />} />
        <Route path="/edit-my-post/:id" element={<EditPost />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
