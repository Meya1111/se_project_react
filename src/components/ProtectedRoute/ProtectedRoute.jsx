import { Navigate } from "react-router-dom";

function ProtectedRoute({ loggedIn, isLoggedInLoading, children }) {
  if (isLoggedInLoading) return null;
  return loggedIn ? children : <Navigate to="/" />;
}
export default ProtectedRoute;
