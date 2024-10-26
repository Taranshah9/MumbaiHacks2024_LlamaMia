/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = window.localStorage.getItem('token'); // Ideally, check for a valid token from local storage or state
  return token != null  ? children : <Navigate to="/" />;
};

export default PrivateRoute;
