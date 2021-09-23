import React from 'react'
import { StyleSheet, Text } from 'react-native'

import AppStyles from '../../config/AppStyles'

const TextLargeBold = ({ children, style, onPress, numberOfLines }) => {
  return (
    <Text
      style={[styles.text, style]}
      onPress={onPress}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  )
}

export default TextLargeBold

const styles = StyleSheet.create({
  text: {
    color: AppStyles.textLargeBold.color,
    fontSize: AppStyles.textLargeBold.fontSize,
    fontWeight: AppStyles.textLargeBold.fontWeight,
    fontFamily: AppStyles.textLargeBold.fontFamily,
  },
})
