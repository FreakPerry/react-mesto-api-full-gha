import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return children;
  }
  <Navigate to="./sign-in" />;
};
