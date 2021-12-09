import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

// If the user is not authenticated and the app is not loading, user will be redirected to login page
// If the user is authenticated and the page is loading (default), user can go to main page
const PrivateRoute = ({ redirect, element }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return !isAuthenticated && !loading ? <Navigate to={redirect} /> : element;
};
export default PrivateRoute;
