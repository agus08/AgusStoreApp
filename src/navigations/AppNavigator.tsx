import React from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';


const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          title: 'Product Detail',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
