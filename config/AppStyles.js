import { Platform } from 'react-native'

import Colors from './Colors'

const fontSizeBase = Platform.OS === 'android' ? 'Roboto' : 'Avenir'

export default {
  spaceMoleculesFeeds: 8,
  textSmallNormal: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fontSizeBase,
    lineHeight: 3,
  },
  textSmallBold: {
    color: Colors.gray,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fontSizeBase,
    lineHeight: 3,
  },
  textMediumBold: {
    color: Colors.gray,
    fontSize: 25,
    fontWeight: '500',
    fontFamily: fontSizeBase,
    lineHeight: 3,
  },
  textLargeBold: {
    color: Colors.black,
    fontSize: 40,
    fontWeight: '500',
    fontFamily: fontSizeBase,
    lineHeight: 3,
  },
  shadow: {
    shadowColor: '#e4e3e3',
    shadowOffset: {
      width: 9,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    elevation: 2.5,
  },
}
