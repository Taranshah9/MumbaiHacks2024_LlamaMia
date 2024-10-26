import { useLocation } from "react-router-dom";

const useVariantBasedOnRoute = () => {
  const location = useLocation();

  return (route) => {
    // Get the last segment of the current location pathname
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Get the last segment of the route being passed
    const routeSegments = route.split("/").filter(Boolean);
    const lastRouteSegment = routeSegments[routeSegments.length - 1];

    // Compare the last segment of the pathname with the last segment of the route
    return lastSegment === lastRouteSegment ? "default" : "ghost";
  };
};

export default useVariantBasedOnRoute;
