import "./global.css";
import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppNavigation from "./navigation/AppNavigation";
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
  
    <Provider store={store}>
 <AppNavigation/>
    </Provider>
   
  
   

  )
}

export default App