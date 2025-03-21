import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../screens/ProductListScreen';
import WishlistScreen from '../screens/WishlistScreen';
import CartScreen from '../screens/CartScreen';

import Icon from '@react-native-vector-icons/feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {

          if (route.name === 'Home') {
            return <Icon name="home" size={size} color={color} />
          } else if (route.name === 'Wishlist') {
            return <Icon name="heart" size={size} color={color} />
          } else if (route.name === 'Cart') {
            return <Icon name="shopping-cart" size={size} color={color} />
          }
        },
        tabBarActiveTintColor: '#056C5C',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: Math.max(insets.bottom, 16) + 60,
          paddingBottom: Math.max(insets.bottom, 16),
          backgroundColor: '#f8f8f8',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        },
      })}
    >
      <Tab.Screen
        name="Home" component={ProductListScreen}
        options={{
          headerShown: false, // Hide header
        }}
      />

      <Tab.Screen name="Wishlist" component={WishlistScreen} />

      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
