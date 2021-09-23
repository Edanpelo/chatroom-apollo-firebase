import React from 'react'
import { StyleSheet, Text, Linking } from 'react-native'

import AppStyles from '../../config/AppStyles'

const TextMediumBold = ({
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
                  onPress={() => Linking.openURL(colorTextCustom)}
                  key={index}
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

export default TextMediumBold

const styles = StyleSheet.create({
  text: {
    color: AppStyles.textMediumBold.color,
    fontSize: AppStyles.textMediumBold.fontSize,
    fontWeight: AppStyles.textMediumBold.fontWeight,
    fontFamily: AppStyles.textMediumBold.fontFamily,
  },
})
