import { Image, KeyboardAvoidingView, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import TextComponent from '../../core-component/atom/TextComponent'
import { Colors, Images, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont, showToast } from '../../core-utils/utils'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { API_URL } from '../../../config'
import UserParamContext from '../../context/setUserContext'
import CommonButton from '../../core-component/molecules/CommonButton'
import toast from "react-native-simple-toast"
const ReportIssue = () => {
    const insets = useSafeAreaInsets();
    const [issue, setIssue] = useState()
    const navigation = useNavigation()
    const { user } = useContext(UserParamContext)


    const onSubmit = async () => {
        if(issue){

            let body = {
                "userId": user?._id || user?.id,
                "msg": issue
            }
            await axios.post(`${API_URL}issue/add_issue`,body).then(({data}) => {
                console.log("🚀 ~ file: ReportIssue.jsx:30 ~ awaitaxios.post ~ data:", data)
                if(data?.status === 200){
                    setIssue()
                    showToast("Your query is submitted successfully.We'll be in touch with you soon")
                }else {
                    showToast(data?.msg||data?.error)
                }
                }).catch(err => {
                    console.log("🚀 ~ file: ReportIssue.jsx:29 ~ awaitaxios.post ~ err:", err)
        
                    
            })
        }
        else{
            showToast("Please enter issue")
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <SafeAreaView style={{ flex: 1, paddingBottom: insets?.bottom ? 0 : 20 }}>
                <View style={{flex:1}}>
                <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: Matrics.ms55, marginRight: Matrics.vs20 }}>
                        <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} >{"Report an Issue"}</TextComponent>

                        <Pressable onPress={() => navigation.navigate("Home")}>
                            <Image source={Images.close} style={{ width: Matrics.ms18, height: Matrics.ms18, tintColor: Colors.LIGHTBLACK }} />
                        </Pressable>
                    </View>
                    {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                </View>
                <View style={{ flex: 1, marginHorizontal: Matrics.hs20 }}>
                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.vs0}>{"Please submit your query or issue below."}</TextComponent>
                    <View style={{ marginVertical: Matrics.vs25 }}>
                        <TextInputComponent placeholder={"Type your issue here"} multiline height={Matrics.vs150} onChangeText={(text) => setIssue(text)} value={issue} />
                    </View>

                </View>

                </View>
                <View>
                    <View style={{  justifyContent: "flex-end", marginHorizontal: Matrics.hs20 }}>
                        <CommonButton text={"Report an issue"} onPress={() => onSubmit()} enabled={issue} />
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ReportIssue

const styles = StyleSheet.create({})