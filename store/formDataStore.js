import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFormDataStore = create(
  persist(
    (set, get) => ({
      // Stored form data for different form types
      customOrderData: null,
      sampleRequestData: null,
      
      // Store custom order form data
      setCustomOrderData: (data) => {
        set({ customOrderData: data });
      },
      
      // Store sample request form data
      setSampleRequestData: (data) => {
        set({ sampleRequestData: data });
      },
      
      // Get stored custom order data
      getCustomOrderData: () => {
        return get().customOrderData;
      },
      
      // Get stored sample request data
      getSampleRequestData: () => {
        return get().sampleRequestData;
      },
      
      // Clear custom order data
      clearCustomOrderData: () => {
        set({ customOrderData: null });
      },
      
      // Clear sample request data
      clearSampleRequestData: () => {
        set({ sampleRequestData: null });
      },
      
      // Clear all form data
      clearAllFormData: () => {
        set({ 
          customOrderData: null,
          sampleRequestData: null 
        });
      }
    }),
    {
      name: "xpartex-form-data",
      partialize: (state) => ({
        customOrderData: state.customOrderData,
        sampleRequestData: state.sampleRequestData,
      }),
    },
  ),
);

export default useFormDataStore;
