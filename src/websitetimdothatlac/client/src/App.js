import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import Header from './components/Header';
import PostList from './components/PostList';
import Footer from './components/Footer';
import Login from './components/login-register/Login';
import Register from './components/login-register/Register';
import EditProfile from './components/EditProfile';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import EditMyPosts from './components/EditMyPosts';
import PostDetails from './components/PostDetails';
import ForgotPassword from './components/login-register/ForgotPassword';
import ResetPassword from './components/login-register/ResetPassword';
import AdminDashboard from './components/AdminDashboard';
import UserManagement from './components/UserManagement';
import PostManagement from './components/PostManagement';
import LostItems from './components/LostItems';
import FoundItems from './components/FoundItems';
import NavigationBar from './components/NavigationBar';
import OwnedItems from "./components/OwnedItems";
import OwnedPosts from "./components/OwnedPosts";
import NotFound from "./components/NotFound";
import BackgroundMusic from './components/BackgroundMusic';
import FallingFlowers from './components/FallingFlowers';

const isAdmin = () => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  return token && role === 'admin';
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAdminPage && <Header />}
      {!isAdminPage && !isLoginOrRegisterPage && <NavigationBar />}
      {children}
      {!isAdminPage && <Footer />}
    </>
  );
};

const FallingFlowersWrapper = () => {
  const location = useLocation();
  return location.pathname === '/' ? <FallingFlowers /> : null; // Chỉ render FallingFlowers khi pathname là '/'
};

const App = () => {
  return (
    <div>
      <BackgroundMusic />
      <Router>
        <div id="falling-flowers" className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
          <FallingFlowersWrapper />
        </div>
        <Routes>
          {/* Các Route dành cho người dùng */}
          <Route path="/" element={!isAdmin() ? <Layout><PostList /></Layout> : <Navigate to="/admin" />} />
          <Route path="/lost-items" element={!isAdmin() ? <Layout><LostItems /></Layout> : <Navigate to="/admin" />} />
          <Route path="/found-items" element={!isAdmin() ? <Layout><FoundItems /></Layout> : <Navigate to="/admin" />} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/edit-profile" element={<Layout><EditProfile /></Layout>} />
          <Route path="/new-post" element={!isAdmin() ? <Layout><NewPost /></Layout> : <Navigate to="/admin" />} />
          <Route path="/my-posts" element={!isAdmin() ? <Layout><EditMyPosts /></Layout> : <Navigate to="/admin" />} />
          <Route path="/edit-my-post/:id" element={!isAdmin() ? <Layout><EditPost /></Layout> : <Navigate to="/admin" />} />
          <Route path="/posts/:id" element={!isAdmin() ? <Layout><PostDetails /></Layout> : <Navigate to="/admin" />} />
          <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
          <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
          <Route path="/owned-items" element={!isAdmin() ? <Layout><OwnedItems /></Layout> : <Navigate to="/admin" />} />

          {/* Các Route dành cho Admin */}
          <Route path="/admin" element={isAdmin() ? <AdminDashboard /> : <Navigate to="/404" />} />
          <Route path="/admin/users" element={isAdmin() ? <UserManagement /> : <Navigate to="/404" />} />
          <Route path="/admin/posts" element={isAdmin() ? <PostManagement /> : <Navigate to="/404" />} />
          <Route path="/admin/owned-posts" element={isAdmin() ? <OwnedPosts /> : <Navigate to="/404" />} />

          {/* Route cho 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
