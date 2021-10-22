import React, { useState } from 'react'

import {
  Alert,
  Keyboard,
  TextInput,
  View
} from 'react-native'
import { api } from '../../services/api'
import { COLORS } from '../../theme'
import { Button } from '../Button'

import { styles } from './styles'

export function SendMessageForm() {

  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  async function handleMessageAubmit() {
    const messageFormatted = message.trim()


    if (messageFormatted.length > 0) {
      setSendingMessage(true)
      await api.post('/messages', { message: messageFormatted })

      setMessage('')
      Keyboard.dismiss()
      setSendingMessage(false)
      Alert.alert('Mensagem enviada com sucesso!')
    }
    else {
      Alert.alert('Escreva a mensagem para enviar.')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance='dark'
        placeholder='Qual a sua expectativa para o evento'
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />

      <Button
        tittle='ENVIAR MENSAGEM'
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        onPress={handleMessageAubmit}
      />

    </View>
  );
}