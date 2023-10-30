import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Matrics, height } from '../../theme'
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from "react-native-modal";

const CustomModalComponent = ({ visible, setVisible, children, modalUp }) => {
  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <Modal

      testID={'modal'}
      backdropOpacity={0.4}
      style={styles.modalView}
      avoidKeyboard={true}
      animationOutTiming={300}
      hideModalContentWhileAnimating={true}
      backdropTransitionInTiming={300}
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
    >
      {children}
    </Modal>
  )
}

export default CustomModalComponent

const styles = StyleSheet.create({
  mainView: { backgroundColor: "white", justifyContent: 'flex-end', },
  subView: { backgroundColor: Colors.WHITE, borderTopLeftRadius: Matrics.ms25, borderTopRightRadius: Matrics.ms25, paddingVertical: Matrics.vs15, flex: 1 },
  modalView: {
    height: height,
    justifyContent: 'flex-end',
    margin: 0
  }
})
