export interface Booking {
  bookingId: number;
  hotelId: number;
  eventId: number;
  guestName: string;
  guestPhoneNumber: string;
  checkInDate: string;
  checkOutDate: string;
}

export interface RFP {
  roomingListId: number;
  eventId: number;
  eventName: string;
  hotelId: number;
  rfpName: string;
  cutOffDate: string;
  status: 'completed' | 'received' | 'archived' | 'Confirmed';
  agreement_type: 'leisure' | 'staff';
  bookings: Booking[];
}

export interface FilterState {
  search: string;
  status: string[];
}
