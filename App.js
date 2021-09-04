import * as React from "react";
import { View, Text } from "react-native";
import { ApolloProvider } from "@apollo/client";
import { ExchangeRates } from "./GraphQL/queries/ExchangeRates";
import apolloClient from "./apolloClient";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Universal React with Expo</Text>
          <ExchangeRates />
        </View>
    </ApolloProvider>
  );
}