import React from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import EditProfile from './components/EditProfile';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import EditMyPosts from './components/EditMyPosts';
import PostDetails from './components/PostDetails';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AdminDashboard from './components/AdminDashboard';
import UserManagement from './components/UserManagement';
import PostManagement from './components/PostManagement';
import LostItems from './components/LostItems';
import FoundItems from './components/FoundItems';
import NavigationBar from './components/NavigationBar';
import OwnedItems from "./components/OwnedItems";
import OwnedPosts from "./components/OwnedPosts"



import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {/* Luôn hiển thị Header */}
      {!isAdminPage && <Header />}

      {/* Chỉ hiển thị NavigationBar nếu không phải là trang admin hoặc trang login/register */}
      {!isAdminPage && !isLoginOrRegisterPage && <NavigationBar />}

      {/* Nội dung chính */}
      {children}

      {/* Hiển thị Footer nếu không phải là trang admin */}
      {!isAdminPage && <Footer />}
    </>
  );
};



const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Các Route dành cho người dùng */}
          <Route path="/" element={<PostList />} />
          <Route path="/lost-items" element={<LostItems />} />
          <Route path="/found-items" element={<FoundItems />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/my-posts" element={<EditMyPosts />} />
          <Route path="/edit-my-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/owned-items" element={<OwnedItems />} />

          {/* Các Route dành cho Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/posts" element={<PostManagement />} />
          <Route path="/admin/owned-posts" element={<OwnedPosts />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
