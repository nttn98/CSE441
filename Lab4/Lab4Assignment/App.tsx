import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {PaperProvider} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {Provider} from 'react-redux';
import {Contacts} from './src/Contacts';
import {ProfileContact} from './src/ProfileContact';
import Store from './src/Store';
import {Favorites} from './src/Favorites';

const Stack = createStackNavigator();

function ContactsScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="ContactList"
        component={Contacts}
        options={{title: 'Contact list'}}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{title: 'Profile Contact'}}
      />
    </Stack.Navigator>
  );
}

function FavoriteScreens() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{title: 'Favorites'}}
      />
      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{title: 'Profile Contact'}}
      />
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="ContactsScreens"
      barStyle={{backgroundColor: 'blue'}}
      labeled={false}
      inactiveColor="greyDark">
      <Tab.Screen
        name="Contacts"
        component={ContactsScreens}
        options={{
          tabBarIcon: 'format-list-bulleted',
        }}></Tab.Screen>
      <Tab.Screen
        name="FavoriteScreens"
        component={FavoriteScreens}
        options={{
          tabBarIcon: 'star-check',
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="ContactsScreens" component={ContactsScreens} />
      <Drawer.Screen name="FavoriteScreens" component={FavoriteScreens} />
    </Drawer.Navigator>
  );
};
export default function App() {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
