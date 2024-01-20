import React, { useEffect } from "react";
import './i18n';
import { useTranslation } from 'react-i18next';

import { Text, View, StyleSheet, Image } from "react-native";
import {Provider} from 'react-redux';
import store from './src/redux/store';
import { DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Color from "./src/Common/Color";
import Homee from "./src/screens/Home";
import ChoseScreen from "./src/screens/ChoseScreen";
import Signup from "./src/screens/Signup";
import Settings from "./src/CommonNav/Settings";
import About from "./src/ChosenPages/About";
import Login from "./src/screens/Login";
import ProductsScreens from "./src/Products/ProductsScreens";
import ServicesScreen from "./src/Services/ServicesScreen";
import ServiceDetails from "./src/Services/ServiceDetails";
import CardsScreen from "./src/Products/CardsScreen";
import Favorite from "./src/Products/Favorite";
import ProductsDetails from "./src/Products/ProductsDetails";
import BookingScreen from "./src/screens/BookingScreen";
import EmployeesScreen from "./src/Employees/EmployeesScreen";
import EmployeesDetailsScreen from "./src/Employees/EmployeesDetails.js";
import PostsScreen from "./src/screens/PostsScreen";
import SalonScreen from "./src/screens/SalonScreen";
import PathologicalCase from "./src/screens/PathologicalCase.js";
import ForgetPage from "./src/screens/ForgetPassword.js/ForgetPage.js";
import ResetPassword from "./src/screens/ForgetPassword.js/ResetPassword.js";
import SendCode from "./src/screens/ForgetPassword.js/SendCode.js";
import AddProduct from "./AdminPage/AddProduct.js";
import AddServices from "./AdminPage/AddServices.js";
import AddEmployee from "./AdminPage/AddEmployee.js";
import AddSalon from "./AdminPage/AddSalon.js";
import AddPost from "./AdminPage/AddPost.js";
import AddJob from "./AdminPage/AddJob.js";
import MainScreen2 from "./src/screens/MainScreen2.js";
import Employee from "./src/screens/Employee.js";
import UserDetails from "./src/screens/UserDetails";
import Offers from "./src/screens/Offers.js";
import Jobs from "./src/screens/Jobs.js";
import MainJob from "./src/screens/MainJob.js";
import ApplyForaJob from "./src/screens/ApplyForaJob.js";
import AppointmentHistory from "./src/screens/AppointmentHistory";
import JobHistory from "./src/screens/JobHistory";
import EditServices from './AdminPage/EditServices.js'
import EditProfile from './AdminPage/EditProfile.js'
import EditSalon from './AdminPage/EditSalon.js'
import Advice from './src/screens/Advice.js'
import EditEmployee from './AdminPage/EditEmployee.js'
import AddManager from "./AdminPage/AddManager.js";




import { NativeBaseProvider } from "native-base";


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
    <Stack.Screen name="SalonScreen" component={SalonScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="MainScreen2" component={MainScreen2} options={{ headerShown: false }} />
    <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
    <Stack.Screen name="About" component={About} options={{ headerShown: false }}/>  
    <Stack.Screen name="ServicesScreen" component={ServicesScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="ProductsScreens" component={ProductsScreens} options={{ headerShown: false }} />
    <Stack.Screen name="CardsScreen" component={CardsScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Favorite" component={Favorite} options={{ headerShown: false }}/>
    <Stack.Screen name="ProductsDetails" component={ProductsDetails}options={{ headerShown: false }} />
    <Stack.Screen name="BookingScreen" component={BookingScreen}options={{ headerShown: false }} />
    <Stack.Screen name="AppointmentHistory" component={AppointmentHistory} options={{ headerShown: false }}  />
    <Stack.Screen name="UserDetails" component={UserDetails} options={{ headerShown: false }}  />
    <Stack.Screen name="EmployeesScreen" component={EmployeesScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EmployeesDetails" component={EmployeesDetailsScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="AddEmployee" component={AddEmployee} options={{ headerShown: false }}/>
    <Stack.Screen name="PostsScreen" component={PostsScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="ServiceDetails" component={ServiceDetails} options={{ headerShown: false }}/> 
    <Stack.Screen name="AddSalon" component={AddSalon} options={{ headerShown: false }}/>
    <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }}/>
    <Stack.Screen name="AddServices" component={AddServices} options={{ headerShown: false }}/> 
    <Stack.Screen name="AddPost" component={AddPost} options={{ headerShown: false }}/> 
    <Stack.Screen name="AddJob" component={AddJob} options={{ headerShown: false }}/> 
    <Stack.Screen name="JobHistory" component={JobHistory} options={{ headerShown: false }}  />
    <Stack.Screen name="MainJob" component={MainJob} options={{ headerShown: false }}/>
    <Stack.Screen name="Jobs" component={Jobs} options={{ headerShown: false }}/>
    <Stack.Screen name="ApplyForaJob" component={ApplyForaJob} options={{ headerShown: false }}/>
    <Stack.Screen name="EditServices" component={EditServices} options={{ headerShown: false }}/>
    <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
    <Stack.Screen name="EditSalon" component={EditSalon} options={{ headerShown: false }}/>
    <Stack.Screen name="EditEmployee" component={EditEmployee} options={{ headerShown: false }}/>
    <Stack.Screen name="Advice" component={Advice} options={{ headerShown: false }}/>
    <Stack.Screen name="AddManager" component={AddManager} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const CustomDrawerContent = (props) => {
  
  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Image
        style={{ width: 280, height: 150, marginBottom: 10 }}
        source={require("./assets/puu.jpg")}
      />

      <DrawerItem
        style={{ marginVertical: 3, ...styles.drawerItem }}
        label="HOME"
        icon={({ color, size }) => (
          <Ionicons name="home" color={Color.primary} size={size} />
        )}
        onPress={() => {
          props.navigation.navigate("MainScreen2");
        }}
      />

      <DrawerItem
        style={{ marginVertical: 3, ...styles.drawerItem }}
        label="STAFF"
        icon={({ color, size }) => (
          <Ionicons name="people" color={Color.primary} size={size} />
        )}
        onPress={() => {
          props.navigation.navigate("EmployeesScreen");
        }}
      />

      <DrawerItem
        style={{ marginVertical: 3, ...styles.drawerItem }}
        label="ABOUT"
        icon={({ color, size }) => (
          <Ionicons
            name="information-circle"
            color={Color.primary}
            size={size}
          />
        )}
        onPress={() => {
          props.navigation.navigate("About");
        }}
      />

      <DrawerItem
        style={{ marginVertical: 3, ...styles.drawerItem }}
        label="JOBS"
        icon={({ color, size }) => (
          <Ionicons name="briefcase" color={Color.primary} size={size} />
        )}
        onPress={() => {
          props.navigation.navigate("MainJob");
        }}
      />

      <DrawerItem
        style={{ marginVertical: 3, ...styles.drawerItem }}
        label="PRODUCTS"
        icon={({ color, size }) => (
          <Ionicons name="pricetag" color={Color.primary} size={size} />
        )}
        onPress={() => {
          props.navigation.navigate("ProductsScreens");
        }}
      />

      <DrawerItem
        style={{ marginVertical: 3, ...styles.drawerItem }}
        label="SERVICES"
        icon={({ color, size }) => (
          <Ionicons name="medkit" color={Color.primary} size={size} />
        )}
        onPress={() => {
          props.navigation.navigate("ServicesScreen");
        }}
      />

      <DrawerItem
        style={{ marginVertical: 3, ...styles.drawerItem }}
        label="RESERVATIONS"
        icon={({ color, size }) => (
          <Ionicons name="calendar" color={Color.primary} size={size} />
        )}
        onPress={() => {
          props.navigation.navigate("BookingScreen");
        }}
      />

      <DrawerItem
        style={{ marginVertical: 3, ...styles.drawerItem }}
        label="HISTORY"
        icon={({ color, size }) => (
          <Ionicons name="checkmark-circle" color={Color.primary} size={size} />
        )}
        onPress={() => {
          props.navigation.navigate("AppointmentHistory");
        }}
      />

     <DrawerItem
        style={{ marginVertical: 3, ...styles.drawerItem }}
        label="ADVICE"
        icon={({ color, size }) => (
          <Ionicons name="checkmark-circle" color={Color.primary} size={size} />
        )}
        onPress={() => {
          props.navigation.navigate("Advice");
        }}
      />

      <DrawerItem
        style={{ marginVertical: 3, ...styles.drawerItem }}
        label="POSTS"
        icon={({ color, size }) => (
          <Ionicons name="share" color={Color.primary} size={size} />
        )}
        onPress={() => {
          props.navigation.navigate("PostsScreen");
        }}
      />

      <DrawerItem
        style={{ marginVertical: 3, ...styles.drawerItem }}
        label="SETTINGS"
        icon={({ color, size }) => (
          <Ionicons name="settings" color={Color.primary} size={size} />
        )}
        onPress={() => {
          props.navigation.navigate("Settings");
        }}
      />

      <View
        style={{
          borderBottomColor: "gray",
          borderBottomWidth: 0.5,
          marginVertical: 90,
        }}
      />

<DrawerItem
  style={{ marginVertical: -95 }}
  label="LOG OUT"
  icon={({ color, size }) => (
    <Ionicons name="log-out" color={Color.primary} size={size} />
  )}
  onPress={() => {
    props.navigation.navigate("Homee");
  }}
 
/>

    </View>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    backgroundColor: "white", 
  },
});



const App = () => {
  return (
    
    <NativeBaseProvider>
      <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerStyle={{
            backgroundColor: "lightgray",
            width: 240,
          }}
          contentContainerStyle={{
            flex: 1,
          }}
          screenOptions={{
            drawerActiveTintColor: Color.primary,
            drawerItemStyle: styles.drawerItem, // استخدم الأنماط هنا
          }}
        >
          <Drawer.Screen
            name="Home"
            component={HomeStack}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
