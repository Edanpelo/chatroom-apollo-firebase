import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { View, StyleSheet, Platform, ImageBackground, Text } from 'react-native'
import { GiftedChat, Bubble, Send, InputToolbar, Composer } from 'react-native-gifted-chat'
import { IconButton } from 'react-native-paper'
import uuid from 'react-native-uuid'
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies'

import PropTypes from 'prop-types'
import emojiUtils from 'emoji-utils'
import SlackMessage from './Slack/SlackMessage'

import { auth, db } from '../firebase'
import { firebase } from '@firebase/app'

export function ChatRoom({ navigation, route }) {
    const {data} = route.params;
    const USER = {
      _id: data.login.user.id,
      name: data.login.user.firstName + ' ' + data.login.user.lastName,
      avatar: 'https://fronterapp.blob.core.windows.net/user-documents/' + data.login.user.profile.photo,
    }
    // const stateNoinput = data.login.user.profile.isVerifiedDocuments
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
      const unsubscribe = db.collection('ChatRoom').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
          snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      ));
    return unsubscribe;
    }, [])

    function renderMessage(props) {
      const {
        currentMessage: { text: currText },
      } = props
      var messageTextStyle = null 
      // Make "pure emoji" messages much bigger than plain text.
      if (currText && emojiUtils.isPureEmojiString(currText)) {
        messageTextStyle = {
          fontSize: 28,
          // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
          lineHeight: Platform.OS === 'android' ? 34 : 30,
        }
      }
      return <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    }

    function renderSend(props) {
      return (
        <Send {...props}>
          <View style={styles.sendingContainer}>
            <IconButton icon="send-circle" size={32} color="#696969" />
          </View>
        </Send>
      )
    }

    function renderInputToolbar(props) {
      if (data.login.user.profile.isVerifiedDocuments !== false) {
        return <InputToolbar {...props} />
      } else {
        return( 
          <View style={styles.ToolbarContainer}>
              <Text>Verifica tu perfil para poder escribir</Text>
          </View>
        )
      }
    }

    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      const {
        _id,
        createdAt,
        text,
        user
      } = messages[0]
      db.collection('ChatRoom').add({
        _id,
        createdAt,
        text,
        user,
      })
    }, [])

    return (
      <GiftedChat
        renderInputToolbar={renderInputToolbar}
        renderMessage={renderMessage}
        placeholder="Escribir un mensaje..."
        showUserAvatar
        renderAvatarOnTop
        renderSend={renderSend}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={USER}
      />
    )
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ToolbarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})