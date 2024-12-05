import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IconButton, PaperProvider } from 'react-native-paper';

import AddCustomer from './src/AddCustomer';
import AddService from './src/AddService';
import Customers from './src/Customers';
import DetailCustomer from './src/DetailCustomer';
import DetailService from './src/DetailService';
import DetailTransaction from './src/DetailTransaction';
import EditCustomer from './src/EditCustomer';
import Home from './src/Home';
import Login from './src/Login';
import Setting from './src/Setting';
import Transactions from './src/Transactions';
import AddTransaction from './src/AddTransaction';
 
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
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
          name="DetailCustomer"
          component={DetailCustomer}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="EditCustomer"
          component={EditCustomer}
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
          options={{headerShown: false}} // Hide the header
          />
           <Stack.Screen
          name="AddTransaction"
          component={AddTransaction}
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
    </PaperProvider>
   );
}
