import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors, Matrics } from '../../theme'
import TextComponent from '../atom/TextComponent'
import { getRobotoFont, getRubikFont } from '../../core-utils/utils'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import axios from 'axios'
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native'
import { API_URL } from '../../../config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserParamContext from '../../context/setUserContext'


import { AccessToken, LoginButton, LoginManager, Settings } from 'react-native-fbsdk-next';

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

const SocialMediaComponent = () => {
    const navigation = useNavigation()
    const { user, setUser } = useContext(UserParamContext)

    let signInWithGoogle = async () => {
        try {

            // await axios.get("http://localhost:5203/auth/google").then(data => {
            //     console.log("🚀 ~ file: Social-MediaComponent.jsx:24 ~ awaitaxios.get ~ data:", data)
            // }).catch(err => {
            //     console.log("🚀 ~ file: Social-MediaComponent.jsx:27 ~ awaitaxios.get ~ err:", err)
            //     return {
            //     }

            // })
            const isSignedIn = await GoogleSignin.isSignedIn();
            console.log("🚀 ~ file: Social-MediaComponent.jsx:39 ~ signInWithGoogle ~ isSignedIn:", isSignedIn)
            if (isSignedIn) {
                await GoogleSignin.signOut()
            }
            await GoogleSignin.hasPlayServices();

            let userInfo = await GoogleSignin.signIn();
            console.log("🚀 ~ file: Social-MediaComponent.jsx:45 ~ signInWithGoogle ~ userInfo:", userInfo)

            const data = await axios.post(`${API_URL}auth/verify`, { token: userInfo?.idToken })
            if (data?.data?.status === 200) {
                Alert.alert(data?.data?.msg)
                await AsyncStorage.setItem("token", data?.data?.data?.token)
                setUser(data?.data?.data)
                await AsyncStorage.setItem("user", JSON.stringify(data?.data?.data))
                navigation.navigate("Home")

            } else {
                Alert.alert(data?.msg)
            }
            // navigation.navigate("UserProfile")
            // Handle user info or navigate to the next screen.
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };


    const handleFBLogin = async () => {
        // setLoader(true);
        LoginManager.logInWithPermissions(['public_profile']).then(
            login => {
                console.log("🚀 ~ file: Social-MediaComponent.jsx:78 ~ handleFBLogin ~ login:", login)
                if (login?.isCancelled) {
                    // setLoader(false);
                    // setTimeout(() => {
                    //     Toast.show('SignIn cancelled');
                    // }, 1000);
                } else {
                    AccessToken.getCurrentAccessToken().then(async data => {
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
                        console.log("🚀 ~ file: Social-MediaComponent.jsx:101 ~ AccessToken.getCurrentAccessToken ~ data:", data)
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



    return (
        <View style={{ alignItems: "center" }}>

            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK}  >Or</TextComponent>
            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15}>Sign in using</TextComponent>
            <View style={{ marginTop: Matrics.vs20 }}>
                <Pressable style={styles.buttonView} onPress={signInWithGoogle}>
                    <Text style={styles.textStyle}>{"  Google  "}</Text>
                </Pressable>

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
                <Pressable style={styles.buttonView} onPress={() => handleFBLogin()}>
                    <Text style={styles.textStyle}>{"Facebook"}</Text>
                </Pressable>

            </View>

            <View style={{ marginTop: Matrics.vs10 }}>
                <Pressable style={styles.buttonView} onPress={() => { }}>
                    <Text style={styles.textStyle}>{"Instagram"}</Text>
                </Pressable>

            </View>

        </View>
    )
}

export default SocialMediaComponent

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs30, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
})