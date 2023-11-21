import { Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../core-component/atom/header'
import { Colors, Images, Matrics, width } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import TextComponent from '../../core-component/atom/TextComponent'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import { API_URL, IMAGE_URL } from '../../../config'
import { useNavigation } from '@react-navigation/native'
import UserParamContext from '../../context/setUserContext'
import CommonButton from '../../core-component/molecules/CommonButton'
import { convertToformData } from '../../core-utils/dataConverter'
import axios from 'axios'
import Toast from "react-native-simple-toast"
const LeaveMessage = (props) => {
    let {item} = props?.route?.params
    const [message, setMessage] = useState()
    const [image, setImage] = useState()
    const navigation = useNavigation()
    const {user} = useContext(UserParamContext)

    const onSubmit = async () => {
        let body = {
            senderId: user?.id||user?._id,
            receiverId: item?._id,
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
                setMessage()
              Toast.show('Message Sent', Toast.SHORT, {
            backgroundColor: Colors.LIMEGREEN,
            fontFamily:getRubikFont("Regular"),
            fontSize:Matrics.ms18,
            width:width
          });
                navigation.navigate("ProfileDetails",{designerId:item?._id})
               
            }
        }).catch(err => {
            console.log("🚀 ~ file: MessageScreen.jsx:66 ~ onSubmit ~ err:", err)

        })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
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
                    <View style={{flex:1,justifyContent:"flex-end",marginHorizontal:Matrics.hs20}}>
                        <CommonButton text={"Send Message"} onPress={()=>onSubmit()} viewStyle={message ? {backgroundColor:Colors.BLUE}:{}} textStyle={message? {color:Colors.WHITE}:{}}/>
                    </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default LeaveMessage

const styles = StyleSheet.create({})