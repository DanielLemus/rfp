import { useRFPStore } from '@/stores/rfpStore';

export const EventTags = () => {
  const { rfps } = useRFPStore();
  
  const uniqueEvents = Array.from(new Set(rfps.map(rfp => rfp.eventName)));
  
  const getTagColor = (eventName: string) => {
    const colors = {
      'Rolling Loud': 'bg-teal-100 text-teal-700 border-teal-200',
      'Ultra Miami': 'bg-purple-100 text-purple-700 border-purple-200',
      'Tech Conference 2024': 'bg-purple-100 text-purple-700 border-purple-200',
      'Marketing Summit': 'bg-teal-100 text-teal-700 border-teal-200'
    };
    return colors[eventName as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {uniqueEvents.map(event => (
        <span
          key={event}
          className={`px-3 py-1 rounded-full text-sm border ${getTagColor(event)}`}
        >
          {event}
        </span>
      ))}
    </div>
  );
};
