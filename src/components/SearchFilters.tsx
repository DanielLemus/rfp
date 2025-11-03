import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { useRFPStore } from '@/stores/rfpStore';

const statusOptions = ['completed', 'received', 'archived', 'Confirmed'];

export const SearchFilters = () => {
  const { filters, setSearch, setStatusFilter } = useRFPStore();
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  const handleStatusChange = (status: string) => {
    console.log('Status filter changed:', status); // Debug log
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    setStatusFilter(newStatus);
  };

  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search"
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="relative">
        <button
          onClick={() => setShowStatusFilter(!showStatusFilter)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <Filter size={16} className="text-teal-500" />
          Filters
          <ChevronDown size={16} />
        </button>
        
        {showStatusFilter && (
          <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-48">
            <div className="p-3">
              <div className="text-sm font-medium text-gray-700 mb-2">RFP STATUS</div>
              {statusOptions.map(status => (
                <label key={status} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={() => handleStatusChange(status)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm capitalize">{status}</span>
                </label>
              ))}
              <button
                onClick={() => setShowStatusFilter(false)}
                className="w-full mt-3 bg-blue-600 text-white py-2 rounded text-sm"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
