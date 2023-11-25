import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useState } from 'react'
import UserProfile from '../modules/user/UserProfile'
import LoginPage from '../modules/auth/LoginPage'
import RegisterPage from '../modules/auth/RegisterPage'
import CompleteProfile from '../modules/user/completeProfile'
import MyProfile from '../modules/user/MyProfile'
import VideoCall from '../modules/user/VideoCall'
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../modules/Home'
import { Colors, Images, Matrics, height } from '../theme'
import { getRubikFont } from '../core-utils/utils'
import AllUsers from '../modules/Home/AllUsers'
import UserParamContext from '../context/setUserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IncominCall from '../core-component/organism/IncominCall'
import IncomingCall from '../core-component/organism/IncomingCall'
import LeaveMessage from '../modules/Home/LeaveMessage'
import SlotScreen from '../modules/Home/SlotScreen'
import CompleteBooking from '../modules/Home/CompleteBooking'
import BookingStatus from '../modules/Home/BookingStatus'
import ReportIssue from '../modules/Home/ReportIssue'
import BookingContext from '../context/BookingContext'
import TextComponent from '../core-component/atom/TextComponent'
import MyBooking from '../modules/booking/MyBooking'
import ListMessages from '../modules/Messages/ListMessages'
import MessageScreen from '../modules/Messages/MessageScreen'
import CheckoutScreen from '../core-component/organism/CheckoutComponent'
import ProfileDetails from '../modules/Home/ProfileDetails'
import ProfileList from '../modules/saved-profiles/ProfileList'
import ListNotification from '../modules/Notifications/ListNotification'
import PrivacyPolicy from '../modules/PrivacyPolicy'
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()


const drawerLoginConstant = [
    {
        route: "My Account",
        name: "My Account",
        component: Home,
        children: [
            {
                route: "MyBooking",
                name: "Bookings",
                component: MyBooking
            },
            {
                route: "ListMessages",
                name: "Messages",
                component: ListMessages
            },
            {
                route: "MyProfile",
                name: "Profile",
                component: MyProfile
            },
            {
                route: "MyProfile",
                name: "Sign-out",
                component: MyProfile
            },
        ]
    },
    {
        route: "ProfileList",
        name: "Saved Profiles",
        component: ProfileList,
        designer:true
    },
    {
        route: "ListNotification",
        name: "Notifications",
        component: ListNotification
    },
   
    {
        route: "ReportIssue",
        name: "Report an Issue",
        component: ReportIssue
    },
    {
        route: "VideoCall",
        name: "Privacy Policy",
        component: IncominCall

    },
    // {
    //     route: "IncomingCall",
    //     name: "Incoming Call",
    //     component: IncominCall

    // },
]
const drawerLogoutConstant = [
    {
        route: "LoginPage",
        name: "Sign-in",
        component: LoginPage,

    },

    {
        route: "ReportIssue",
        name: "Report an Issue",
        component: ReportIssue
    },
    {
        route: "PrivacyPolicy",
        name: "Privacy Policy",
        component: PrivacyPolicy

    },
    // {
    //     route: "IncomingCall",
    //     name: "Incoming Call",
    //     component: IncominCall

    // },
]
function CustomDrawerContent(props) {
    const { user ,setUser} = useContext(UserParamContext)
    const [open, setOpen] = useState()
    const logOut = () => {
        AsyncStorage.multiRemove(["token","user"])
        setUser()
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
        setOpen(false)
    }
    const navigation = useNavigation()

    const onNavigation = (route,params) => {
        props.navigation?.closeDrawer()
        navigation.navigate(route,params)
    }
    const drawer = user?.id || user?._id ? drawerLoginConstant : drawerLogoutConstant
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ flex: 1, height: !user ? height - 200:height }}>
                <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingBottom: Matrics.vs15, marginRight: Matrics.vs20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{flex:0.9}}>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms25} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{`Hello, ${ user?.role ? user?.username ||"designer":user?.username ||"user"}`}</TextComponent>
                            {user?.role ? <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.BLUE} marginTop={Matrics.vs0}>{`StyleCrew Member`}</TextComponent> : null}

                        </View>

                        <Pressable style={{flex:0.1}} onPress={() => props.navigation?.closeDrawer()}>
                            <Image source={Images.close} style={{ width: Matrics.ms18, height: Matrics.ms18, tintColor: Colors.LIGHTBLACK, resizeMode: "contain" }} />
                        </Pressable>
                    </View>
                    {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                </View>
                <View style={{ marginTop: Matrics.vs20 }}>
                    {
                        drawer?.map(item => {
                            let showProfile = item?.designer ? !user?.role ? true:false:true
                            if (item?.children) {
                                return (
                                    <View>
                                        <Pressable onPress={() => setOpen(!open)} style={{  marginRight: Matrics.vs20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <DrawerItem label={item?.name} style={{ flex: 0.95 }} onPress={() => setOpen(!open)} labelStyle={{ color: Colors.LIGHTBLACK, fontFamily: getRubikFont(), fontSize: Matrics.hs18 }} />
                                            <Image source={Images.downArrow} style={{
                                                width: Matrics.ms22,
                                                height: Matrics.ms19,
                                                resizeMode: "contain",
                                                tintColor: Colors.LIGHTBLACK,
                                                transform: [{
                                                    rotate: open ? '180deg' : '0deg'
                                                }]
                                            }} />
                                        </Pressable>
                                        <View style={{ marginLeft: Matrics.vs25 }}>

                                            {open ? item?.children?.map(child => {
                                                return (

                                                    <DrawerItem label={child?.name} onPress={() => child?.name === "Sign-out" ? logOut() : onNavigation( child?.route)} style={{ paddingVertical: Matrics.vs0, margin: 0 }} labelStyle={{ margin: 0, fontFamily: getRubikFont("Thin"), fontSize: Matrics.ms18, color: Colors.LIGHTBLACK }} />
                                                )
                                            }) : null}
                                        </View>
                                    </View>

                                )
                            } else {

                                return (

                                    showProfile? <DrawerItem labelStyle={{ color: Colors.LIGHTBLACK, fontFamily: getRubikFont(), fontSize: Matrics.hs18, }} label={item?.name} onPress={() => onNavigation(item?.route)} />:null

                                )
                            }
                        })
                    }

                </View>

            </View>
          {!user?  <View style={{ flex: 1, justifyContent: "flex-end", paddingVertical: Matrics.vs35, borderTopWidth: 1.2, borderColor: Colors.LIGHTERGRAY, marginHorizontal: Matrics.vs20 }}>
                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} paddingHorizontal={0} marginTop={Matrics.vs0}>{`For StyleCrew members:`}</TextComponent>
                <View style={{ flexDirection: "row" }}>
                    <Pressable onPress={() => onNavigation("LoginPage",true)}>
                        {!user ? <TextComponent fontFamily={getRubikFont()} size={Matrics.ms18} textDecorationLine='underline' color={Colors.BLUE} paddingHorizontal={0} marginTop={Matrics.vs15} >{`Sign-in`}</TextComponent>:null}

                    </Pressable>
                    <Pressable onPress={() => onNavigation("RegisterPage",true)}>
                        {!user ? <TextComponent fontFamily={getRubikFont()} size={Matrics.ms18} textDecorationLine='underline' color={Colors.BLUE} paddingHorizontal={0} marginTop={Matrics.vs15} >{`/ Sign-up`}</TextComponent> : null}

                    </Pressable>

                </View>

            </View>:null}
            {/* <DrawerItemList {...props} />
            <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}

        </DrawerContentScrollView>
    );
}

function AppHeader(params) {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{}}>
            <View style={{ paddingVertical: Matrics.vs15, paddingHorizontal: Matrics.hs20, flexDirection: "row", alignItems: "center" }}>
                <Pressable style={{ flex: 0.25 }} onPress={() => navigation.openDrawer()}>
                    <Image source={Images.menu} style={{ width: Matrics.hs21, height: Matrics.hs18,resizeMode:"contain" }} />
                </Pressable>
                <View style={{ flex: 0.65, flexDirection: "row" }}>
                    <Text style={{ fontFamily: getRubikFont("regular"), fontSize: Matrics.ms25, color: Colors.LIGHTBLACK }}>The</Text>
                    <Text style={{ fontFamily: getRubikFont("regular"), fontSize: Matrics.ms25, color: Colors.BLUE }}>StyleCrew</Text>
                </View>
            </View>

        </SafeAreaView >

    )
}

function DrawerComponent() {
    const { user } = useContext(UserParamContext)

    return (<Drawer.Navigator initialRouteName="HomeScreen" drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{
        drawerStyle: {
            backgroundColor: Colors.WHITE,
            width: "80%",
        },
        drawerIcon: ({ focused: boolean, color: string, size: number }) => {
            return <Image source={Images.close} />

        },
        header: ({ navigation, route, options }) => {
            // const title = getHeaderTitle(options, route.name);
            return (
                null
            );
        },
    }}>
        <Drawer.Screen name="TheStyleCrew" component={Home} />
        <Drawer.Screen name="MyProfile" component={MyProfile} options={{
            drawerLabel: 'Updates'
        }} />
        <Drawer.Screen name="OnBoarding" component={CompleteProfile} options={{
            drawerLabel: 'Profile'
        }} />
    </Drawer.Navigator>);
}


const Index = () => {
    const [user, setUser] = useState()
    const [booking, setBooking] = useState()
    return (
        <>
            <NavigationContainer>
                <UserParamContext.Provider value={{ user, setUser }}>
                    <BookingContext.Provider value={{ booking, setBooking }}>
                        <Stack.Navigator headerMode="none" initialRouteName='Home' screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'transparent' } }}>
                            <Stack.Screen name='RegisterPage' component={RegisterPage} />
                            <Stack.Screen name='UserProfile' component={UserProfile} />
                            <Stack.Screen name='OnBoarding' component={CompleteProfile} />
                            <Stack.Screen name='MyProfile' component={MyProfile} />
                            <Stack.Screen name='LoginPage' component={LoginPage} />
                            <Stack.Screen name='VideoCall' component={VideoCall} />
                            <Stack.Screen name='Home' component={DrawerComponent} />
                            <Stack.Screen name='AllUsers' component={AllUsers} />
                            <Stack.Screen name='IncomingCall' component={IncominCall} />
                            <Stack.Screen name='LeaveMessage' component={LeaveMessage} />
                            <Stack.Screen name='SlotScreen' component={SlotScreen} />
                            <Stack.Screen name='CompleteBooking' component={CompleteBooking} />
                            <Stack.Screen name='BookingStatus' component={BookingStatus} />
                            <Stack.Screen name='ReportIssue' component={ReportIssue} />
                            <Stack.Screen name='MyBooking' component={MyBooking} />
                            <Stack.Screen name='ListMessages' component={ListMessages} />
                            <Stack.Screen name='MessageScreen' component={MessageScreen} />
                            <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} />
                            <Stack.Screen name='ProfileList' component={ProfileList} />
                            <Stack.Screen name='ProfileDetails' component={ProfileDetails} />
                            <Stack.Screen name='ListNotification' component={ListNotification} />
                            <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
                        </Stack.Navigator>
                    </BookingContext.Provider>
                </UserParamContext.Provider>
            </NavigationContainer>

        </>
    )
}

export default Index

const styles = StyleSheet.create({})