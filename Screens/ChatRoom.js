import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, Platform, ImageBackground } from 'react-native'
import { GiftedChat, Bubble, Send, InputToolbar } from 'react-native-gifted-chat'
import { IconButton } from 'react-native-paper'
import uuid from 'react-native-uuid'
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies'

export function ChatRoom({ navigation, route }) {
    const {data} = route.params;
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

    function renderQuickReplies(props) {
      return <QuickReplies {...props} color="#696969" />
    }

    function renderInputToolbar(props) {
    if (stateNoinput !== false) {
      return <InputToolbar {...props} />
    }

  }

    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
      <GiftedChat
        renderQuickReplies={renderQuickReplies}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        placeholder="Escribir un mensaje..."
        showUserAvatar
        renderAvatarOnTop
        renderSend={renderSend}
        messages={messages}
        onSend={messages => onSend(messages)}
        onQuickReply={(newQuickReply) => onQuickReply(newQuickReply)}
        user={USER}
      />
    )
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})