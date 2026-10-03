import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(persist((set, get) => ({
  items: [],
  addToCart: (product, size, color, quantity = 1) => set((state) => {
    const key = `${product.id}-${size}-${color}`
    const current = state.items.find((item) => item.key === key)
    return {
      items: current
        ? state.items.map((item) => item.key === key ? { ...item, quantity: item.quantity + quantity } : item)
        : [...state.items, { key, product, size, color, quantity }],
    }
  }),
  removeFromCart: (key) => set((state) => ({ items: state.items.filter((item) => item.key !== key) })),
  updateQuantity: (key, quantity) => set((state) => ({
    items: quantity < 1
      ? state.items.filter((item) => item.key !== key)
      : state.items.map((item) => item.key === key ? { ...item, quantity } : item),
  })),
  clearCart: () => set({ items: [] }),
  subtotal: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}), { name: 'pairoz-cart', version: 1 }))

export const useWishlistStore = create(persist((set, get) => ({
  items: [],
  toggleWishlist: (product) => set((state) => ({
    items: state.items.some((item) => item.id === product.id)
      ? state.items.filter((item) => item.id !== product.id)
      : [...state.items, product],
  })),
  isInWishlist: (productId) => get().items.some((item) => item.id === productId),
  removeFromWishlist: (productId) => set((state) => ({ items: state.items.filter((item) => item.id !== productId) })),
}), { name: 'pairoz-wishlist', version: 1 }))

export const useFilterStore = create((set) => ({
  selectedCategory: '',
  selectedBrand: '',
  priceRange: [0, 20000],
  selectedSizes: [],
  selectedColors: [],
  sortBy: 'newest',
  searchQuery: '',
  setFilter: (key, value) => set({ [key]: value }),
  toggleArrayFilter: (key, value) => set((state) => ({
    [key]: state[key].includes(value) ? state[key].filter((item) => item !== value) : [...state[key], value],
  })),
  clearFilters: () => set({
    selectedCategory: '',
    selectedBrand: '',
    priceRange: [0, 20000],
    selectedSizes: [],
    selectedColors: [],
    searchQuery: '',
  }),
}))
