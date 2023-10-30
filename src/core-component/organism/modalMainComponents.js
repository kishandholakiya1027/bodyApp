/* eslint-disable react/no-children-prop */
import React from 'react'
import Modal from "react-native-modal";
import { View, Pressable, KeyboardAvoidingView, Text } from 'react-native';
import { ColorStatus, PreSettlement } from '../../molecules';
import styles from './modalStyle';
import { Colors, height } from '../../theme';
import TextComponent from '../atom/TextComponent';
import { IS_ANDROID } from '../../core-utils/utils';

const MainModal = ({ visible, content, type, headerText, updateState, selectState, onDecline, checked }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        onDecline(false)
      }}
      testID={'modal'}
      backdropOpacity={0.4}
      style={styles.modalView}
      avoidKeyboard={true}
      animationOutTiming={300}
      hideModalContentWhileAnimating={true}
      backdropTransitionInTiming={300}
    >
      <View style={[styles.mainView, { height: height / 2 }]}>
        <View style={[styles.subView, { backgroundColor: headerText ? Colors.WHITE : Colors.BACKGROUND }]}>
          {
            headerText ?
              <View style={[styles.lableView]}>
                <View style={{}}>
                  <TextComponent children={headerText.title} color={Colors.BLACK} style={[styles.headerlable]} />
                </View>
                {
                  headerText?.rightText ?
                    <Pressable onPress={() => onDecline()} style={[]}>
                      <TextComponent children={headerText.rightText} color={Colors.TEXTBLUE} style={[C_Style.sfuiFMedium, styles.headerlable]} />
                    </Pressable>
                    : null
                }
              </View>
              : null
          }

          <Text>frgtrt</Text>
          {/* {
              type === 'caseStatus' ?
                <View style={[styles.pH15, { paddingBottom: Matrics.vs80 }]}>
                  <GFlatList
                    content={content}
                    listType={'list'}
                    current={'caseStatus'}
                    updateState={updateState}
                  />
                </View>
                : null
            } */}
          {/* {
              type === 'createEvent' ?
                <>
                  <View style={[styles.contentView]}>
                    <CreateCaseEvent
                      content={content}
                      selectType={selectType}
                      selectTodoIndex={selectTodoIndex}
                      upadeteTodoTabIndex={(i) => upadeteTodoTabIndex(i)}
                      type={type}
                      id={id}
                      onDecline={onDecline}
                      formData={formData}
                      updateState={(data) => updateState(data)}
                      clearText={(data) => {
                        clearText(data)
                      }}
                      submitEvent={() => submitEvent()} />
                  </View>
                </>
                : null
            } */}
        </View>
      </View>
    </Modal>
  )
};

export default MainModal;
