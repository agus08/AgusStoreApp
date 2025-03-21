import Icon from '@react-native-vector-icons/feather';
import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

interface Props {
  onSearch: (text: string) => void;
}

const CustomHeader = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#999" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default CustomHeader;
