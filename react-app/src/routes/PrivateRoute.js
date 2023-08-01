import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, adminOnly = false, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  if (adminOnly) {
    // navigate('/', { replace: true });
    return null;
  }

  return (
    <React.Fragment>
      {/* {isAuthenticated ? <Route {...rest} element={<Component />} /> : navigate('/login', { replace: true })} */}
    </React.Fragment>
  );
};

export default PrivateRoute;
