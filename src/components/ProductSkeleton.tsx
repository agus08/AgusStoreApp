import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProductSkeleton = () => (
  <View style={styles.container}>
    <View style={styles.image} />
    <View style={styles.text} />
    <View style={styles.text} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 4,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  text: {
    width: '80%',
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 8,
  },
});

export default ProductSkeleton;
