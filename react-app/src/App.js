import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Home from './components/pages/Home/homesecond';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import NotFound from './components/pages/NotFound';
import SendMail from './components/pages/SendMail';
import Test from './components/pages/Test';
// import Logout from './components/pages/auth/Logout';
const App = () => {
  const isAuthenticated = localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <React.Fragment>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login"  />} />
          </React.Fragment>
        ) : (
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            {/* <PrivateRoute path="admin/*" element={<AdminPanel />} adminOnly={true} /> */}
            <Route path="/send-mail" element={<SendMail />} />
            <Route path="/test" element={<Test />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default App;
