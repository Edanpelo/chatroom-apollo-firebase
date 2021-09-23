import { StyleSheet } from 'react-native'
import Colors from './Colors'

const MapColors = {
  Salud: '#66B6FF',
  Donaciones: '#42BF40',
  Trabajo: '#EF7D13',
  '¿Sabías que?': '#F94747',
  'Guía Legal': '#FFD892',
  Mapas: '#F9B233',
  'Noticias/Publicidad': '#ec1a0b',
  Educación: '#4675BA',
  defaultColor: '#000',
}

const getColorByCategory = (category) =>
  MapColors[category] || MapColors.defaultColor
export const colorCategory = (publicationsCategory) => {
  const customColor = {
    backgroundColor: getColorByCategory(publicationsCategory),
  }
  return [styles.titleText, customColor]
}

const styles = StyleSheet.create({
  titleText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
})
