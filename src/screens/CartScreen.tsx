import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Alert } from 'react-native';

const CartScreen = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 12, backgroundColor: '#fff', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: ${item.price}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={{
        backgroundColor: '#056C5C',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
      }}
        onPress={() => Alert.alert(`Checkout Total: $${totalAmount}`)}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
          Checkout (${totalAmount})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;
