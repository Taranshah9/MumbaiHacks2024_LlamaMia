import { MapPin, Search, Cloud, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export const CitySelector = ({ selectedCity, onCityChange, cities }) => {
  return (
    <Card className="mb-8 bg-gradient-to-br from-white to-sky-300 rounded-xl overflow-hidden">
      <CardContent className="p-8 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-sky-100/30 to-sky-200/30" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-auto">
            <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50 hover:bg-white/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-sky-400 to-sky-500 p-3 rounded-lg shadow-lg">
                  <MapPin size={24} className="text-white" />
                </div>
                <Select onValueChange={onCityChange} defaultValue={selectedCity}>
                  <SelectTrigger className="w-[220px] border-0 bg-transparent text-sky-900 placeholder-sky-700 focus:ring-sky-400/30 hover:bg-white/20 transition-colors">
                    <div className="flex items-center gap-2">
                      <SelectValue placeholder="Select a city" />
                    </div>
                    <ChevronDown className="text-sky-500" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 backdrop-blur-lg border-sky-100 shadow-lg rounded-lg p-2">
                    <div className="flex items-center gap-2 px-3 py-2 mb-2 bg-gradient-to-r from-sky-100 to-sky-50 rounded-md border border-sky-200">
                      <Search size={14} className="text-sky-500" />
                      <span className="text-sm text-sky-700">Search cities...</span>
                    </div>
                    {cities.map((city) => (
                      <SelectItem 
                        key={city.value} 
                        value={city.value}
                        className="rounded-md hover:bg-sky-50 focus:bg-sky-50 cursor-pointer transition-colors my-1 text-sky-900"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-sky-500" />
                          <span>{city.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-sky-400 to-sky-500 p-2 rounded-lg shadow-lg">
              <Cloud size={32} className="text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400">
              Weather Dashboard
            </h1>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="group bg-white/40 hover:bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/50 transition-all duration-300 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-sky-400 to-sky-500 p-2 rounded-md shadow-lg">
                <MapPin size={16} className="text-white" />
              </div>
              <div className="text-sky-900">
                <div className="text-sm font-medium group-hover:text-sky-600 transition-colors">Current Location</div>
                <div className="text-xs text-sky-600/70">Based on selected city</div>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/40 hover:bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/50 transition-all duration-300 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-sky-400 to-sky-500 p-2 rounded-md shadow-lg">
                <Cloud size={16} className="text-white" />
              </div>
              <div className="text-sky-900">
                <div className="text-sm font-medium group-hover:text-sky-600 transition-colors">Real-time Updates</div>
                <div className="text-xs text-sky-600/70">Auto-refreshing data</div>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/40 hover:bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/50 transition-all duration-300 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-sky-400 to-sky-500 p-2 rounded-md shadow-lg">
                <Search size={16} className="text-white" />
              </div>
              <div className="text-sky-900">
                <div className="text-sm font-medium group-hover:text-sky-600 transition-colors">Quick Search</div>
                <div className="text-xs text-sky-600/70">Find cities instantly</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CitySelector;