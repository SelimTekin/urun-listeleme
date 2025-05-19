import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../models/Product";

interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  setProducts: (products: Product[]) => void;
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      setProducts: (products) => set({ products }),

      addToCart: (product) => {
        const existing = get().cart.find(
          (item) => item.product.id === product.id
        );
        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [
              { product, quantity: 1, addedAt: new Date() },
              ...get().cart,
            ],
          });
        }
      },

      updateQuantity: (id, quantity) =>
        set({
          cart: get().cart.map((item) =>
            item.product.id === id ? { ...item, quantity } : item
          ),
        }),

      removeFromCart: (id) =>
        set({
          cart: get().cart.filter((item) => item.product.id !== id),
        }),
    }),
    {
      name: "cart-storage", // localStorage key
      partialize: (state) => ({ cart: state.cart }), // sadece `cart` alanını sakla
    }
  )
);
