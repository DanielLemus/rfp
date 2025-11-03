import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRFPStore } from '@/stores/rfpStore';
import { mockRFPs } from '@/data/mockData';
import { SearchFilters } from '@/components/SearchFilters';
import { RFPCard } from '@/components/RFPCard';

const Dashboard = () => {
  const { setRFPs, getFilteredRFPs, rfps } = useRFPStore();
  const filteredRFPs = getFilteredRFPs();

  useEffect(() => {
    console.log('Loading RFP data...', mockRFPs.length, 'items'); // Debug info
    setRFPs(mockRFPs);
  }, [setRFPs]);

  const uniqueEvents = Array.from(new Set(rfps.map(rfp => rfp.eventName)));
  
  const getEventColor = (eventName: string) => {
    const colors = {
      'Rolling Loud': 'bg-teal-100 text-teal-700 border-teal-200',
      'Ultra Miami': 'bg-purple-100 text-purple-700 border-purple-200',
      'Tech Conference 2024': 'bg-purple-100 text-purple-700 border-purple-200',
      'Marketing Summit': 'bg-teal-100 text-teal-700 border-teal-200'
    };
    return colors[eventName as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <>
      <Helmet>
        <title>RFP Management - Events</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Rooming List Management: Events
          </h1>
          
          <SearchFilters />
          
          <div className="flex flex-wrap gap-2 mb-6">
            {uniqueEvents.map(event => (
              <span
                key={event}
                className={`px-3 py-1 rounded-full text-sm border ${getEventColor(event)}`}
              >
                {event}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRFPs.map(rfp => (
              <RFPCard key={rfp.roomingListId} rfp={rfp}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
