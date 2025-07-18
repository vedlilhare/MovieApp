import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreens from '../screens/PersonScreens';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen  name = "Home" options={{headerShown: false}} component={HomeScreen}/>
        <Stack.Screen  name = "Movie" options={{headerShown: false}} component={MovieScreen}/>
        <Stack.Screen  name = "Person" options={{headerShown: false}} component={PersonScreens}/>
        <Stack.Screen  name = "Search" options={{headerShown: false}} component={SearchScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation