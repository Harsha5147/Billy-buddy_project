import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  element: React.ReactElement;
  requireAdmin?: boolean;
  requireCybercrime?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  element, 
  requireAdmin = false,
  requireCybercrime = false 
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireCybercrime && user.email !== 'cybercrime@gmail.com') {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PrivateRoute;