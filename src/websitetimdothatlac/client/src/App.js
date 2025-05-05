import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet/dist/leaflet.css";
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from './components/admin/AdminDashboard';
import OwnedPosts from "./components/admin/OwnedPosts";
import PostManagement from './components/admin/PostManagement';
import UserManagement from './components/admin/UserManagement';
import BackgroundMusic from './components/BackgroundMusic';
import EditMyPosts from './components/user/EditMyPosts';
import EditPost from './components/user/EditPost';
import EditProfile from './components/user/EditProfile';
import FallingFlowers from './components/FallingFlowers';
import Footer from './components/Footer';
import FoundItems from './components/home/FoundItems';
import Header from './components/Header';
import ForgotPassword from './components/login-register/ForgotPassword';
import Login from './components/login-register/Login';
import Register from './components/login-register/Register';
import ResetPassword from './components/login-register/ResetPassword';
import LostItems from './components/home/LostItems';
import NavigationBar from './components/NavigationBar';
import NewPost from './components/user/NewPost';
import NotFound from "./components/NotFound";
import OwnedItems from "./components/home/OwnedItems";
import PostDetails from './components/home/PostDetails';
import PostList from './components/home/PostList';

const isAdmin = () => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  return token && role === 'admin';
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const noHeaderFooterPages = ['/login', '/register', '/forgot-password', '/reset-password'];

  const hideHeaderFooter = noHeaderFooterPages.includes(location.pathname);

  return (
    <>
      {!isAdminPage && !hideHeaderFooter && <Header />}
      {!isAdminPage && !hideHeaderFooter && <NavigationBar />}
      {children}
      {!isAdminPage && !hideHeaderFooter && <Footer />}
    </>
  );
};

const FallingFlowersWrapper = () => {
  const location = useLocation();
  return location.pathname === '/' ? <FallingFlowers /> : null;
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
