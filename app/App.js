import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando as Telas
import HomeScreen from './src/screens/HomeScreen';
import CandidateProfileScreen from './src/screens/CandidateProfileScreen';
import CollectionScreen from './src/screens/CollectionScreen';
import ChartScreen from './src/screens/ChartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{ headerShown: false }} // Usamos headers customizados nas telas
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CandidateProfile" component={CandidateProfileScreen} />
        <Stack.Screen name="Collection" component={CollectionScreen} />
        <Stack.Screen name="Chart" component={ChartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
