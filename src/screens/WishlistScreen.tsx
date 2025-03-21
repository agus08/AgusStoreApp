import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { Product } from '../types/product';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import Icon from '@react-native-vector-icons/feather';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const handleRemoveFromWishlist = (id: number) => {
    dispatch(removeFromWishlist(id));
    ToastAndroid.show('Removed from wishlist', ToastAndroid.SHORT);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.productInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFromWishlist(item.id)}
        >
          <Icon name='trash' color="#fff" />
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Your wishlist is empty!</Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#056C5C',
    marginTop: 4,
  },
  removeButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
    backgroundColor: '#ff4d4d',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    width: 100,
  },
  removeButtonText: {
    color: '#fff',
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
});

export default WishlistScreen;
