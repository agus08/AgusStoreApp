import React from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Category } from '../types/product';

type Props = {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
};

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: Props) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.slug}
          onPress={() => onSelectCategory(category.slug)}
          style={[
            styles.categoryItem,
            selectedCategory === category.slug ? styles.selected : {},
          ]}
        >
          <Text style={
            [
              styles.text,
              selectedCategory === category.slug ? styles.textSelected : {},
            ]
          }>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    maxHeight: 40,
    marginBottom: 8,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 8,
  },
  selected: {
    backgroundColor: '#056C5C',
  },
  text: {
    fontSize: 14,
    color: '#000',
  },
  textSelected: {
    color: '#fff',
  }
});

export default CategoryFilter;
