import React from 'react'
import { StyleSheet, Text } from 'react-native'

import AppStyles from '../../config/AppStyles'

const TextSmallBold = ({ children, style, onPress, numberOfLines }) => {
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

export default TextSmallBold

const styles = StyleSheet.create({
  text: {
    color: AppStyles.textSmallBold.color,
    fontSize: AppStyles.textSmallBold.fontSize,
    fontWeight: AppStyles.textSmallBold.fontWeight,
    fontFamily: AppStyles.textSmallBold.fontFamily,
  },
})
