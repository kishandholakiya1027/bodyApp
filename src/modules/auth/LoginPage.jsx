import { Alert, Button, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
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
import UserParamContext from '../../context/setUserContext'
import messaging from '@react-native-firebase/messaging';
import CommonButton from '../../core-component/molecules/CommonButton'

// import auth from '@react-native-firebase/auth';


const LoginPage = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [deviceToken, setDeviceToken] = useState()
    const [error, setError] = useState()
    const { user, setUser } = useContext(UserParamContext)

    const navigation = useNavigation()

    const messageSetup = async () => {
        messaging()
            .registerDeviceForRemoteMessages()
            .then(res => console.log('-*-res*-', res))
            .catch(err => console.log('*-* registrer error ', err));

        await messaging().getAPNSToken().then(data => {
            messaging().setAPNSToken(data || "385757dhnfudhf8487398890", "unknown")

        })
        messaging().getToken().then(async device_id => {
            setDeviceToken(device_id)
        }).catch(err => console.log("🚀 ~ file: signinScreen.js ~ line 58 ~ useEffect ~ err", err))


    }

    useEffect(() => {
        messageSetup()
    }, [])

    const onSubmit = async () => {
        if (!email) {
            setError({ email: "Email is required" })

        } else if (!password) {
            setError({ password: "Password is required" })

        } else {
            let body = {
                "email": email,
                "password": password,
                fcm_token: deviceToken
            }
            await axios.post(`${API_URL}auth/login`, body, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(async ({ data }) => {
                if (data?.status === 200) {

                    // Alert.alert(data?.msg)
                    await AsyncStorage.setItem("token", data?.data?.token)
                    setUser(data?.data)
                    await AsyncStorage.setItem("user", JSON.stringify(data?.data))
                    if (data?.data?.complete)
                        navigation.navigate("Home")
                    else {
                        if (data?.data?.role)
                            navigation.navigate("OnBoarding")
                        else {
                            navigation.navigate("UserProfile")

                        }

                    }

                } else {
                    Alert.alert(data?.msg)
                }

            }).catch(err => {
                Alert.alert(`${err?.message}`)


            })

        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View style={{ height: "100%", backgroundColor: Colors.WHITE }}>
                    <View style={{ borderBottomWidth: 0.5 }}>
                        <Header text={"Login Your Account"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.goBack()} />

                    </View>
                    <View style={{ marginVertical: Matrics.vs20 }}>

                        {/* <TextComponent fontFamily={getRobotoFont("Medium")} size={Matrics.ms23} color={Colors.DARKGRAY}  >Login to explore!</TextComponent> */}
                        <View style={{ padding: Matrics.hs20 }}>

                            <TextInputComponent placeholder={"Email or Phone Number"} onChangeText={(text) => setEmail(text)} error={error?.email} />
                            <TextInputComponent placeholder={"Password"} onChangeText={(text) => setPassword(text)} secureTextEntry={true} error={error?.password} />
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                {/* <ButtonComponent text={"Sign In"} /> */}
                                <View style={{ marginBottom: Matrics.vs20, width: "43%" }}>
                                    {/* <Pressable style={styles.buttonView} onPress={onSubmit}>
                                        <Text style={styles.textStyle}>{"Login"}</Text>
                                    </Pressable> */}
                                    <CommonButton text="Login" onPress={onSubmit} enabled={email && password} />

                                </View>
                                <SocialMediaComponent role={null} checkRole={false} />
                                {/* <View>
                                    <Pressable style={styles.buttonView} onPress={signInWithGoogle}>
                                        <Image source={Images.google} style={{ width: Matrics.ms30, height: Matrics.ms30, marginRight: Matrics.hs10 }} />
                                        <Text style={styles.textStyle}>{"Sign In with Google"}</Text>
                                    </Pressable>

                                </View> */}

                            </View>


                        </View>
                    </View>

                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default LoginPage

