import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { useRFPStore } from '@/stores/rfpStore';

const STATUS_OPTIONS = ['completed', 'received', 'archived', 'Confirmed']; // Personal preference: constants in caps

export const SearchFilters = () => {
  const store = useRFPStore(); // Personal style: shorter destructuring
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Personal preference: separate handler functions
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.setSearch(e.target.value);
  };

  const toggleStatusFilter = (status: string) => {
    console.log('Status filter changed:', status); // Debug log
    const currentFilters = store.filters.status;
    const updatedFilters = currentFilters.includes(status)
      ? currentFilters.filter(s => s !== status)
      : [...currentFilters, status];
    
    store.setStatusFilter(updatedFilters);
  };

  const closeFilterDropdown = () => setIsFilterOpen(false);

  return (
    <div className="flex gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search"
          value={store.filters.search}
          onChange={handleSearchInput}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {/* Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <Filter size={16} className="text-teal-500" />
          Filters
          <ChevronDown size={16} />
        </button>
        
        {isFilterOpen && (
          <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-48">
            <div className="p-3">
              <div className="text-sm font-medium text-gray-700 mb-2">RFP STATUS</div>
              {STATUS_OPTIONS.map(statusOption => (
                <label key={statusOption} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={store.filters.status.includes(statusOption)}
                    onChange={() => toggleStatusFilter(statusOption)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm capitalize">{statusOption}</span>
                </label>
              ))}
              <button
                onClick={closeFilterDropdown}
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
