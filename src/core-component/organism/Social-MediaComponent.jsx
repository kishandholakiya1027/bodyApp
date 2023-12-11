import {  StyleSheet, Text, View } from 'react-native'
import React, { useContext, useRef } from 'react'
import { Colors, Matrics } from '../../theme'
import TextComponent from '../atom/TextComponent'
import { getRobotoFont, getRubikFont, showToast } from '../../core-utils/utils'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import axios from 'axios'
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native'
import { API_URL } from '../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserParamContext from '../../context/setUserContext'
import InstagramLogin from 'react-native-instagram-login';


import { AccessToken, LoginButton, LoginManager, Settings } from 'react-native-fbsdk-next';
import CommonButton from '../molecules/CommonButton'

// Setting the facebook app id using setAppID
// Remember to set CFBundleURLSchemes in Info.plist on iOS if needed
// Settings.initializeSDK();
// Settings.setAppID('1692987181095341');
GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '106151688664-uk4t2b84ge5pi08ueom8fd9is3eckfjc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    // webClientId: '106151688664-d1lm72i0v39fptm6ejvg2cn2tuo4ko6s.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true,
    forceCodeForRefreshToken: true,// if you want to access Google API on behalf of the user FROM YOUR SERVER
    // iosClientId: '106151688664-ndprsrur540i58p72p0s16k06uroukmu.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});


const SocialMediaComponent = ({ role, checkRole, width }) => {
    const navigation = useNavigation()
    const { user, setUser } = useContext(UserParamContext)
    const insRef = useRef();
    
    const navigate = (data)=>{
        if (data?.complete)
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
        else {
            if (data?.role)
            navigation.reset({
                index: 0,
                routes: [{ name: 'OnBoarding' }]
            })
            else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'UserProfile' }]
                })
    
            }
    
        }
    }

    let signInWithGoogle = async () => {
        try {
            let userRole = role ?? "s"

            const isSignedIn = await GoogleSignin.isSignedIn();
            if (isSignedIn) {
                await GoogleSignin.signOut()
            }
            await GoogleSignin.hasPlayServices();

            let userInfo = await GoogleSignin.signIn();

            const data = await axios.post(`${API_URL}auth/verify`, { token: userInfo?.idToken, role: role || false })
            console.log("🚀 ~ file: Social-MediaComponent.jsx:51 ~ signInWithGoogle ~ data:", data)
            if (data?.data?.status === 200) {
                await AsyncStorage.setItem("token", data?.data?.data?.token)
                setUser(data?.data?.data)
                await AsyncStorage.setItem("user", JSON.stringify(data?.data?.data))
                navigate(data?.data?.data)

            } else {
                showToast(data?.msg || data?.error)
            }
            // navigation.navigate("UserProfile")
            // Handle user info or navigate to the next screen.
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
        // await axios.get("http://localhost:5203/auth/google").then(data => {
        //     console.log("🚀 ~ file: Social-MediaComponent.jsx:24 ~ awaitaxios.get ~ data:", data)
        // }).catch(err => {
        //     console.log("🚀 ~ file: Social-MediaComponent.jsx:27 ~ awaitaxios.get ~ err:", err)
        //     return {
        //     }

        // })

    };


    const handleFBLogin = async () => {
        // setLoader(true);
        LoginManager.logInWithPermissions(['public_profile']).then(
            login => {
                if (login?.isCancelled) {
                    // setLoader(false);
                    // setTimeout(() => {
                    //     Toast.show('SignIn cancelled');
                    // }, 1000);
                } else {
                    AccessToken.getCurrentAccessToken().then(async data => {
                        await axios.post(`${API_URL}auth/verify-facebook`, { token: data?.accessToken, role: role || false }).then(async ({ data }) => {
                            if (data?.status === 200) {
                                await AsyncStorage.setItem("token", data?.data?.token)
                                await AsyncStorage.setItem("user", JSON.stringify(data?.data))
                                navigate(data?.data)
                                setUser(data?.data)
                            } else {
                                showToast(data?.msg)
                            }

                        }).catch((error) => {
                            console.error(' Error:', error);
                        })
                        // let input = {
                        //     accessToken: data?.accessToken,
                        //     provider: 'facebook',
                        // };
                        // socialLoginMutation({
                        //     variables: { ...input },
                        // }).then(async ({ data }) => {
                        //     setLoader(false);
                        //     const user = data?.socialLogin?.user;
                        //     SaveUserOnLoginCommon(user, data?.socialLogin?.token);
                        // }).catch(err => {
                        //     setLoader(false);
                        //     showToastMessage(err.message, 'error')
                        // });
                    });
                }
            },
            error => {
                console.log("🚀 ~ file: Social-MediaComponent.jsx:103 ~ handleFBLogin ~ error:", error)
                // setLoader(false);
                // setTimeout(() => {
                //   Toast.show('Signin fail with error: ' + error);
                // }, 1000);
            },
        );
    };
    const handleInstagramLogin = async (token) => {
        // setLoader(true);


        await axios.post(`${API_URL}auth/verify-instagram`, { token, role: role || false }).then(async ({ data }) => {
            if (data?.status === 200) {
                await AsyncStorage.setItem("token", data?.data?.token)
                await AsyncStorage.setItem("user", JSON.stringify(data?.data))
                navigate(data?.data)
                setUser(data?.data)
            } else {
                showToast(data?.msg)
            }

        }).catch((error) => {
            console.error(' Error:', error);
        })
        // let input = {
        //     accessToken: data?.accessToken,
        //     provider: 'facebook',
        // };
        // socialLoginMutation({
        //     variables: { ...input },
        // }).then(async ({ data }) => {
        //     setLoader(false);
        //     const user = data?.socialLogin?.user;
        //     SaveUserOnLoginCommon(user, data?.socialLogin?.token);
        // }).catch(err => {
        //     setLoader(false);
        //     showToastMessage(err.message, 'error')
        // });

    };



    return (
        <View style={{ alignItems: "center" }}>

            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK}  >Or</TextComponent>
            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15}>Sign in using</TextComponent>
            <View style={{ marginTop: Matrics.vs20 }}>
                <View style={{ width: width || "43%" }}>
                    {/* <Pressable style={styles.buttonView} onPress={onSubmit}>
                                        <Text style={styles.textStyle}>{"Login"}</Text>
                                    </Pressable> */}
                    <CommonButton text=" Google" onPress={signInWithGoogle} />

                </View>


            </View>
            {/* <LoginButton
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            console.log("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            console.log("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    console.log(data.accessToken.toString())
                                }
                            )
                        }
                    }
                }
                onLogoutFinished={() => console.log("logout.")} /> */}
            <View style={{ marginTop: Matrics.vs10 }}>
                <View style={{ width: width || "43%" }}>
                    {/* <Pressable style={styles.buttonView} onPress={onSubmit}>
                                        <Text style={styles.textStyle}>{"Login"}</Text>
                                    </Pressable> */}
                    <CommonButton text="Facebook" onPress={handleFBLogin} />

                </View>


            </View>
            <InstagramLogin
                ref={insRef}
                appId='343985794654199'
                appSecret='9676d54d4f990c2c78c764a8eb5e9761'
                redirectUrl='https://socialsizzle.heroku.com/auth/'
                scopes={['user_profile']}
                onLoginSuccess={(token) => handleInstagramLogin(token?.access_token)}
                onLoginFailure={(data) => console.log(data)}
            />
            <View style={{ marginTop: Matrics.vs10 }}>
                <View style={{ width: width || "43%" }}>
                    {/* <Pressable style={styles.buttonView} onPress={onSubmit}>
                                        <Text style={styles.textStyle}>{"Login"}</Text>
                                    </Pressable> */}
                    <CommonButton text="Instagram" onPress={() => insRef.current.show()} />

                </View>


            </View>

        </View>
    )
}

export default SocialMediaComponent

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs30, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
})