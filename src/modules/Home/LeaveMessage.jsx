import { Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../core-component/atom/header'
import { Colors, Images, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import TextComponent from '../../core-component/atom/TextComponent'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import { IMAGE_URL } from '../../../config'
import { useNavigation } from '@react-navigation/native'

const LeaveMessage = () => {
    const [message, setMessage] = useState()
    const [image, setImage] = useState()
    const navigation = useNavigation()
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
                        <Header text={"Leave a Message"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.goBack()} />

                    </View>
                    <View style={{ margin: Matrics.ms20, paddinBottom: Matrics.vs50 }}>
                        <View style={{ marginBottom: Matrics.vs25, marginTop: Matrics.vs15 }}>

                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={0}>{"You can connect with our associate via messages. Our associate with respond to your message within 5-8 working hours."}</TextComponent>
                        </View>

                        <TextInputComponent placeholder={"Type your message here"} onChangeText={(text) => setMessage(text)} value={message} multiline={true} height={Matrics.vs150} />
                        <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={0}>{"Upload images or videos for reference"}</TextComponent>
                        <TextComponent numberOfLines={5} fontFamily={getRubikFont("Italic")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs5} paddingHorizontal={0}>{"(Mention acceptable formats)"}</TextComponent>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {image?.map(img => {
                                return (
                                    <View style={{ marginRight: Matrics.hs15 }}>

                                        <ImagePlaceHolderComponent multiple={true} size={Matrics.ms60} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs15} setImage={(image) => setImage(image)} image={img?.uri} disabled={true} borderColor={Colors.WHITE} />
                                    </View>
                                )
                            })}

                        </View>
                        <View style={{ position: "relative", alignItems: "flex-start", justifyContent: "center" }}>
                            <ImagePlaceHolderComponent plus={true} multiple={true} size={Matrics.ms60} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs15} setImage={(image) => setImage(image)} image={`ss`} borderColor={Colors.BLUE} />



                        </View>

                    </View>

                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default LeaveMessage

const styles = StyleSheet.create({})