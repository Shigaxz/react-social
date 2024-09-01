import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { currentUser } = useAuth();

  return (currentUser ? element : 
  <Navigate to="/register" />
);
};

export default ProtectedRoute;