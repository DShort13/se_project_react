import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // if (isLoggedIn &&)

  return children;
}

export default ProtectedRoute;
