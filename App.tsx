import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppNavigator from './src/navigations/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={store}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <AppNavigator />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;