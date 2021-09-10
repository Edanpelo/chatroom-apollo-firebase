import * as React from "react";
import { View, Text } from "react-native";
import { ApolloProvider } from "@apollo/client";
import { ExchangeRates } from "./GraphQL/queries/ExchangeRates";
import apolloClient from "./apolloClient";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { LoginScreen } from './Screens/LoginScreen'
import { ChatRoom }  from './Screens/ChatRoom'

const Stack = createStackNavigator();
export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Iniciar sesión" component={LoginScreen} />
          <Stack.Screen name="Chat Social" component={ChatRoom} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}