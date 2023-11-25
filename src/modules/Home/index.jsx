import { Alert, Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Colors, Images, Matrics } from '../../theme'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import TextComponent from '../../core-component/atom/TextComponent'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import { API_URL, IMAGE_URL } from '../../../config'
import axios from 'axios'
import UsedataComponent from '../../core-component/organism/UsedataComponent'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initialWindowMetrics, useSafeAreaInsets } from 'react-native-safe-area-context'
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import requestCameraAndAudioPermission from '../../core-component/atom/Permission'
import UserParamContext from '../../context/setUserContext'
import Toast from 'react-native-simple-toast';
const data = [
    {
        image: Images.CreateUniquelooks,
        title: "Create Unique Looks"
    },
    {
        image: Images.Customdesign,
        title: "Refresh Wardrobe"
    },
    {
        image: Images.Refreshwardrobe,
        title: "Reuse/ Mix & Match"
    },
    {
        image: Images.ReuseMixnmatch,
        title: "Shopping Assistance"
    },
    {
        image: Images.shoppingassistance,
        title: "Custom Designs"
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
    const { user: userData, setUser: setUserData } = useContext(UserParamContext)
    console.log("🚀 ~ file: index.jsx:53 ~ Home ~ user:", user)
    const { width: _width, height: _height } = Dimensions.get('window');


    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification, sd) {
            console.log("NOTIFICATION:", notification, sd);
            if (notification?.userInteraction) {
                navigation.navigate("VideoCall", { item: { _id: notification?.data?.channelId } })
            }
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

    useFocusEffect(useCallback(
        () => {
            getToken()

        },
        [],
    )
    )


    useEffect(() => {
        // Toast.show('This is a styled toast on iOS.', Toast.SHORT, {
        //     backgroundColor: "black",
        //     fontFamily:getRubikFont("Regular"),
        //     fontSize:Matrics.ms18
        //   });
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
            messaging().setAPNSToken(data || "385757dhnfudhf8487398890", "unknown")

        })


        createNotificationListeners(); //add this line

    }

    const createNotificationListeners = async () => {
        console.log("call");
        await messaging().requestPermission();
        await messaging()
            .hasPermission()
            .then(data => { });
        let enabled = await messaging().hasPermission();
        PushNotification.popInitialNotification(not => {

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
                // if (remoteMessage && token) {
                //   navigation.navigate('LeadScreen', {
                //     id: remoteMessage?.data?.inquiryId,
                //   });
                // }
            });
        messaging().onMessage(async noti => {
            // Alert.alert(noti?.notification?.title)
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
                channelId: noti?.notification?.android?.channelId || "test-1",
                smallIcon: '',
                soundName: noti?.data?.sound,
                title: noti?.notification?.title,
                message: noti?.notification?.body,
                invokeApp: true, // (required)
                userInfo: noti?.data
            });
        });
        messaging()
            .onNotificationOpenedApp(async msg => {

            })

        messaging().setBackgroundMessageHandler(async msg => {

        })

    };


    const getToken = async () => {
        const token = await AsyncStorage.getItem("token")
        console.log("🚀 ~ file: index.jsx:220 ~ getToken ~ token:", token)
        if (token) {
            setToken(token)
            const user = JSON.parse(await AsyncStorage.getItem("user"))
            console.log("🚀 ~ file: index.jsx:223 ~ getToken ~ user:", user)
            if (!user?.complete) {
                if (user?.role)
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

            setUserData(user)
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
            <SafeAreaView style={{ flex: 1 }} >
                <View style={{ paddingVertical: Matrics.vs15, paddingHorizontal: Matrics.hs20, flexDirection: "row", alignItems: "center" }}>
                    <Pressable style={{ flex: 0.25 }} onPress={() => navigation.openDrawer()}>
                        <Image source={Images.menu} style={{ width: Matrics.hs21, height: Matrics.hs18, resizeMode: "contain" }} />
                    </Pressable>
                    <View style={{ flex: 0.65, flexDirection: "row" }}>
                        <Text style={{ fontFamily: getRubikFont("regular"), fontSize: Matrics.ms25, color: Colors.LIGHTBLACK }}>The</Text>
                        <Text style={{ fontFamily: getRubikFont("regular"), fontSize: Matrics.ms25, color: Colors.BLUE }}>StyleCrew</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ marginHorizontal: Matrics.ms20, flex: 1, marginTop: Matrics.vs30 }}>
                        <View >
                            <TextInputComponent placeholder={"Search for designers, stylists or trends"} onChangeText={(text) => setFilter({ ...filter, search: text })} value={search} />
                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10}>{"How can we assist you today?"}</TextComponent>
                            <View style={{ flexDirection: "row", }}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {data ?
                                        data?.map(item =>
                                            <Pressable onPress={() => {
                                                setFilter({ ...filter, assist: item?.title })
                                                navigation.navigate("AllUsers", { homeFilter: { assist: filter?.assist } })
                                            }} style={{ marginRight: Matrics.vs15, width: insets?.bottom ? Matrics.vs85 : Matrics.vs100, justifyContent: "flex-start", marginTop: Matrics.vs10, }}>
                                                <Image source={item?.image} style={{ width: Matrics.ms80, height: Matrics.ms80, borderRadius: Matrics.ms2, borderWidth: filter?.assist === item?.title ? 2 : 1, borderColor: Colors.MEDIUMRED, resizeMode: "contain", marginLeft: Matrics.vs10 }} />
                                                {/* <ImagePlaceHolderComponent size={Matrics.ms90} borderRadius={Matrics.ms45} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => { }} image={item?.image} borderColor={filter === item?.title ? Colors.MEDIUMRED : Colors.MEDIUMREDOPACITY}  /> */}
                                                <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} textAlign="center" numberOfLines={3}>{item?.title}</TextComponent>

                                            </Pressable>

                                        ) : null}

                                </ScrollView>

                            </View>
                        </View>
                        <View >
                            <View style={{ marginVertical: Matrics.vs20 }}>

                                <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10}>{"Popular on StyleCrew"}</TextComponent>
                            </View>
                            <View style={{ justifyContent: "center" }}>
                                <UsedataComponent slice={2} userId={user?.id} userFilter={filter} />

                            </View>

                        </View>
                    </View>

                </ScrollView>
                <Pressable style={{ alignItems: "center" }} onPress={() => navigation.navigate("AllUsers", { users })}>
                    <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms18} color={Colors.BLUE} marginTop={Matrics.vs10} textDecorationLine='underline'>{"View all"}</TextComponent>

                </Pressable>


            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Home

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs20, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
})