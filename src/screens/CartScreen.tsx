import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  removeFromCart,
  updateQuantity,
  toggleSelect,
} from '../redux/slices/cartSlice';
import { useAppDispatch } from '../redux/hooks';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CartItem } from '../types/cart';

interface MemoizedCartItemProps {
  item: CartItem;
  handleQuantityChange: (id: number, quantity: number) => void;
  toggleSelect: (id: number) => void;
}

const MemoizedCartItem = React.memo(({ item, handleQuantityChange, toggleSelect }: MemoizedCartItemProps) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity onPress={() => toggleSelect(item.id)}>
      <CheckBox
        disabled
        value={item.selected}
        tintColors={{ true: '#056C5C', false: '#ccc' }}
      />
    </TouchableOpacity>
    <Image source={{ uri: item.thumbnail }} style={styles.image} />
    <View style={styles.itemInfo}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <View style={styles.quantityContainer}>
        {/* Decrease Quantity */}
        <TouchableOpacity
          onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.quantityInput}
          value={String(item.quantity)}
          keyboardType="numeric"
          onChangeText={(value) =>
            handleQuantityChange(item.id, parseInt(value) || 0)
          }
        />

        {/* Increase Quantity */}
        <TouchableOpacity
          onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
));


const CartScreen = () => {
  const dispatch = useAppDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  // Calculate total of only selected items
  const totalAmount = items
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0);

  // Ref for Bottom Sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };


  // Handle quantity change
  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  // Handle removal of items
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    Alert.alert('Removed', 'Item removed from cart');
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  // Render Swipeable action (delete button)
  const renderRightActions = (id: number) => (
    <TouchableOpacity
      onPress={() => handleRemove(id)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  // Render each cart item
  const renderItem = useCallback(({ item }: { item: any }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      overshootRight={false}
    >
      <MemoizedCartItem
        item={item}
        handleQuantityChange={handleQuantityChange}
        toggleSelect={() => dispatch(toggleSelect(item.id))}
      />
    </Swipeable>
  ), [dispatch, handleQuantityChange, handleRemove]);


  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          getItemLayout={(data, index) => ({
            length: 107, // Height of each row
            offset: 107 * index,
            index,
          })}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      {/* Checkout Button */}
      <TouchableOpacity
        style={[
          styles.checkoutButton,
          totalAmount === 0 && styles.checkoutButtonDisabled,
        ]}
        onPress={handleOpenBottomSheet}
        disabled={totalAmount === 0}
      >
        <Text style={styles.checkoutText}>
          Checkout (${totalAmount.toFixed(2)})
        </Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
      // snapPoints={snapPoints}
      >
        <BottomSheetView style={styles.sheetContent}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          {items
            .filter((item) => item.selected)
            .map((item) => (
              <View key={item.id} style={styles.summaryItem}>
                <Text>{item.title} x{item.quantity}</Text>
                <Text>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
          <Text style={styles.summaryTotal}>
            Total: ${totalAmount.toFixed(2)}
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseBottomSheet}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    height: 107,
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#056C5C',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 30,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityInput: {
    width: 40,
    fontSize: 12,
    height: 30,
    paddingVertical: 0,
    margin: 0,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 106,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#056C5C',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonDisabled: {
    backgroundColor: '#ccc',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  sheetContent: {
    padding: 16,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default CartScreen;
