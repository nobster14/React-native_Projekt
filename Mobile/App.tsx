import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatsScreen } from './components/flatsScreen';
import { BookingsScreen } from './components/bookingScreen';
import { LoginScreen, RegisterScreen } from './components/loginScreen';
import { Feather } from '@expo/vector-icons';
import { FlatItemDetailsScreen } from './components/flatItemDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Flats') 
            return <Feather name="home" size={size} color={color} />;
          
          else if (route.name === 'Bookings') 
            return <Feather name="book" size={size} color={color}/>
          
          return null;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>       
        <Tab.Screen name="Flats" component={FlatsScreen} />
        <Tab.Screen name="Bookings" component={BookingsScreen} />
      </Tab.Navigator>
  );
}


export default function App() {
  const [loginToken, setLoginToken] = React.useState("");

  return (
    <NavigationContainer>
      {loginToken != "" ? (
        <Stack.Navigator>
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}} />
          <Stack.Screen name="FlatItemDetails" component={FlatItemDetailsScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} initialParams={{loginToken, setLoginToken}}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}