import React from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import TextMediumBold from '../components/fonts/TextMediumBold'
import TextSmallNormal from '../components/fonts/TextSmallNormal'

import Colors from '../config/Colors'

export function reportCommentScreen({navigation, route}) {
    const {data} = route.params;
    const allReports = [
        {
            id: '0',
            description: 'Spam',
        },
        {
            id: '1',
            description: 'Contenido sexual',
        },
        {
            id: '2',
            description: 'Contenido ofensivo',
        },
        {
            id: '3',
            description: 'Suplantación de identidad',
        },
        {
            id: '4',
            description: 'Otro',
        }
    ]

    const reports = allReports.map((report) => {
        return {
            id: report.id,
            label: report.description,
        }
    })

    return (
    <ScrollView>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <TextMediumBold
            style={[styles.marginBottom, { color: Colors.black }]}
          >
            Denunciar un comentario
          </TextMediumBold>
          <TextSmallNormal
            style={[styles.marginBottom, { color: Colors.gray }]}
          >
            Cuéntanos por que denuncias este comentario, a nuestro equipo de soporte no le
            vendría mal un poco de trabajo.
          </TextSmallNormal>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: 'white',
  },
  marginBottom: {
    marginBottom: 16,
  },

  imageStyles: {
    width: 300,
    height: 300,
  },
})