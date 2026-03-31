import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const Admin = () => {
  const { isAuth } = useAuth();
  return isAuth ? <AdminDashboard /> : <AdminLogin />;
};

export default Admin;
