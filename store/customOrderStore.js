import { create } from "zustand"
import { persist } from "zustand/middleware"

const useCustomOrderStore = create(
  persist(
    (set, get) => ({
      customOrders: [],
      
      addCustomOrder: (orderData) => {
        const newOrder = {
          id: `CUST-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          status: "bidding_active",
          trackingNumber: null,
          samples: {
            requested: false,
            status: "not_requested",
            supplier: null,
            cost: 0,
          },
          bids: [],
          ...orderData,
        }
        
        set((state) => ({
          customOrders: [newOrder, ...state.customOrders]
        }))
        
        return newOrder.id
      },
      
      updateCustomOrder: (orderId, updates) => {
        set((state) => ({
          customOrders: state.customOrders.map(order =>
            order.id === orderId ? { ...order, ...updates } : order
          )
        }))
      },
      
      getCustomOrder: (orderId) => {
        return get().customOrders.find(order => order.id === orderId)
      },
      
      getCustomOrdersByBuyer: (buyerName) => {
        return get().customOrders.filter(order => order.buyer === buyerName)
      },
      
      deleteCustomOrder: (orderId) => {
        set((state) => ({
          customOrders: state.customOrders.filter(order => order.id !== orderId)
        }))
      },
    }),
    {
      name: "xpartex-custom-orders",
      partialize: (state) => ({
        customOrders: state.customOrders,
      }),
    },
  ),
)

export default useCustomOrderStore
