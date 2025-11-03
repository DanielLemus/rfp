import { format } from 'date-fns';
import { Eye, FileText } from 'lucide-react';
import { RFP } from '@/types/rfp';

interface RFPCardProps {
  rfp: RFP;
}

export const RFPCard = ({ rfp }: RFPCardProps) => {
  const cutoffDate = new Date(rfp.cutOffDate);
  const monthText = format(cutoffDate, 'MMM').toUpperCase();
  const dayNumber = format(cutoffDate, 'd');

  // Personal preference: object lookup instead of switch
  const statusBadgeStyles = {
    completed: 'bg-green-100 text-green-800',
    received: 'bg-blue-100 text-blue-800', 
    archived: 'bg-gray-100 text-gray-800',
    Confirmed: 'bg-purple-100 text-purple-800'
  };

  const badgeClass = statusBadgeStyles[rfp.status as keyof typeof statusBadgeStyles] || 'bg-gray-100 text-gray-800';
  const bookingCount = rfp.bookings.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{rfp.rfpName}</h3>
          <p className="text-sm text-gray-600">Agreement: {rfp.agreement_type}</p>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${badgeClass}`}>
            {rfp.status}
          </span>
        </div>
        <div className="text-center">
          <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium">
            {monthText}
          </div>
          <div className="text-xl font-bold text-gray-900">{dayNumber}</div>
          <div className="text-xs text-gray-500">Cut-Off Date</div>
        </div>
      </div>
      
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span>{rfp.eventName}</span>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
          <Eye size={16}/>
          View Bookings ({bookingCount})
        </button>
        <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          <FileText size={16} />
        </button>
      </div>
    </div>
  );
};
