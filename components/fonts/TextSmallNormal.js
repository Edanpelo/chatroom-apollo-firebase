import React from 'react'
import { StyleSheet, Text, Linking } from 'react-native'

import AppStyles from '../../config/AppStyles'

const TextSmallNormal = ({
  children,
  style,
  onPress,
  numberOfLines,
  textColorCustom,
}) => {
  const text = textColorCustom ? textColorCustom.split(' ') : null

  return (
    <>
      {textColorCustom ? (
        <Text
          style={[styles.text, style]}
          onPress={onPress}
          numberOfLines={numberOfLines}
        >
          {text.map((text, index) => {
            if (text.startsWith('**') && text.endsWith('**')) {
              const colorTextCustom = text.replace(/\*{2}/g, '')
              return (
                <Text style={{ color: 'orange' }} key={index}>
                  {colorTextCustom}{' '}
                </Text>
              )
            }
            if (text.startsWith('[') && text.endsWith(']')) {
              let colorTextCustom = text.replace(/\[/g, '')
              colorTextCustom = colorTextCustom.replace(/\]/g, '')
              return (
                <Text
                  style={{ color: 'blue', textDecorationLine: 'underline' }}
                  key={index}
                  onPress={() => Linking.openURL(colorTextCustom)}
                >
                  {colorTextCustom}{' '}
                </Text>
              )
            }
            return `${text} `
          })}
        </Text>
      ) : (
        <Text
          style={[styles.text, style]}
          onPress={onPress}
          numberOfLines={numberOfLines}
        >
          {children}
        </Text>
      )}
    </>
  )
}

export default TextSmallNormal

const styles = StyleSheet.create({
  text: {
    color: AppStyles.textSmallNormal.color,
    fontSize: AppStyles.textSmallNormal.fontSize,
    fontWeight: AppStyles.textSmallNormal.fontWeight,
    fontFamily: AppStyles.textSmallNormal.fontFamily,
  },
})
