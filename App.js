import React from "react";
import { View } from "react-native";
import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';



import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Color from "./src/Common/Color";

import Header from './src/screens/Header';
import Home from './src/screens/Home';
import Chose from './src/screens/Chose';
import Signup from './src/screens/Signup';
import Settings from './src/CommonNav/Settings';
import About from './src/ChosenPages/About';
import Services from './src/ChosenPages/Servicse';
import Login from './src/screens/Login';
import ProductsScreens from './src/Products/ProductsScreens';
import CardsScreen from './src/Products/CardsScreen';
import Favorite from './src/Products/Favorite';
import ProductsDetails from './src/Products/ProductsDetails';
import ProductData from './src/Products/ProductData';
import BookingScreen from './src/screens/BookingScreen';
import EmployeesScreen from './src/screens/EmployeesScreen';
import PostsScreen from './src/screens/PostsScreen';
import SalonScreen from './src/screens/SalonScreen';
import Staff from "./src/ChosenPages/Servicse";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
    <Stack.Screen name="Chose" component={Chose} options={{ headerShown: false }} />
    <Stack.Screen name="Header" component={Header} options={{ headerShown: false }} />
    <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
    <Stack.Screen name="About" component={About} options={{ headerShown: false }}/>
    <Stack.Screen name="Services" component={Services} options={{ headerShown: false }}/>
    <Stack.Screen name="ProductsScreens" component={ProductsScreens} options={{ headerShown: false }} />
    <Stack.Screen name="CardsScreen" component={CardsScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Favorite" component={Favorite} options={{ headerShown: false }}/>
    <Stack.Screen name="ProductsDetails" component={ProductsDetails}options={{ headerShown: false }} />
    <Stack.Screen name="BookingScreen" component={BookingScreen}options={{ headerShown: false }} />
    <Stack.Screen name="EmployeesScreen" component={EmployeesScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PostsScreen" component={PostsScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="SalonScreen" component={SalonScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const CustomDrawerContent = (props) => {
  return (
    <View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        icon={({ color, size }) => <Ionicons name="log-out" color={Color.primary} size={size} />}
        onPress={() => {
          // اضفي الأكواد هنا لتسجيل الخروج
        }}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerContentOptions={{
          activeTintColor: Color.yell, // لتحديد اللون عند النقر
          itemStyle: { marginVertical: 5, color: 'purple' }, // تخصيص الستايل
        }}
      >
        <Drawer.Screen name="Home" component={HomeStack} options={{ headerShown: false }}/>
        <Drawer.Screen name="Staff" component={Staff} options={{ headerShown: false }}/>
        <Drawer.Screen name="About" component={About} options={{ headerShown: false }}/>
        <Drawer.Screen name="Products" component={ProductsScreens} options={{ headerShown: false }}/>
        <Drawer.Screen name="Services" component={Services} options={{ headerShown: false }}/>
        <Drawer.Screen name="Reservations" component={BookingScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Posts" component={PostsScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Settings" component={Settings}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
