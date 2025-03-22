# 📱 **React Native Simple E-Commerce App**  

This is a simple functional **E-Commerce app** built with **React Native** using **Redux Toolkit** for state management and **React Navigation** for seamless screen transitions. The app includes essential features such as:  

- 🛒 Product listing with search and category filters  
- ❤️ Wishlist feature with local storage persistence  
- 🛍️ Add to cart, update quantity, and swipe to delete  
- 📦 Checkout process with an order summary  
- 🌟 Product details with reviews and rating  

---  

## 🚀 **Features**  

### ✅ **1. Product Listing**
- Display products in a grid format (2 items per row)  
- Search functionality with debounce for performance  
- Category-based filtering  
- Skeleton loader while fetching products  

---

### ✅ **2. Product Details**
- View detailed product information  
- Add product to cart  
- Add product to wishlist (persistent via local storage)  

---

### ✅ **3. Wishlist**
- Save products to wishlist  
- Remove products from wishlist  
- Sync across sessions using AsyncStorage  

---

### ✅ **4. Cart**
- Add/remove items to/from cart  
- Change quantity directly in the cart  
- Swipe to delete  
- Checkbox for selecting items for checkout  
- Display total based on selected items  

---

### ✅ **5. Checkout**
- Display order summary in a bottom sheet  
- Dynamic total calculation based on selected items  

---

## 🏎️ **Optimizations and Best Practices**  

### 🔥 **1. Performance Optimizations**
✅ **Memoization** using `React.memo` and `useCallback` to prevent unnecessary renders.  
✅ **Virtualized List** using `FlatList` for efficient rendering of large lists.  
✅ **Optimized State Management** with Redux Toolkit to avoid prop drilling and reduce state complexity.  
✅ **Batch Updates** by using Redux `createAsyncThunk` for API calls to avoid race conditions.  
✅ **Skeleton Loaders** while fetching data to enhance UX.  

---

### 💾 **2. Efficient Local Storage Handling**
✅ Products in the wishlist are persisted using `AsyncStorage`.  
✅ Wishlist state is hydrated on app launch for a seamless experience.  

---

### ✨ **3. Clean Navigation Structure**
✅ `React Navigation` for managing nested stacks and tab navigation.  
✅ Safe area handling using `react-native-safe-area-context` to avoid UI overlap.  
✅ Deep linking support and consistent navigation props handling.  

---

## 💻 **Tech Stack**  
| Technology | Purpose |  
|------------|---------|  
| **React Native** | Core framework |  
| **Redux Toolkit** | State management |  
| **React Navigation** | Navigation |  
| **AsyncStorage** | Local storage |  
| **Axios/Fetch** | API calls |  
| **Swipeable** | Swipe actions |  
| **BottomSheet** | Order summary modal |  
| **React Native Vector Icons** | Icons |  

---

## ⚙️ **Installation**  

1. Clone the repository:  
```bash
git clone https://github.com/agus08/AgusStoreApp.git
```

2. Install dependencies:  
```bash
npm install
```

3. Install CocoaPods (iOS only):  
```bash
cd ios && pod install
```

4. Start the metro in independent terminal:  
```bash
npm start
```

4. Run the app:  
```bash
npm run android
npx run ios
```

---

## 🔑 **API Reference**  

### 📥 **Fetch Products**
```bash
GET https://dummyjson.com/products
```

### 📥 **Search Products**
```bash
GET https://dummyjson.com/products/search?q=<query>
```

### 📥 **Fetch Categories**
```bash
GET https://dummyjson.com/products/categories
```

### 📥 **Fetch Product Details**
```bash
GET https://dummyjson.com/products/<id>
```

---

## 🌟 **How It Works**  

### **🔹 Product List**
- On launch, products and categories are fetched using `createAsyncThunk` for clean state management.  
- Products are displayed using a virtualized `FlatList` for efficient rendering.  
- Searching and category-based filtering use debouncing to reduce network calls.  

### **🔹 Product Details**
- Clicking on a product opens the detail page using `React Navigation`.  
- Add to cart and add to wishlist functionality updates state immediately.  

### **🔹 Wishlist**
- Wishlist items are stored in `AsyncStorage` and hydrated on launch.  

### **🔹 Cart**
- Checkbox-based selection and real-time quantity updates.  
- Swipe to delete using `react-native-gesture-handler`.  

### **🔹 Checkout**
- Bottom sheet displays an order summary with real-time total calculation.  

---

## 🧹 **Code Organization**  

```bash
src  
├── components/               # Reusable components  
├── navigation/               # Stack and tab navigators  
├── redux/                    # Redux Toolkit setup  
├── screens/                  # Screens (ProductList, Details, Cart, etc.)  
├── types/                    # TypeScript types  
```

---

## ✅ **To Do**  
- [ ] Add count badge for whislist and cart
- [ ] Improve UI/UX for Better Engagement  

---
