import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

const FilterPopover = ({ column, value, onChange, onClose, options }) => (
  <div className="absolute mt-2 right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
    <div className="p-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">Filter {column}</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Search ${column}...`}
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {options && options.length > 0 && (
        <div className="mt-2 max-h-48 overflow-y-auto">
          {options.map((option, index) => (
            <div 
              key={index}
              className="flex items-center px-2 py-1 hover:bg-gray-50 cursor-pointer text-sm"
              onClick={() => onChange(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const WeatherTable = ({ forecastData }) => {
  const [filters, setFilters] = useState({
    date: '',
    temp: '',
    humidity: '',
    pressure: '',
    windSpeed: ''
  });
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.filter-container')) {
        setActiveFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter data based on all active filters
  const filteredData = forecastData.filter(day => {
    return (
      day.date.toLowerCase().includes(filters.date.toLowerCase()) &&
      day.temp.toString().includes(filters.temp) &&
      day.humidity.toString().includes(filters.humidity) &&
      day.pressure.toString().includes(filters.pressure) &&
      day.windSpeed.toString().includes(filters.windSpeed)
    );
  });

  // Sort filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      date: '',
      temp: '',
      humidity: '',
      pressure: '',
      windSpeed: ''
    });
    setActiveFilter(null);
  };

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'temp', label: 'Temperature (°C)' },
    { key: 'humidity', label: 'Humidity (%)' },
    { key: 'pressure', label: 'Pressure (hPa)' },
    { key: 'windSpeed', label: 'Wind Speed (m/s)' }
  ];

  // Get unique values for each column for filter options
  const getColumnOptions = (column) => {
    return [...new Set(forecastData.map(item => item[column]))].sort();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b border-gray-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-800">Weather Forecast</CardTitle>
          <div className="flex items-center space-x-4">
            {Object.values(filters).some(f => f !== '') && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-500 hover:text-red-600 flex items-center"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filters
              </button>
            )}
            <div className="text-sm text-gray-500">
              {filteredData.length} of {forecastData.length} entries
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-100">
                {columns.map(({ key, label }) => (
                  <TableHead 
                    key={key}
                    className="relative filter-container"
                  >
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex items-center cursor-pointer"
                        onClick={() => requestSort(key)}
                      >
                        <span className="font-semibold text-gray-700">{label}</span>
                        {sortConfig.key === key && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                            }
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => setActiveFilter(activeFilter === key ? null : key)}
                        className={`ml-2 p-1 rounded hover:bg-gray-200 ${
                          filters[key] ? 'text-blue-500' : 'text-gray-400'
                        }`}
                      >
                        <Filter className="w-4 h-4" />
                      </button>
                      {activeFilter === key && (
                        <FilterPopover
                          column={label}
                          value={filters[key]}
                          onChange={(value) => handleFilterChange(key, value)}
                          onClose={() => setActiveFilter(null)}
                          options={getColumnOptions(key)}
                        />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((day, index) => (
                  <TableRow 
                    key={day.date}
                    className={`
                      ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      hover:bg-blue-50 transition-colors
                    `}
                  >
                    <TableCell className="font-medium">{day.date}</TableCell>
                    <TableCell className="text-red-600">{day.temp}°C</TableCell>
                    <TableCell className="text-blue-600">{day.humidity}%</TableCell>
                    <TableCell className="text-green-600">{day.pressure} hPa</TableCell>
                    <TableCell className="text-purple-600">{day.windSpeed} m/s</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No matching records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherTable;