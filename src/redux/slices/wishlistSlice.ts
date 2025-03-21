import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const saveToStorage = async (items: Product[]) => {
  try {
    await AsyncStorage.setItem('wishlist', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save wishlist:', error);
  }
};

const loadFromStorage = async (): Promise<Product[]> => {
  try {
    const data = await AsyncStorage.getItem('wishlist');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load wishlist:', error);
    return [];
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToStorage(state.items);
    },
    setWishlist: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;

export const loadWishlist = () => async (dispatch: any) => {
  const items = await loadFromStorage();
  dispatch(setWishlist(items));
};

export default wishlistSlice.reducer;
