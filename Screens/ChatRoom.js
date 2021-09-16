import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, Platform, ImageBackground, Text } from 'react-native'
import { GiftedChat, Bubble, Send, InputToolbar, Composer } from 'react-native-gifted-chat'
import { IconButton } from 'react-native-paper'
import uuid from 'react-native-uuid'
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies'

import PropTypes from 'prop-types'
import emojiUtils from 'emoji-utils'
import SlackMessage from './Slack/SlackMessage'

import { auth, db } from '../firebase'

export function ChatRoom({ navigation, route }) {
    const {data} = route.params;

    // const data = {
    //   login:{
    //     user: { 
    //       id: 1,
    //       firstName: "Eddie",
    //       lastName: "Perez",
    //       profile: {
    //         isVerifiedDocuments: false,
    //         photo: null,
    //       }
    //     }
    //   }
    // }

    // console.log(data.login.user.profile.isVerifiedDocuments)

    const USER = {
      _id: data.login.user.id,
      name: data.login.user.firstName + ' ' + data.login.user.lastName,
      avatar: 'https://fronterapp.blob.core.windows.net/user-documents/' + data.login.user.profile.photo,
    }
    const stateNoinput = data.login.user.profile.isVerifiedDocuments
    
    const [messages, setMessages] = useState([]);

    // console.log(USER);

    // console.log(data.login.token);

    useEffect(() => {
      // const unsubscribe = auth.signInWithCustomToken(data.login.token)
      //   .then((userCredential) => {
      //     // Signed in
      //     var user = userCredential.user;
      //     console.log(user);
      //     console.log('Its Ok...');
      //     // ...
      //   })
      //   .catch((error) => {
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     // ...
      //   });
      
    }, [])

    function renderMessage(props) {
      const {
        currentMessage: { text: currText },
      } = props

      const messageTextStyle = null

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
      if (stateNoinput !== false) {
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