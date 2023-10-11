import { Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../core-component/atom/header'
import { Colors, Images, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import TextComponent from '../../core-component/atom/TextComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import { IMAGE_URL } from '../../../config'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const MyProfile = () => {
    const [userData, setUserData] = useState()
    const navigation = useNavigation()
    console.log("🚀 ~ file: MyProfile.jsx:12 ~ MyProfile ~ userData:", userData)

    // useEffect(() => {
    //     getUserData()
    // }, [])
    useFocusEffect(
        useCallback(() => {
            getUserData()
        }, [])
    )

    const getUserData = async () => {
        const user = JSON.parse(await AsyncStorage.getItem("user"))
        console.log("🚀 ~ file: MyProfile.jsx:23 ~ getUserData ~ user:", user)
        setUserData(user)
    }
    const socialMedia = [
        "IN", "FB", "YT", "LI"
    ]

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{"My Profile"}</TextComponent>

                        <Pressable onPress={() => navigation.navigate("Home")}>
                            <Image source={Images.close} style={{ width: Matrics.ms50, height: Matrics.ms50 }} />
                        </Pressable>
                    </View>
                    {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ margin: Matrics.ms20 }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: Matrics.vs15 }}>
                            <View>
                                <ImagePlaceHolderComponent size={Matrics.ms160} borderRadius={Matrics.ms80} padding={Matrics.hs10} marginVertical={Matrics.vs25} setImage={(image) => setUserData({ ...userData, profile_img: image })} image={userData?.profile_img ? `${IMAGE_URL}${userData?.profile_img?.uri || userData?.profile_img}` : ""} />

                            </View>
                            <View style={{ flexWrap: "wrap", flex: 1 }}>
                                <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{userData?.username}</TextComponent>
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{userData?.profession}</TextComponent>
                                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: Matrics.vs15, flexWrap: "wrap", marginLeft: Matrics.vs15 }}>
                                    {userData?.socialChanels?.map((channel, i) => {
                                        return channel && channel != 0 ? <View style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginLeft: Matrics.hs5, backgroundColor: Colors.BLUE, justifyContent: "center", alignItems: "center", marginTop: Matrics.vs10 }}>

                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.WHITE} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{socialMedia[i]}</TextComponent>
                                        </View> : null
                                    })}
                                    {/* <View style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginLeft: Matrics.hs10, backgroundColor: Colors.BLUE, justifyContent: "center", alignItems: "center" }}>
                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.WHITE} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{"FB"}</TextComponent>
                                    </View>
                                    <View style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginLeft: Matrics.hs10, backgroundColor: Colors.BLUE, justifyContent: "center", alignItems: "center" }}>
                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.WHITE} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{"YT"}</TextComponent>
                                    </View>
                                    <View style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginLeft: Matrics.hs10, backgroundColor: Colors.BLUE, justifyContent: "center", alignItems: "center" }}>
                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.WHITE} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{"LI"}</TextComponent>
                                    </View> */}

                                </View>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingBottom: Matrics.vs30 }}>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.CRAYON} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{"Consultation Fees"}</TextComponent>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{`INR ${userData?.consultationCharge || 0}/ 30 min session`}</TextComponent>

                        </View>
                        <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingBottom: Matrics.vs30, marginTop: Matrics.vs20 }}>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.CRAYON} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{"Qualification and Experience"}</TextComponent>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{userData?.qualification}</TextComponent>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{userData?.workExperience}</TextComponent>

                        </View>
                        <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingBottom: Matrics.vs30, marginTop: Matrics.vs20, justifyContent: "flex-start", alignItems: "flex-start" }}>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.CRAYON} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{"Portfolio"}</TextComponent>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{userData?.websiteUrl}</TextComponent>
                            <View style={{ marginTop: Matrics.vs10, flexDirection: "row" }}>
                                {userData?.portfolio ?
                                    userData?.portfolio?.map(item =>
                                        <View style={{ marginRight: Matrics.vs15 }}>

                                            <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${item}`} borderColor={Colors.BLUE} />
                                        </View>

                                    ) : null}

                            </View>


                        </View>
                        <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingBottom: Matrics.vs30, marginTop: Matrics.vs20 }}>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.CRAYON} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{"Expertise"}</TextComponent>
                            <View style={{ marginTop: Matrics.vs10, flexWrap: "wrap", flexDirection: "row" }}>
                                {userData?.expertise ?
                                    userData?.expertise?.map(item =>
                                        <View style={{ backgroundColor: Colors.MEDIUMREDOPACITY, height: Matrics.vs40, borderRadius: Matrics.ms20, paddingHorizontal: Matrics.hs20, marginRight: Matrics.hs15, marginTop: Matrics.vs10 }}>
                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.MEDIUMRED} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{item}</TextComponent>

                                        </View>


                                    ) : null}

                            </View>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default MyProfile

const styles = StyleSheet.create({})