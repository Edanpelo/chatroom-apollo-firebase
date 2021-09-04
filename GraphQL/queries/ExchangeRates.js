import * as React from "react";
import { View, Text } from "react-native";
import {
  useQuery,
  gql
} from "@apollo/client";

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) {
    return <Text>cargando...</Text>
  }
  if (error) {
    return console.log(error)
  }

  return data.rates.map(({ currency, rate }) => (
    <View key={currency}>
      <Text>{currency}: {rate}</Text>
    </View>
  ));
}