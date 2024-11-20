import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconButton} from 'react-native-paper';

import Login from './src/Login';
import Home from './src/Home';
import AddService from './src/AddService';
import DetailService from './src/DetailService';
import Customers from './src/Customers';
import AddCustomer from './src/AddCustomer';
import Transactions from './src/Transactions';
import DetailTransaction from './src/DetailTransaction';
import Setting from './src/Setting';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <IconButton icon="home" />,
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerStyle: {backgroundColor: '#FF6A89'},
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 22,
          },
          tabBarIcon: () => <IconButton icon="credit-card" />,
        }}
      />
      <Tab.Screen
        name="Customers"
        component={Customers}
        options={{
          headerStyle: {backgroundColor: '#FF6A89'},
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 22,
          },
          tabBarIcon: () => <IconButton icon="account-group" />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerStyle: {backgroundColor: '#FF6A89'},
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 22,
          },
          tabBarIcon: () => <IconButton icon="settings" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="AddService"
          component={AddService}
          options={{
            headerStyle: {backgroundColor: '#FF6A89'},
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Stack.Screen
          name="DetailService"
          component={DetailService}
          options={{
            headerStyle: {backgroundColor: '#FF6A89'},
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Stack.Screen
          name="AddCustomer"
          component={AddCustomer}
          options={{
            headerStyle: {backgroundColor: '#FF6A89'},
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Stack.Screen
          name="DetailTransaction"
          component={DetailTransaction}
          options={{
            headerStyle: {backgroundColor: '#FF6A89'},
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
