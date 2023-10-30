import { FlatList, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors, Matrics } from '../../theme'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils';
import Header from '../../core-component/atom/header';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL, IMAGE_URL } from '../../../config';
import TextComponent from '../../core-component/atom/TextComponent';
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent';
import moment from 'moment';
import CommonButton from '../../core-component/molecules/CommonButton';
import TextInputComponent from '../../core-component/atom/TextInputComponent';
import { convertToformData } from '../../core-utils/dataConverter';

const MessageScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const [messages, setMessages] = useState()
    const [message, setMessage] = useState()
    const [image, setImage] = useState()
    const msgRef = useRef()
    let userId = "6538adcb01fd15b33929cb85"
    console.log("🚀 ~ file: MessageScreen.jsx:15 ~ MessageScreen ~ messages:", messages)
    useEffect(() => {
        getMessages()
    }, [])

    const getMessages = async () => {
        await axios.get(`${API_URL}message/get_message`).then(({ data }) => {
            if (data?.status === 200) {
                setMessages(data?.querys)
                msgRef?.current?.scrollToEnd()
            }
            console.log("🚀 ~ file: MessageScreen.jsx:22 ~ awaitaxios.get ~ data:", data)

        })
    }

    const onSubmit = async () => {
        let body = {
            loginUserId: "6538adcb01fd15b33929cb85",
            designerId: "652f5bd81ae2a5563bd5a78c",
            description: message
        }
        if (image) {
            body.image = image
        }
        let data = convertToformData(body)
        await axios.post(`${API_URL}message/add_message`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(({ data }) => {
            if (data?.status === 200) {
                getMessages()
                setMessage()
                setTimeout(() => {
                    msgRef?.current?.scrollToEnd()

                }, 700);
            }
        }).catch(err => {
            console.log("🚀 ~ file: MessageScreen.jsx:66 ~ onSubmit ~ err:", err)

        })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView style={{ flex: 1, paddingBottom: insets?.bottom ? 0 : 20 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
                        <Header text={"Prerna Kanaujia"} text1={"Messages"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.goBack()} />

                    </View>
                    <View style={{ marginHorizontal: Matrics.hs15, flex: 1 }}>
                        <FlatList
                            ref={msgRef}
                            data={messages}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <View style={{
                                            alignItems: item?.loginUserId === userId ? "flex-end" : "flex-start",
                                            marginTop: Matrics.vs25,

                                        }}>
                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms14} color={Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={20}>{moment(item?.createdAt).format("MMM DD,LT")}</TextComponent>

                                            <View style={{
                                                backgroundColor: item?.loginUserId === userId ? Colors.BLUE : Colors.WHITE, paddingHorizontal: Matrics.hs20, paddingVertical: Matrics.vs22, borderRadius: Matrics.ms10, shadowColor: "#52006A",
                                                shadowOffset: { width: -1, height: 1 },
                                                shadowOpacity: 0.2,
                                                shadowRadius: 3,
                                                elevation: 4,
                                                width: "80%",
                                                margin: Matrics.ms10,
                                            }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={item?.loginUserId === userId ? Colors.WHITE : Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={0}>{item?.description}</TextComponent>
                                                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                    {item?.images?.map(img => {
                                                        return (
                                                            <View style={{ marginRight: Matrics.hs15 }}>

                                                                <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs15} setImage={(image) => setImage(image)} image={img?.uri || `${IMAGE_URL}${img}`} disabled={true} borderColor={Colors.WHITE} />
                                                            </View>
                                                        )
                                                    })}

                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={{ marginHorizontal: Matrics.hs20 }}>
                        <View style={{ flexDirection: "row", marginTop: Matrics.vs10 }}>
                            <View style={{ flex: 0.85, marginRight: Matrics.hs15 }}>
                                <TextInputComponent marginBottom={Matrics.vs10} placeholder={"Type your message here"} onChangeText={(text) => setMessage(text)} value={message} />

                            </View>
                            <View style={{ flex: 0.15, justifyContent: "flex-start" }}>
                                <ImagePlaceHolderComponent multiple={true} plus={true} size={Matrics.ms50} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs0} setImage={(image) => setImage(image)} image={`s`} borderColor={Colors.BLUE} />

                            </View>
                        </View>
                        <CommonButton text={"Send Message"} onPress={() => onSubmit()} />

                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default MessageScreen

const styles = StyleSheet.create({})