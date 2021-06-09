import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import landingpage from './src/screens/landingpage';
import signin from './src/screens/signin';
import SignUpScreen1 from './src/screens/signup/step1';
import SignUpScreen2 from './src/screens/signup/step2';
import SignUpScreen3 from './src/screens/signup/step3';
import Home from './src/screens/home';


const Stack = createStackNavigator();


function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
          name="LandingPage" 
          component={landingpage}
          options={{headerShown:false}} />
          <Stack.Screen 
          name="Connexion" 
          component={signin}
          options={{headerShown:false}} />
          <Stack.Screen 
          name="Inscription1" 
          component={SignUpScreen1}
          options={{headerShown:false}} />
          <Stack.Screen 
          name="Inscription2" 
          component={SignUpScreen2}
          options={{headerShown:false}} />
          <Stack.Screen 
          name="Inscription3" 
          component={SignUpScreen3}
          options={{headerShown:false}} />
           <Stack.Screen 
          name="Home" 
          component={Home}
          options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;