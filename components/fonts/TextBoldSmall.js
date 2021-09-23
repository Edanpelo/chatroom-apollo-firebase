import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Colors from '../../config/Colors'

const TextBoldSmall = ({ children, style }) => {
  return <Text style={[styles.textStyle, style]}>{children}</Text>
}

export default TextBoldSmall

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
})
