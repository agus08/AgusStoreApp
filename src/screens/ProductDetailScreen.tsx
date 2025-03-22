import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { Product } from '../types/product';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute<ProductDetailScreenRouteProp>();

  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const data: Product = await response.json();
        setProduct(data);
        checkWishlist(data.id);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const checkWishlist = async (id: number) => {
      const storedWishlist = await AsyncStorage.getItem('wishlist');
      if (storedWishlist) {
        const wishlistItems: Product[] = JSON.parse(storedWishlist);
        setIsInWishlist(wishlistItems.some(item => item.id === id));
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity: 1 }));
      ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
    }
  };

  const handleWishlist = async () => {
    if (product) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
        ToastAndroid.show('Removed from wishlist', ToastAndroid.SHORT);
      } else {
        dispatch(addToWishlist(product));
        ToastAndroid.show('Added to wishlist', ToastAndroid.SHORT);
      }
      setIsInWishlist(!isInWishlist);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#056C5C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/*  Product Images */}
      <Image source={{ uri: product?.thumbnail }} style={styles.image} />
      {/* Product Details */}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={[
        styles.stock,
        product.availabilityStatus === 'Low Stock' ? { color: 'red' } : { color: '#056C5C' }
      ]}>{product.availabilityStatus}</Text>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      {/* Wishlist Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isInWishlist ? 'gray' : 'orange' },
        ]}
        onPress={handleWishlist}
      >
        <Text style={styles.buttonText}>
          {isInWishlist ? 'Remove from Wishlist' : 'Save to Wishlist'}
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 16, marginTop: 8 }}>
        {product.reviews.length} Reviews
      </Text>
      {/* Reviews */}
      <FlatList
        data={product.reviews}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.review}>
            <Text style={styles.reviewText}>{item.comment}</Text>
            <Text style={styles.reviewerName}>- {item.reviewerName}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#056C5C',
    marginTop: 12,
  },
  stock: {
    fontSize: 16,
    color: '#056C5C', // TODO: Change color based on stock status
    marginTop: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#056C5C',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  review: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
  reviewerName: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default ProductDetailScreen;
