import { Alert, Dimensions, FlatList, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Matrics } from '../../theme'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import TextComponent from '../../core-component/atom/TextComponent'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import { API_URL, IMAGE_URL } from '../../../config'
import axios from 'axios'
import UsedataComponent from '../../core-component/organism/UsedataComponent'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView, initialWindowMetrics, useSafeAreaInsets } from 'react-native-safe-area-context'
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import requestCameraAndAudioPermission from '../../core-component/atom/Permission'

const data = [
    {
        image: "",
        title: "Create Unique Looks"
    },
    {
        image: "",
        title: "Refresh Wardrobe"
    },
    {
        image: "",
        title: "Reuse/ Mix & Match"
    },
    {
        image: "",
        title: "Shopping Assistance"
    },
    {
        image: "",
        title: "Create Unique Looks"
    },
]

const Home = () => {
    const [search, setSearch] = useState()
    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [user, setUser] = useState([])
    const [token, setToken] = useState()
    const [filter, setFilter] = useState()
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();
    console.log("🚀 ~ file: index.jsx:45 ~ Home ~ insets:", insets)
    const { width: _width, height: _height } = Dimensions.get('window');
    console.log("🚀 ~ file: index.jsx:44 ~ Home ~ _height:", _height)
    console.log("🚀 ~ file: index.jsx:44 ~ Home ~ _width:", _width)


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
        if (Platform.OS === 'android') {
            // Request required permissions from Android
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!')
            })
        }


        // getToken();

        messageSetup()
    }, [])

    const messageSetup = async () => {
        messaging()
            .registerDeviceForRemoteMessages()
            .then(res => console.log('-*-res*-', res))
            .catch(err => console.log('*-* registrer error ', err));

        await messaging().getAPNSToken().then(data => {
            console.log("🚀 ~ file: RegisterPage.jsx:47 ~ messaging ~ data:", data)
            messaging().setAPNSToken(data || "385757dhnfudhf8487398890", "unknown")

        })
        messaging().getToken().then(async device_id => {
            console.log("🚀 ~ file: signinScreen.js:49 ~ messaging ~ device_id:", device_id)
        }).catch(err => console.log("🚀 ~ file: signinScreen.js ~ line 58 ~ useEffect ~ err", err))
        if (token) {

            createNotificationListeners(); //add this line
        }

    }

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


    const getToken = async () => {
        const token = await AsyncStorage.getItem("token")
        if (token) {
            setToken(token)
            const user = JSON.parse(await AsyncStorage.getItem("user"))
            setUser(user)
            // navigation.navigate("Home")
        }
        return token
    }


    const getUsers = async () => {
        const user = JSON.parse(await AsyncStorage.getItem("user"))
        setUser(user)
        await axios.get(`${API_URL}user/get_user_rating`).then(({ data }) => {
            setUsers(data?.data)
            setAllUsers(data?.data)
        }).catch(err => {


        })


    }
    useEffect(() => {
        getUsers()
    }, [])


    const onSearch = async (text) => {
        setSearch(text)

    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView initialMetrics={initialWindowMetrics} style={{ flex: 1 }} >
                <View style={{ marginHorizontal: Matrics.ms20, flex: 1 }}>
                    <View >
                        <TextInputComponent placeholder={"Search for designers, stylists or trends"} onChangeText={(text) => onSearch(text)} value={search} />
                        <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10}>{"How can we assist you today?"}</TextComponent>
                        <View style={{ flexDirection: "row" }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {data ?
                                    data?.map(item =>
                                        <Pressable onPress={() => setFilter(item?.title)} style={{ marginRight: Matrics.vs15, width: Matrics.vs100, justifyContent: "center", marginTop: Matrics.vs10 }}>

                                            <ImagePlaceHolderComponent size={Matrics.ms90} borderRadius={Matrics.ms45} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => { }} image={`${IMAGE_URL}${item?.image}`} borderColor={filter === item?.title ? Colors.MEDIUMRED : Colors.MEDIUMREDOPACITY} backgroundColor={Colors.MEDIUMREDOPACITY} />
                                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} textAlign="center">{item?.title}</TextComponent>

                                        </Pressable>

                                    ) : null}

                            </ScrollView>

                        </View>
                    </View>
                    <View >
                        <View style={{ marginVertical: Matrics.vs20 }}>

                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10}>{"Popular on StyleCrew"}</TextComponent>
                        </View>
                        <View style={{ height: "54%", justifyContent: "center" }}>
                            <UsedataComponent slice={2} userId={user?.id} search={search} filter={filter} />

                        </View>
                        <Pressable style={{ alignItems: "center" }} onPress={() => navigation.navigate("AllUsers", { users })}>
                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms18} color={Colors.BLUE} marginTop={Matrics.vs10} textDecorationLine='underline'>{"View all"}</TextComponent>

                        </Pressable>

                    </View>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Home

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs20, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
})