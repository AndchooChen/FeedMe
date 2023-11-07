import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import JournalScreen from '../screens/JournalScreen';
import FoodInfoScreen from '../screens/FoodInfoScreen'; 
import FoodSearchScreen from '../screens/FoodSearchScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
            headerShown: false,
            animation: 'none',
        }}
      >
        <Stack.Screen
            name="Login"
            component={LoginScreen}
        />
        <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
        />
        <Stack.Screen
            name="Home"
            component={HomeScreen}
        />
        <Stack.Screen 
            name="Journal" 
            component={JournalScreen} 
        />
        <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
        />
        <Stack.Screen 
            name="FoodInfo" 
            component={FoodInfoScreen} 
        />
        <Stack.Screen 
            name="FoodSearch" 
            component={FoodSearchScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
