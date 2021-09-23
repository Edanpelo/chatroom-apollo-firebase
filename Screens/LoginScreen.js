import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { gql, useMutation } from '@apollo/client'

import { auth } from '../firebase'
import { firebase } from '@firebase/app'

export function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const signInEmail = (email, password) => {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // console.error(errorMessage)
                auth.createUserWithEmailAndPassword(email,password)
                    .then((userCredential) => {
                        const user = userCredential.user
                    })
                    .catch((error) => {
                        // const errorCode = error.code
                        // const errorMessage = error.message
                        // console.error(errorMessage)
                    })
            })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // var uid = user.uid;
                // console.log(user.uid);
                // console.log(data);
                // console.log('-------------------------------')
                // console.log(user)
                if (data) {
                    navigation.navigate('Chat Social', {data: data});
                } else {

                }
            } else {

            }
        });
        return unsubscribe
    }, [])

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

    const [sendDataGraphQL, {data, loading, error }] = useMutation(LOGIN_USER, {
        onCompleted:(data) => {return navigation.navigate('Chat Social', {data: data})}
        // onCompleted:(data) => {signCustomeToken(data)}
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
        });
        signInEmail(email,password);
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