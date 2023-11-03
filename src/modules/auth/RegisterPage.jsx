import { Alert, Button, Image, KeyboardAvoidingView, PermissionsAndroid, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { IS_ANDROID, getRobotoFont, getRubikFont } from '../../core-utils/utils'
import { Colors, Images, Matrics } from '../../theme'
import TextInputComponent from '../../core-component/atom/TextInputComponent'

import { useNavigation } from '@react-navigation/native';
import Header from '../../core-component/atom/header'
import axios from 'axios'
import { API_URL } from '../../../config'
import SocialMediaComponent from '../../core-component/organism/Social-MediaComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import auth from '@react-native-firebase/auth';
import { createAgoraRtcEngine } from 'react-native-agora';
import UserParamContext from '../../context/setUserContext'
import requestCameraAndAudioPermission from '../../core-component/atom/Permission'
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import RNCallKeep from 'react-native-callkeep'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import useNotification from '../../core-component/organism/notification'
import DropdownComponent from '../../core-component/atom/DropdownComponent'
import CommonButton from '../../core-component/molecules/CommonButton'
const engine = createAgoraRtcEngine();

const RegisterPage = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confPass, setConfPass] = useState()
    const [role, setRole] = useState()
    const [error, setError] = useState()
    const { setUser, user } = useContext(UserParamContext)
    const navigation = useNavigation()

    const data = useNotification()

    const roleArray = [
        { label: "Designer", value: false },
        { label: "User", value: true },

    ]

    const onSubmit = async () => {
        let err
        if (!email) {
            err = { ...err, email: "Email is required" }

        }
        if (!password) {
            err = { ...err, password: "Password is required" }

        }
        if (!confPass) {
            err = { ...err, confPass: "Confirm password is required" }

        }
        if (password !== confPass) {
            err = { ...err, pass: "Password doesn't match" }
        }
        setError(err)
        if (!err) {

            let body = {
                "email": email?.toString(),
                "password": password,
                "cpassword": confPass,
                "role": role
            }
            await axios.post(`http://10.0.2.2:5203/api/register`, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(({ data }) => {
                if (data?.status === 200) {
                    Alert.alert(data?.msg[0])


                } else {
                    Alert.alert(data?.msg[0])
                }

            }).catch(err => {
                console.log("🚀 ~ file: RegisterPage.jsx:76 ~ onSubmit ~ err:", err)
                Alert.alert(err?.message)
                // Alert.alert(err)


            })
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                    <View style={{ borderBottomWidth: 0.5 }}>
                        <Header text={"Create Your Account"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={()=>navigation.goBack()} />
                    </View>
                <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ height: "100%", }}>
                    <View style={{ marginVertical: Matrics.vs20 }}>

                        {/* <TextComponent fontFamily={getRobotoFont("Medium")} size={Matrics.ms23} color={Colors.DARKGRAY}  >Login to explore!</TextComponent> */}
                        <View style={{ padding: Matrics.hs20 }}>

                            <TextInputComponent placeholder={"Email or Phone Number"} onChangeText={(text) => {
                                setEmail(text)
                                setError({ ...error, email: false })
                            }} error={error?.email} />
                            <View style={{ marginBottom: Matrics.vs15 }}>
                                <DropdownComponent items={roleArray} setValue={(value) => setRole(value)} value={role} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Role"} />

                            </View>
                            <TextInputComponent placeholder={"Password"} onChangeText={(text) => {
                                setPassword(text)
                                setError({ ...error, password: false })
                            }} secureTextEntry={true} error={error?.password} />
                            <TextInputComponent placeholder={"Confirm Password"} onChangeText={(text) => {
                                setConfPass(text)
                                setError({ ...error, confPass: false, pass: password === text ? false : error?.pass })
                            }} secureTextEntry={true} error={error?.confPass || error?.pass} />
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                {/* <ButtonComponent text={"Sign In"} /> */}
                                <View style={{width:"60%"}}>
                                <CommonButton text="Create Account"  onPress={onSubmit} enabled={email && confPass && password &&(role === true || role === false)}/>

                                    

                                </View>
                                {/* <View>
                                    <Pressable style={styles.buttonView} onPress={signInWithGoogle}>
                                        <Image source={Images.google} style={{ width: Matrics.ms30, height: Matrics.ms30, marginRight: Matrics.hs10 }} />
                                        <Text style={styles.textStyle}>{"Sign In with Google"}</Text>
                                    </Pressable>

                                </View> */}

                            </View>
                            <View style={{ alignItems: "center" }}>
                                <View style={{ flexDirection: "row", marginVertical: Matrics.vs15, justifyContent: "center" }}>
                                    <Text style={styles.alreadyText}>Already have an account ? </Text>
                                    <Pressable onPress={() => navigation.navigate("LoginPage")}>
                                        <Text style={styles.signInText}>Sign in</Text>

                                    </Pressable>
                                </View>
                                <SocialMediaComponent role={role} checkRole={true} width={"60%"}/>
                            </View>


                        </View>
                    </View>

                </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default RegisterPage

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs30, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
    alreadyText: { fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms18, color: Colors.LIGHTBLACK },
    signInText: { color: Colors.BLUE, fontFamily: getRubikFont("Bold"), fontSize: Matrics.ms18, textDecorationLine: "underline" }
})