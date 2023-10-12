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

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '106151688664-uk4t2b84ge5pi08ueom8fd9is3eckfjc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    // webClientId: '496217348738-9ljnc359ollbn6g8n54vggstt2v5o3eh.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
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
            if (isSignedIn) {
                await GoogleSignin.signOut()
            }
            await GoogleSignin.hasPlayServices();
            let userInfo = await GoogleSignin.signIn();

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
    return (
        <View style={{ alignItems: "center" }}>

            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK}  >Or</TextComponent>
            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15}>Sign in using</TextComponent>
            <View style={{ marginTop: Matrics.vs20 }}>
                <Pressable style={styles.buttonView} onPress={signInWithGoogle}>
                    <Text style={styles.textStyle}>{"  Google  "}</Text>
                </Pressable>

            </View>
            <View style={{ marginTop: Matrics.vs10 }}>
                <Pressable style={styles.buttonView} onPress={() => { }}>
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