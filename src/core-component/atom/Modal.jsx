import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { Matrics } from '../../theme';

const ModalComponent = ({ visible, content, onDecline, setEventName, type, labelKey, children }) => {
    console.log("🚀 ~ file: Modal.jsx:6 ~ ModalComponent ~ visible:", visible)
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => {
                onDecline(false)
            }}
            testID={'modal'}
            backdropOpacity={0.4}
            style={[{ margin: 0, justifyContent: 'flex-end', marginBottom: Matrics.vs10 }]}
            avoidKeyboard={true}
            animationOutTiming={300}
            hideModalContentWhileAnimating={true}
            backdropTransitionInTiming={300}
        >
            <View>
                {
                    content?.map((item) => {
                        let actionList = item?.actions
                        if (item?.key === 'uper') {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    borderRadius: Matrics.ms12,
                                    // marginBottom: Matrics.vs20,
                                    marginHorizontal: Matrics.hs15, marginTop: Matrics.vs10
                                    // height: 50
                                }}>
                                    {
                                        actionList?.map((action, index) => {
                                            return (
                                                <Pressable key={action?.label} onPress={() => setEventName(labelKey ? action[labelKey] : action?.label)} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: Matrics.vs18 }}>
                                                    {/* <GText color={action.color || Colors.BLACK} style={[C_Style.sfuiFRegular, styles.headerlable, { textAlign: "center" }]} >
                                {action?.label}
                              </GText> */}
                                                    <Text>  {action?.label}</Text>
                                                </Pressable>
                                            )
                                        })
                                    }
                                </View>
                            )
                        } else if (item?.key === 'lower') {
                            return (
                                <View style={[{
                                    backgroundColor: "white",
                                    borderRadius: Matrics.ms12,
                                    // marginBottom: Matrics.vs20,
                                    marginHorizontal: Matrics.hs15, marginTop: Matrics.vs10
                                    // height: 50
                                }]}>
                                    {
                                        actionList?.map((action, index) => {
                                            return (
                                                <Pressable key={action?.label} onPress={() => setEventName ? setEventName(labelKey ? action[labelKey] : action?.label) : onDecline()} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: Matrics.vs18 }}>
                                                    {/* <GText color={action.color || Colors.BLACK} style={[C_Style.sfuiFRegular, styles.headerlable]}>
                                                {action?.label}
                                            </GText> */}
                                                    <Text>  {action?.label}</Text>
                                                </Pressable>
                                            )
                                        })
                                    }
                                </View>
                            )
                        }
                    })
                }
            </View>
        </Modal>
    )
}

export default ModalComponent

const styles = StyleSheet.create({})