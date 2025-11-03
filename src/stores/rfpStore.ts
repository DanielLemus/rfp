import { create } from 'zustand';
import { RFP, FilterState } from '@/types/rfp';

interface RFPStore {
  rfps: RFP[];
  filters: FilterState;
  setRFPs: (rfps: RFP[]) => void;
  setSearch: (search: string) => void;
  setStatusFilter: (status: string[]) => void;
  getFilteredRFPs: () => RFP[];
}

export const useRFPStore = create<RFPStore>((set, get) => ({
  rfps: [],
  filters: {
    search: '',
    status: []
  },
  
  setRFPs: (rfps) => set({ rfps }),
  
  setSearch: (search) => set(state => ({
    filters: { ...state.filters, search }
  })),
  
  setStatusFilter: (status) => set(state => ({
    filters: { ...state.filters, status }
  })),
  
  getFilteredRFPs: () => {
    const { rfps, filters } = get();
    
    return rfps.filter(rfp => {
      const matchesSearch = !filters.search || 
        rfp.rfpName.toLowerCase().includes(filters.search.toLowerCase()) ||
        rfp.agreement_type.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status.length === 0 || 
        filters.status.includes(rfp.status);
      
      return matchesSearch && matchesStatus;
    });
  }
}));
