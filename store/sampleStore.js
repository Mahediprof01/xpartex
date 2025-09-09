import { create } from "zustand"
import { persist } from "zustand/middleware"

const useSampleStore = create(
  persist(
    (set, get) => ({
      sampleRequests: [],
      
      addSampleRequest: (sampleData) => {
        const newSample = {
          id: `SAMPLE-${Date.now()}`,
          status: "pending_approval",
          requestDate: new Date().toISOString().split('T')[0],
          approvalDate: null,
          shippingDate: null,
          deliveryDate: null,
          cost: 0,
          feedback: null,
          rating: null,
          sellerResponse: null,
          rejectionReason: null,
          demeritPoints: 0,
          demeritHistory: [],
          qualityScore: 100,
          shippingDetails: null,
          ...sampleData,
        }
        
        set((state) => ({
          sampleRequests: [newSample, ...state.sampleRequests]
        }))
        
        return newSample.id
      },
      
      updateSampleRequest: (sampleId, updates) => {
        set((state) => ({
          sampleRequests: state.sampleRequests.map(sample =>
            sample.id === sampleId ? { ...sample, ...updates } : sample
          )
        }))
      },
      
      getSampleRequest: (sampleId) => {
        return get().sampleRequests.find(sample => sample.id === sampleId)
      },
      
      getSampleRequestsByBuyer: (buyerName) => {
        return get().sampleRequests.filter(sample => sample.buyer === buyerName)
      },
      
      deleteSampleRequest: (sampleId) => {
        set((state) => ({
          sampleRequests: state.sampleRequests.filter(sample => sample.id !== sampleId)
        }))
      },
    }),
    {
      name: "xpartex-sample-requests",
      partialize: (state) => ({
        sampleRequests: state.sampleRequests,
      }),
    },
  ),
)

export default useSampleStore
