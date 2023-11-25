import { FlatList, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
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
import UserParamContext from '../../context/setUserContext';

const MessageScreen = (props) => {
    const {receiverId} = props?.route?.params
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const [messages, setMessages] = useState()
    const [message, setMessage] = useState()
    const [image, setImage] = useState()
    const msgRef = useRef()
    const {user} = useContext(UserParamContext)

    let userId = user?.id||user?._id
    useEffect(() => {
        getMessages()
    }, [])

    const getMessages = async () => {
        await axios.post(`${API_URL}message/get_message_user`,{
            "senderId": user?.id||user?._id,
            "receiverId": receiverId
        }).then(({ data }) => {
           if (data?.status === 200) {
                setMessages(data?.data)
                setTimeout(() => {
                    msgRef?.current?.scrollToEnd()

                },700);
                // msgRef?.current?.scrollToEnd()
            }

        }).catch(err=>{
            
        })
    }

    const onSubmit = async () => {
        if(message){

            let body = {
                senderId: user?.id||user?._id,
                receiverId: receiverId,
                description: message
            }
            if (image) {
                body.images = image
            }
            let data = convertToformData(body)
            await axios.post(`${API_URL}message/add_message`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(({ data }) => {
                if (data?.status === 200) {
                    setImage()
                    setMessage()
                    getMessages()
                 
                }
            }).catch(err => {
                console.log("🚀 ~ file: MessageScreen.jsx:66 ~ onSubmit ~ err:", err)
    
            })
        }
        else{
            showToast("Please enter message")
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView style={{ flex: 1, paddingBottom: insets?.bottom ? 0 : 20 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
                        <Header text={messages?.receiver?.username||""} text1={"Messages"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.goBack()} />

                    </View>
                    <View style={{ marginHorizontal: Matrics.hs15, flex: 1 }}>
                        <FlatList
                            ref={msgRef}
                            data={messages?.messages}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <View style={{
                                            alignItems: item?.senderId === userId ? "flex-end" : "flex-start",
                                            marginTop: Matrics.vs25,

                                        }}>
                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms14} color={Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={20}>{moment(item?.createdAt).format("MMM DD,LT")}</TextComponent>

                                            <View style={{
                                                backgroundColor: item?.senderId === userId ? Colors.BLUE : Colors.WHITE, paddingHorizontal: Matrics.hs20, paddingVertical: Matrics.vs22, borderRadius: Matrics.ms10, shadowColor: "#52006A",
                                                shadowOffset: { width: -1, height: 1 },
                                                shadowOpacity: 0.2,
                                                shadowRadius: 3,
                                                elevation: 4,
                                                width: "80%",
                                                margin: Matrics.ms10,
                                            }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={item?.senderId === userId ? Colors.WHITE : Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={0}>{item?.description}</TextComponent>
                                                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                    {item?.images?.map(img => {
                                                        return (
                                                            <View style={{ marginRight: Matrics.hs15 }}>

                                                                <ImagePlaceHolderComponent   size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs15} setImage={(image) => setImage(image)} image={img?.uri || `${IMAGE_URL}${img}`} disabled={true} borderColor={Colors.WHITE} />
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
                        <CommonButton text={"Send Message"} onPress={() => onSubmit()} enabled={message}/>

                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default MessageScreen

const styles = StyleSheet.create({})