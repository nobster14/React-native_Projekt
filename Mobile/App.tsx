import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FlatsScreen } from './components/flatsScreen';
import { BookingsScreen } from './components/bookingScreen';
import { Feather } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}