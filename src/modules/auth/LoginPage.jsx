import { Alert, Button, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
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


const LoginPage = () => {
    const [email, setEmail] = useState()
    console.log("🚀 ~ file: LoginPage.jsx:18 ~ LoginPage ~ email:", email)
    const [password, setPassword] = useState()
    console.log("🚀 ~ file: LoginPage.jsx:20 ~ LoginPage ~ password:", password)
    const [error, setError] = useState()

    const navigation = useNavigation()


    const onSubmit = async () => {
        if (!email) {
            setError({ email: "Email is required" })

        } else if (!password) {
            setError({ password: "Password is required" })

        } else {
            let body = {
                "email": email,
                "password": password,
            }
            console.log("🚀 ~ file: LoginPage.jsx:39 ~ onSubmit ~ body:", body, `${API_URL}/google_signin`)
            await axios.post(`${API_URL}/google_signin`, body, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(async ({ data }) => {
                console.log("🚀 ~ file: LoginPage.jsx:56 ~ onSubmit ~ data:", data)
                if (data?.status === 200) {

                    Alert.alert(data?.msg)
                    await AsyncStorage.setItem("token", data?.data?.token)
                    await AsyncStorage.setItem("user", JSON.stringify(data?.data))
                    navigation.navigate("OnBoarding")

                } else {
                    Alert.alert(data?.msg)
                }

            }).catch(err => {
                console.log("🚀 ~ file: LoginPage.jsx:57 ~ onSubmit ~ err:", err)
                Alert.alert(err?.message)


            })

        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View style={{ height: "100%", backgroundColor: Colors.WHITE }}>
                    <View style={{ borderBottomWidth: 0.5 }}>
                        <Header text={"Login Your Account"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.navigate("RegisterPage")} />

                    </View>
                    <View style={{ marginVertical: Matrics.vs20 }}>

                        {/* <TextComponent fontFamily={getRobotoFont("Medium")} size={Matrics.ms23} color={Colors.DARKGRAY}  >Login to explore!</TextComponent> */}
                        <View style={{ padding: Matrics.hs20 }}>

                            <TextInputComponent placeholder={"Email or Phone Number"} onChangeText={(text) => setEmail(text)} error={error?.email} />
                            <TextInputComponent placeholder={"Password"} onChangeText={(text) => setPassword(text)} secureTextEntry={true} error={error?.password} />
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                {/* <ButtonComponent text={"Sign In"} /> */}
                                <View style={{ marginBottom: Matrics.vs20 }}>
                                    <Pressable style={styles.buttonView} onPress={onSubmit}>
                                        <Text style={styles.textStyle}>{"Login"}</Text>
                                    </Pressable>

                                </View>
                                <SocialMediaComponent />
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

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs30, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
})