import { Alert, Button, Image, KeyboardAvoidingView, PermissionsAndroid, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
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
import RNCallKeep from 'react-native-callkeep'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import useNotification from '../../core-component/organism/notification'
const engine = createAgoraRtcEngine();

const RegisterPage = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confPass, setConfPass] = useState()
    const [error, setError] = useState()
    const { setUser, user } = useContext(UserParamContext)
    const navigation = useNavigation()

    const data = useNotification()
    console.log("🚀 ~ file: RegisterPage.jsx:35 ~ RegisterPage ~ data:", data)

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            // PushNotification.localNotification({
            //     channelId: notification?.channelId,
            //     smallIcon: "",
            //     soundName: notification?.sound,
            //     // color: "red",
            //     title: notification?.title,
            //     // bigText: notification?.body, // it will be shown when user expands notification
            //     message: notification?.message, // (required)
            // });
            // process the notification

            // (required) Called when a remote is received or opened, or local notification is opened
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);

            // process the action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            console.error(err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        senderId: "106151688664",
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
    });


    useEffect(() => {
        getToken()
        engine.initialize({ appId: 'd4bab57c33a74881813563b96ec5470c' });
        if (Platform.OS === 'android') {
            // Request required permissions from Android
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!')
            })
        }

        messaging()
            .registerDeviceForRemoteMessages()
            .then(async res => {

                console.log('-*-res*-', res)
            })
            .catch(err => console.log('*-* registrer error ', err));

        messaging()
            .registerDeviceForRemoteMessages()
            .then(res => console.log('-*-res*-', res))
            .catch(err => console.log('*-* registrer error ', err));

        messaging().getAPNSToken().then(data => {
            console.log("🚀 ~ file: RegisterPage.jsx:47 ~ messaging ~ data:", data)
            messaging().setAPNSToken(data || "385757dhnfudhf8487398890", "unknown")

        })
        messaging().getToken().then(async device_id => {
            console.log("🚀 ~ file: signinScreen.js:49 ~ messaging ~ device_id:", device_id)
        }).catch(err => console.log("🚀 ~ file: signinScreen.js ~ line 58 ~ useEffect ~ err", err))
        createNotificationListeners(); //add this line
        // getToken();
        RNCallKeep.setup({
            ios: {
                appName: "Example",
                supportsVideo: true,
                displayCallReachabilityTimeout: 1000,
            },
            android: {
                alertTitle: "Permissions required",
                alertDescription:
                    "This application needs to access your phone accounts",
                cancelButton: "Cancel",
                okButton: "ok",
                imageName: "phone_account_icon",
                additionalPermissions: [
                    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
                    PermissionsAndroid.PERMISSIONS.CALL_PHONE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                    PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
                ],
                foregroundService: {
                    channelId: "com.company.my",
                    channelName: "Foreground service for my app",
                    notificationTitle:
                        "My app is running on background",
                    notificationIcon:
                        "Path to the resource icon of the notification",
                },
                displayCallReachabilityTimeout: 30000,
            },
        });

        engine.enableVideo();
        engine.enableAudio();
        engine.setVideoEncoderConfiguration(360, 640, 15, 300);
        engine.setChannelProfile(engine.AgoraChannelProfileCommunication);
        engine.startPreview();
    }, [])


    const createNotificationListeners = async () => {
        console.log("call");
        await messaging().requestPermission();
        await messaging()
            .hasPermission()
            .then(data => { });
        let enabled = await messaging().hasPermission();
        console.log("🚀 ~ file: RegisterPage.jsx:176 ~ createNotificationListeners ~ enabled:", enabled)
        PushNotification.popInitialNotification(not => {
            console.log("🚀 ~ file: RegisterPage.jsx:92 ~ RegisterPage ~ not:", not)

        })

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification(async msg => { })
            .then(remoteMessage => {
                console.log("🚀 ~ file: initialScreen.js:130 ~ createNotificationListeners ~ remoteMessage:", remoteMessage)
                // if (remoteMessage && token) {
                //   navigation.navigate('LeadScreen', {
                //     id: remoteMessage?.data?.inquiryId,
                //   });
                // }
            });
        PushNotificationIOS.presentLocalNotification()
        messaging().onMessage(async noti => {
            console.log("🚀 ~ file: initialScreen.js:148 ~ messaging ~ noti:", noti)
            // Alert.alert(noti?.notification?.title)
            const callUUID = uuidv4(); // Generate a unique ID for the call
            console.log("🚀 ~ file: IncominCall.jsx:40 ~ IncominCall ~ callUUID:", callUUID)
            const handle = 'recipient_username'; // The recipient's username or phone number
            // RNCallKeep.answerIncomingCall(callUUID)
            // PushNotification.localNotification({
            //     channelId: noti?.data?.android_channel_id,
            //     smallIcon: "",
            //     soundName: noti?.data?.sound,
            //     // color: "red",
            //     title: noti?.notification?.title,
            //     // bigText: noti?.notification?.body, // it will be shown when user expands notification
            //     message: noti?.notification?.body, // (required)
            // });
            // RNCallKeep.displayIncomingCall(callUUID, handle, 'Incoming Call', 'default', true);
            PushNotification.localNotification({
                channelId: noti?.notification?.android?.channelId,
                smallIcon: '',
                soundName: noti?.data?.sound,
                title: noti?.notification?.title,
                message: noti?.notification?.body,
                invokeApp: true, // (required)
            });
        });
        messaging()
            .onNotificationOpenedApp(async msg => {
                console.log("🚀 ~ file: RegisterPage.jsx:105 ~ createNotificationListeners ~ msg:", msg)

            })

        messaging().setBackgroundMessageHandler(async msg => {
            console.log("🚀 ~ file: RegisterPage.jsx:110 ~ messaging ~ msg:", msg)

        })

    };
    useEffect(() => {
        const type = 'notification';
        PushNotificationIOS.addEventListener(type, onRemoteNotification);
        return () => {
            PushNotificationIOS.removeEventListener(type);
        };
    });

    const onRemoteNotification = (notification) => {
        const isClicked = notification.getData().userInteraction === 1;

        if (isClicked) {
            // Navigate user to another screen
        } else {
            // Do something else with push notification
        }
        // Use the appropriate result based on what you needed to do for this notification
        const result = PushNotificationIOS.FetchResult.NoData;
        notification.finish(result);
    };

    const getToken = async () => {
        const token = await AsyncStorage.getItem("token")
        if (token) {
            const user = JSON.parse(await AsyncStorage.getItem("user"))
            setUser(user)
            navigation.navigate("Home")
        }
    }
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
                "cpassword": confPass
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
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs30, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
    alreadyText: { fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms18, color: Colors.LIGHTBLACK },
    signInText: { color: Colors.BLUE, fontFamily: getRubikFont("Bold"), fontSize: Matrics.ms18, textDecorationLine: "underline" }
})