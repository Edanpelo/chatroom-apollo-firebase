import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, Platform, ImageBackground, Text } from 'react-native'
import { GiftedChat, Bubble, Send, InputToolbar, Composer } from 'react-native-gifted-chat'
import { IconButton } from 'react-native-paper'
import uuid from 'react-native-uuid'
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies'

import PropTypes from 'prop-types'
import emojiUtils from 'emoji-utils'
import SlackMessage from './Slack/SlackMessage'

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

    console.log(data.login.user.profile.isVerifiedDocuments)
    const USER = {
      _id: data.login.user.id,
      name: data.login.user.firstName + ' ' + data.login.user.lastName,
      avatar: 'https://fronterapp.blob.core.windows.net/user-documents/' + data.login.user.profile.photo,
    }
    const stateNoinput = data.login.user.profile.isVerifiedDocuments
    
    const [messages, setMessages] = useState([]);

    console.log(USER);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
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

    function renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: '#696969' },
            left: { backgroundColor: '#F9B233' },
          }}
          textStyle={{
            right: { color: '#fff' },
            left: { color: '#fff' },
          }}
        />
      )
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
    }, [])

    return (
      <GiftedChat
        // renderBubble={renderBubble}
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