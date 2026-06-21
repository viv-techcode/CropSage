import { useEffect, useState } from "react";

/**
 * Loader Component
 */

const Loader = ({ text = "Loading..." }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      {loading ? (
        <>
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500">{text}</p>
        </>
      ) : (
        <p className="text-sm text-green-600 font-medium">
          Loading Complete
        </p>
      )}
    </div>
  );
};

export default Loader;