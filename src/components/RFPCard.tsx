import { format } from 'date-fns';
import { Eye, FileText } from 'lucide-react';
import { RFP } from '@/types/rfp';

interface RFPCardProps {
  rfp: RFP;
}

export const RFPCard = ({ rfp }: RFPCardProps) => {
  const cutOffDate = new Date(rfp.cutOffDate);
  const month = format(cutOffDate, 'MMM').toUpperCase();
  const day = format(cutOffDate, 'd');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{rfp.rfpName}</h3>
          <p className="text-sm text-gray-600">Agreement: {rfp.agreement_type}</p>
        </div>
        <div className="text-center">
          <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium">
            {month}
          </div>
          <div className="text-xl font-bold text-gray-900">{day}</div>
          <div className="text-xs text-gray-500">Cut-Off Date</div>
        </div>
      </div>
      
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span>{format(new Date(rfp.cutOffDate), 'MMM d - MMM d, yyyy')}</span>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
          <Eye size={16} />
          View Bookings ({rfp.bookings.length})
        </button>
        <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          <FileText size={16} />
        </button>
      </div>
    </div>
  );
};
