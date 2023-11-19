import React from "react";
import { View } from "react-native";
import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';



import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Color from "./src/Common/Color";

import Header from './src/screens/Header';
import Homee from './src/screens/Home';
import ChoseScreen from './src/screens/ChoseScreen'
import Chose from './src/screens/Chose';
import Signup from './src/screens/Signup';
import Settings from './src/CommonNav/Settings';
import About from './src/ChosenPages/About';
import Login from './src/screens/Login';
import ProductsScreens from './src/Products/ProductsScreens';
import ServicesScreen from './src/Services/ServicesScreen';
import ServiceDetails from './src/Services/ServiceDetails';
import CardsScreen from './src/Products/CardsScreen';
import Favorite from './src/Products/Favorite';
import ProductsDetails from './src/Products/ProductsDetails';
import BookingScreen from './src/screens/BookingScreen';
import EmployeesScreen from './src/screens/EmployeesScreen';
import PostsScreen from './src/screens/PostsScreen';
import SalonScreen from './src/screens/SalonScreen';
import PathologicalCase from "./src/screens/PathologicalCase.js"
import ForgetPage from "./src/screens/ForgetPassword.js/ForgetPage.js"
import ResetPassword from "./src/screens/ForgetPassword.js/ResetPassword.js"
import SendCode from "./src/screens/ForgetPassword.js/SendCode.js"
import AddProduct from "./AdminPage/AddProduct.js"
import AddServices from './AdminPage/AddServices.js'
import MainScreen2 from './src/screens/MainScreen2.js'
import Employee from "./src/screens/Employee.js";
import Offers from './src/screens/Offers.js'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Homee" component={Homee} options={{ headerShown: false }}  />
    <Stack.Screen name="Employee" component={Employee} options={{ headerShown: false }}  />
    <Stack.Screen name="Offers" component={Offers} options={{ headerShown: false }}  />
    <Stack.Screen name="ChoseScreen" component={ChoseScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
    <Stack.Screen name="ForgetPage" component={ForgetPage} options={{ headerShown: false }}/>
    <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }}/>
    <Stack.Screen name="SendCode" component={SendCode} options={{ headerShown: false }}/>
    <Stack.Screen name="PathologicalCase" component={PathologicalCase} options={{ headerShown: false }}/>
    <Stack.Screen name="Chose" component={Chose} options={{ headerShown: false }} />
    <Stack.Screen name="MainScreen2" component={MainScreen2} options={{ headerShown: false }} />
    <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
    <Stack.Screen name="About" component={About} options={{ headerShown: false }}/>
    <Stack.Screen name="ServicesScreen" component={ServicesScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="ProductsScreens" component={ProductsScreens} options={{ headerShown: false }} />
    <Stack.Screen name="CardsScreen" component={CardsScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Favorite" component={Favorite} options={{ headerShown: false }}/>
    <Stack.Screen name="ProductsDetails" component={ProductsDetails}options={{ headerShown: false }} />
    <Stack.Screen name="BookingScreen" component={BookingScreen}options={{ headerShown: false }} />
    <Stack.Screen name="EmployeesScreen" component={EmployeesScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PostsScreen" component={PostsScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="SalonScreen" component={SalonScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="ServiceDetails" component={ServiceDetails} options={{ headerShown: false }}/>
    <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }}/>
    <Stack.Screen name="AddServices" component={AddServices} options={{ headerShown: false }}/>
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
        <Drawer.Screen name="EmployeesScreen" component={EmployeesScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="About" component={About} options={{ headerShown: false }}/>
        <Drawer.Screen name="Products" component={ProductsScreens} options={{ headerShown: false }}/>
        <Drawer.Screen name="ServicesScreen" component={ServicesScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Reservations" component={BookingScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Posts" component={PostsScreen} options={{ headerShown: false }}/>
        <Drawer.Screen name="Settings" component={Settings}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
