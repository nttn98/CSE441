import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/Login';
import Home from './src/Home';
import Test from './src/Test';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AddService from './src/AddService';
import DetailService from './src/DetailService';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="DetailService" component={DetailService} />
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaProvider>
    //   <Test />
    // </SafeAreaProvider>
  );
}
