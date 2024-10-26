import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [isMediumOrSmaller, setIsMediumOrSmaller] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumOrSmaller(window.innerWidth < 1024);
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMediumOrSmaller;
};

export default useScreenSize;
