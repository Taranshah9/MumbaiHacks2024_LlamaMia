import { Card, CardContent, CardTitle } from "@/components/ui/card";

export const MetricCard = ({ title, value, unit, icon: Icon, color }) => {
  // Convert bg color class to equivalent gradient classes
  const gradientMap = {
    "bg-red-500": "from-red-500 to-rose-600",
    "bg-blue-500": "from-blue-500 to-indigo-600",
    "bg-green-500": "from-emerald-500 to-green-600",
    "bg-purple-500": "from-purple-500 to-violet-600",
  };

  const gradient = gradientMap[color] || "from-blue-500 to-indigo-600";

  return (
    <Card className="relative overflow-hidden group">
      {/* Gradient background with glass effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
      />

      {/* Animated glow effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-500`}
      />

      {/* Main content */}
      <CardContent className="relative p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg space-y-4">
        {/* Header with icon and value */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Animated icon container */}
            <div
              className={`relative p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transform transition-transform duration-300`}
            >
              <div className="absolute inset-0 rounded-xl bg-white opacity-20 group-hover:opacity-30 transition-opacity" />
              <Icon size={24} className="text-white relative z-10" />
            </div>

            {/* Title with gradient underline effect */}
            <div className="flex flex-col">
              <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {title}
              </CardTitle>
              <div
                className={`h-0.5 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-300`}
              />
            </div>
          </div>

          {/* Animated value display */}
          <div className="flex items-baseline space-x-1">
            <div
              className={`text-3xl font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}
            >
              {value}
            </div>
            <div
              className={`text-lg font-medium bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}
            >
              {unit}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 opacity-10 transform translate-y-1/4 translate-x-1/4">
          <Icon size={80} className={color.replace("bg-", "text-")} />
        </div>

        {/* Mini chart or additional info could go here */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`}
              />
              <span>Live updates</span>
            </div>
            <span className="text-xs">Updated just now</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Example usage
export const MetricCardShowcase = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
    <MetricCard
      title="Temperature"
      value="24"
      unit="°C"
      icon={({ size, className }) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        </svg>
      )}
      color="bg-red-500"
    />
  </div>
);

export default MetricCard;
