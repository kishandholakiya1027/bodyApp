import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import UserProfile from '../modules/user/UserProfile'
import LoginPage from '../modules/auth/LoginPage'
import RegisterPage from '../modules/auth/RegisterPage'
import CompleteProfile from '../modules/user/completeProfile'
import MyProfile from '../modules/user/MyProfile'
import VideoCall from '../modules/user/VideoCall'
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../modules/Home'
import { Colors, Images, Matrics } from '../theme'
import { getRubikFont } from '../core-utils/utils'
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()


const drawerConstant = [
    {
        route: "TheStyleCrew",
        name: "TheStyleCrew",
        component: Home
    },
    {
        route: "OnBoarding",
        name: "Complete Profile",
        component: CompleteProfile
    },
    {
        route: "MyProfile",
        name: "My Profile",
        component: MyProfile
    },
]

function CustomDrawerContent(props) {
    console.log("🚀 ~ file: index.jsx:18 ~ CustomDrawerContent ~ props:", props)
    const navigation = useNavigation()
    return (
        <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} />
            <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
            {
                drawerConstant?.map(item => {
                    return (
                        <DrawerItem label={item?.name} onPress={() => navigation.navigate(item?.route)} />

                    )
                })
            }
        </DrawerContentScrollView>
    );
}

function AppHeader(params) {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <View style={{ paddingVertical: Matrics.vs15, paddingHorizontal: Matrics.hs20, flexDirection: "row", alignItems: "center" }}>
                <Pressable style={{ flex: 0.25 }} onPress={() => navigation.openDrawer()}>
                    <Image source={Images.menu} style={{ width: Matrics.hs25, height: Matrics.hs30 }} />
                </Pressable>
                <View style={{ flex: 0.65, flexDirection: "row" }}>
                    <Text style={{ fontFamily: getRubikFont("regular"), fontSize: Matrics.ms25, color: Colors.LIGHTBLACK }}>The</Text>
                    <Text style={{ fontFamily: getRubikFont("regular"), fontSize: Matrics.ms25, color: Colors.BLUE }}>StyleCrews</Text>
                </View>
            </View>

        </SafeAreaView >

    )
}

function DrawerComponent() {
    return (<Drawer.Navigator initialRouteName="HomeScreen" drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{
        drawerStyle: {
            backgroundColor: Colors.WHITE,
            width: 240,
        },
        drawerIcon: ({ focused: boolean, color: string, size: number }) => {
            return <Image source={Images.close} />

        },
        header: ({ navigation, route, options }) => {
            // const title = getHeaderTitle(options, route.name);
            return (
                <AppHeader />
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
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator headerMode="none" initialRouteName='Home' screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'transparent' } }}>
                    <Stack.Screen name='RegisterPage' component={RegisterPage} />
                    <Stack.Screen name='UserProfile' component={UserProfile} />
                    <Stack.Screen name='OnBoarding' component={CompleteProfile} />
                    <Stack.Screen name='MyProfile' component={MyProfile} />
                    <Stack.Screen name='LoginPage' component={LoginPage} />
                    <Stack.Screen name='VideoCall' component={VideoCall} />
                    <Stack.Screen name='Home' component={DrawerComponent} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default Index

const styles = StyleSheet.create({})