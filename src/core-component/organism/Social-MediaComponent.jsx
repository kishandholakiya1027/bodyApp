import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme'
import TextComponent from '../atom/TextComponent'
import { getRobotoFont, getRubikFont } from '../../core-utils/utils'
import { GoogleSignin } from '@react-native-google-signin/google-signin'


GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '106151688664-d1lm72i0v39fptm6ejvg2cn2tuo4ko6s.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    // webClientId: '496217348738-9ljnc359ollbn6g8n54vggstt2v5o3eh.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: false,
    forceCodeForRefreshToken: true,// if you want to access Google API on behalf of the user FROM YOUR SERVER
    // iosClientId: '106151688664-ndprsrur540i58p72p0s16k06uroukmu.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const SocialMediaComponent = () => {
    let signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            let userInfo = await GoogleSignin.signIn();
            console.log("🚀 ~ file: LoginPage.jsx:24 ~ signInWithGoogle ~ userInfo:", userInfo)
            let tokens = await GoogleSignin.getTokens()
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