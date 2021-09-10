import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { gql, useMutation } from '@apollo/client'

export function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const LOGIN_USER = gql`
        mutation ($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
                user {
                    id
                    firstName
                    lastName
                    profile {
                        isVerifiedDocuments
                        photo
                    }
                }
            }
        }
    `

    const [sendDataGraphQL, { data, loading, error }] = useMutation(LOGIN_USER, {
        onCompleted:(data) => {return navigation.navigate('Chat Social', {data: data})}
    })
        if (loading) {
            return <Text>cargando...</Text>
        }
        if (error) {
            return console.log(error)
        }

    const Login = (email, password) => {
        sendDataGraphQL({
            variables: {
                email: email,
                password: password,
            },
        })
    }

    return (
        <View style={styles.container}>
            <Input
            placeholder='Ingrese su correo'
            label='Email'
            leftIcon={{ type: 'material', name: 'email' }}
            value={email}
            onChangeText={text => setEmail(text)}
            />
            <Input
            placeholder='Ingrese su contraseña'
            label='Password'
            leftIcon={{ type: 'material', name: 'lock' }}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            />
            <Button title="Iniciar sesión" style={styles.button} onPress={() => Login(email, password)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    button: {
        width: 100,
        marginTop: 120
    }
})