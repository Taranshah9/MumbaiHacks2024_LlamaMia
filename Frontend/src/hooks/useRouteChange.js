import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useRouteChange = (callback) => {
  const location = useLocation();

  useEffect(() => {
    callback();
  }, [location.pathname]);
};

export default useRouteChange;
