import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({
  isLoggedIn,
  isLoggedInLoading,
  children,
  anonymous = false,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";

  // If it's still loading, do nothing
  if (isLoggedInLoading) return null;

  // If the user is logged in we redirect them away from our
  // anonymous routes.
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  // If a user is not logged in and tries to access a route that
  // requires authorization, we redirect them to the /login route.
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Otherwise, display the children of the current route.
  return children;
}

export default ProtectedRoute;
