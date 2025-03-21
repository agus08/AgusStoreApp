import React, { useEffect, useState } from 'react';
import {
  FlatList,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/hooks';
import {
  fetchProducts,
  fetchCategories,
  searchProducts,
  fetchProductsByCategory,
  setLoading,
} from '../redux/slices/productSlice';
import { Product } from '../types/product';
import CategoryFilter from '../components/CategoryFilter';
import ProductSkeleton from '../components/ProductSkeleton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import Icon from '@react-native-vector-icons/feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ProductListScreen = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { products, categories, loading } = useSelector((state: RootState) => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  //  Handle Search
  const handleSearch = () => {
    if (searchTerm) {
      setSelectedCategory(null);
      dispatch(setLoading(true));
      dispatch(searchProducts(searchTerm));
    } else {
      dispatch(fetchProducts());
    }
  };

  // Handle Category Selection
  const handleSelectCategory = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSearchTerm('');
    dispatch(setLoading(true));
    dispatch(fetchProductsByCategory(categorySlug));
  };

  //  Render Individual Product Card
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.review}>
        <Icon name='star' color="orange" />
        {item.rating.toFixed(1)} | {item.reviews.length} Reviews
      </Text>
    </TouchableOpacity>
  );

  //  Render Skeleton Loader for Loading State
  const renderSkeleton = () => <ProductSkeleton />;

  return (
    <View style={[
      styles.container,
      {
        paddingTop: insets.top + 8,
      }
    ]}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
        clearButtonMode="always"
        placeholderTextColor={'#999'}
      />

      {/*  Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory || ''}
        onSelectCategory={handleSelectCategory}
      />

      {/*  Product List */}
      <FlatList
        data={loading ? Array.from({ length: 6 }) as any[] : products}
        keyExtractor={(item, index) => loading ? index.toString() : item.id.toString()}
        renderItem={loading ? renderSkeleton : renderItem}
        numColumns={2} //  Display 2 items per row
        columnWrapperStyle={styles.columnWrapper} //  Spacing between items
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80, //  Prevent overlap with tab bar
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  searchInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  columnWrapper: {
    justifyContent: 'space-between', //  Consistent spacing between products
  },
  productCard: {
    flex: 1, //  Makes each card occupy equal space
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#056C5C',
    marginTop: 4,
  },
  review: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
});

export default ProductListScreen;
