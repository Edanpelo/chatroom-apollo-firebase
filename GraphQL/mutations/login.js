import * as React from "react";
import { View, Text } from "react-native";
import { gql, useMutation } from '@apollo/client'

// Define mutation
const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password){
          email,
          password
      }{
          token
      }
  }
`;

// Define gatillo


export function Login(email, password) {
    sendDataGraphQL({
      variables: {
        email: email,
        password: password,
      },
    })

    const [ sendDataGraphQL, { loading, error }] = useMutation(
        LOGIN,
        {
            onCompleted: ({data}) => {
                console.log(data.token)
                return navigation.navigate('Chat Social')
            },
            onError: () => console.log(error),
        }
        )

    if (loading) {
        return <Text>cargando...</Text>
    }
    if (error) {
        return console.log(error)
    }

    return (
        navigation.navigate('Chat Social')
    )
}