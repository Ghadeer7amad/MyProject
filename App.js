import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './src/screens/Home';
import Chose from './src/screens/Chose';
import Signup from './src/screens/Signup';
import Settings from './src/CommonNav/Settings';
import About from './src/ChosenPages/About';
import Services from './src/ChosenPages/Servicse';
import Login from './src/screens/Login';
import Listt  from './src/screens/Listt';
import Header from './src/screens/Header';
import ProductsScreens from './src/Products/ProductsScreens';
import CardsScreen from './src/Products/CardsScreen';
import Favorite from './src/Products/Favorite';
import ProductsDetails from './src/Products/ProductsDetails';
import ProductData from './src/Products/ProductData';
import BookingScreen from './src/screens/BookingScreen';
import EmployeesScreen from './src/screens/EmployeesScreen';
import PostsScreen from './src/screens/PostsScreen';
import SalonScreen from './src/screens/SalonScreen';






const Stack = createStackNavigator();
export default function App() {
  
  return (


      /*<View style={{ flex: 1, backgroundColor: "#2470a0"}}>
         <ProductsDetails product={ProductData[4]}/>
      </View> */


    
    <NavigationContainer>
    <Stack.Navigator>

      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Chose" component={Chose} options={{ headerShown: false }} />
      <Stack.Screen name="Header" component={Header} />
      <Stack.Screen name="List" component={Listt} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="About" component={About} options={{ headerShown: false }}/>
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="ProductsScreens" component={ProductsScreens} />
      <Stack.Screen name="CardsScreen" component={CardsScreen} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="ProductsDetails" component={ProductsDetails} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="EmployeesScreen" component={EmployeesScreen}  />
      <Stack.Screen name="PostsScreen" component={PostsScreen} />
      <Stack.Screen name="SalonScreen" component={SalonScreen} />

      
      
      
    </Stack.Navigator>
    </NavigationContainer> 

    

    
   
 

  
  );
}


