import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRFPStore } from '@/stores/rfpStore';
import { mockRFPs } from '@/data/mockData';
import { SearchFilters } from '@/components/SearchFilters';
import { EventTags } from '@/components/EventTags';
import { RFPCard } from '@/components/RFPCard';

const Dashboard = () => {
  const { setRFPs, getFilteredRFPs } = useRFPStore();
  const filteredRFPs = getFilteredRFPs();

  useEffect(() => {
    setRFPs(mockRFPs);
  }, [setRFPs]);

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
          <EventTags />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRFPs.map(rfp => (
              <RFPCard key={rfp.roomingListId} rfp={rfp} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
