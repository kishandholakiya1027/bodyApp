import { Alert, Button, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { IS_ANDROID, getRobotoFont } from '../../core-utils/utils'
import { Colors, Images, Matrics } from '../../theme'
import TextInputComponent from '../../core-component/atom/TextInputComponent'

import { useNavigation } from '@react-navigation/native';
import Header from '../../core-component/atom/header'
import axios from 'axios'
import { API_URL } from '../../../config'
import SocialMediaComponent from '../../core-component/organism/Social-MediaComponent'
// import auth from '@react-native-firebase/auth';



const RegisterPage = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confPass, setConfPass] = useState()
    const [error, setError] = useState()

    const navigation = useNavigation()


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
        console.log("🚀 ~ file: RegisterPage.jsx:41 ~ onSubmit ~ err:", err)
        setError(err)
        if (!err) {

            let body = {
                "email": email?.toString(),
                "password": password,
                "cpassword": confPass
            }
            console.log("🚀 ~ file: LoginPage.jsx:55 ~ awaitaxios.post ~ ${API_URL}/register:", `${API_URL}/register`)
            await axios.post(`${API_URL}/register`, body, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(({ data }) => {
                if (data?.status === 200) {
                    Alert.alert(data?.msg[0])


                } else {
                    Alert.alert(data?.msg[0])
                }

            }).catch(err => {
                Alert.alert(err)


            })
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View style={{ height: "100%", backgroundColor: Colors.WHITE }}>
                    <View style={{ borderBottomWidth: 0.5 }}>
                        <Header text={"Create Your Account"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} />

                    </View>
                    <View style={{ marginVertical: Matrics.vs20 }}>

                        {/* <TextComponent fontFamily={getRobotoFont("Medium")} size={Matrics.ms23} color={Colors.DARKGRAY}  >Login to explore!</TextComponent> */}
                        <View style={{ padding: Matrics.hs20 }}>

                            <TextInputComponent placeholder={"Email or Phone Number"} onChangeText={(text) => {
                                setEmail(text)
                                setError({ ...error, email: false })
                            }} error={error?.email} />
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
                                <View>
                                    <Pressable style={styles.buttonView} onPress={onSubmit}>
                                        <Text style={styles.textStyle}>{"Create Account"}</Text>
                                    </Pressable>

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
                                <SocialMediaComponent />
                            </View>


                        </View>
                    </View>

                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default RegisterPage

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRobotoFont("Bold"), fontSize: Matrics.ms20, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs30, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
    alreadyText: { fontFamily: getRobotoFont(""), fontSize: Matrics.ms19, color: Colors.LIGHTBLACK },
    signInText: { color: Colors.BLUE, fontFamily: getRobotoFont("Bold"), fontSize: Matrics.ms19, textDecorationLine: "underline" }
})