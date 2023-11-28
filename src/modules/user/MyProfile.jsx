import { Alert, FlatList, Image, KeyboardAvoidingView, Linking, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../../core-component/atom/header'
import { Colors, Images, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import TextComponent from '../../core-component/atom/TextComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import { API_URL, IMAGE_URL } from '../../../config'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import UserParamContext from '../../context/setUserContext'
import CommonButton from '../../core-component/molecules/CommonButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MyProfile = () => {
    const [userData, setUserData] = useState()
    const [profileData, setProfileData] = useState()
    const [image, setImage] = useState()
    const navigation = useNavigation()
    const { user } = useContext(UserParamContext)
    console.log("🚀 ~ file: MyProfile.jsx:22 ~ MyProfile ~ user:", user)
    const insets = useSafeAreaInsets();

    // useEffect(() => {
    //     getUserData()
    // }, [])
    useFocusEffect(
        useCallback(() => {
            getUserData()
        }, [])
    )


    const getUserData = async () => {
        if (user) {
            let url = user?.role ? "designer/get_designer/" : "user/get_user/"
            await axios.get(`${API_URL}${url}${user?.id || user?._id}`).then(async ({ data }) => {
                setImage(data?.data?.profile_img)
                if (data?.status === 200) {
                    if (user?.role)
                        setUserData({ ...data?.data, availability: data?.data?.availability || [] })
                    else {
                        let userdata = []
                        usersData?.map(itm => {
                            userdata = [...userdata || [], { label: itm?.label, value: data?.data[itm?.key] }]

                        })

                        setProfileData(userdata)
                        setUserData(data?.data)
                    }
                    await AsyncStorage.setItem("user", JSON.stringify({ ...data?.data, role: user?.role }))
                    // setDate(data?.data?.time[0]?.split("-")[1])
                } else {
                    Alert.alert(data?.msg)
                }
            }).catch(err => {
                console.log("🚀 ~ file: MyProfile.jsx:43 ~ awaitaxios.get ~ err:", err)

            })

        }
    }

    const socialMedia = [
        "IN", "FB", "YT", "LI"
    ]
    const usersData = [
        { key: "age", label: "Age", value: 32 },
        { key: "gender", label: "Gender", value: "Female" },
        { key: "body_type", label: "Body type", value: "Pear" },
        { key: "face_type", label: "Face type", value: "Pear" },
        { key: "complexion", label: "Complexion", value: "Pear" },
        { key: "hair_length", label: "Hair", value: "Pear" },
        { key: "height", label: "Height", value: "Pear" },
        { key: "waist_size", label: "Waist", value: "Pear" },
        { key: "bust_size", label: "Bust", value: "Pear" },
        { key: "hip_size", label: "Hip", value: "Pear" },
    ]

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: Matrics.ms55, marginRight: Matrics.vs20 }}>
                        <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{"My Profile"}</TextComponent>

                        <Pressable onPress={() => navigation.navigate("Home")}>
                            <Image source={Images.close} style={{ width: Matrics.ms18, height: Matrics.ms18 }} />
                        </Pressable>
                    </View>
                    {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ margin: Matrics.ms20 }}>
                        {user?.role ? <View>

                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: Matrics.vs15 }}>
                                <View>
                                    <ImagePlaceHolderComponent disabled={true} size={Matrics.ms160} borderRadius={Matrics.ms80} padding={Matrics.hs10} marginVertical={Matrics.vs25} setImage={(image) => setUserData({ ...userData, profile_img: image })} image={userData?.profile_img ? `${IMAGE_URL}${userData?.profile_img?.uri || userData?.profile_img}` : ""} />

                                </View>
                                <View style={{ flexWrap: "wrap", flex: 1 }}>
                                    <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{userData?.username}</TextComponent>
                                    <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{userData?.profession}</TextComponent>
                                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: Matrics.vs15, flexWrap: "wrap", marginLeft: Matrics.vs15 }}>
                                        {userData?.socialChanels?.map((channel, i) => {
                                            return channel && channel != 0 ? <Pressable onPress={() => Linking.openURL(channel)} style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginLeft: Matrics.hs5, backgroundColor: Colors.BLUE, justifyContent: "center", alignItems: "center", marginTop: Matrics.vs10 }}>

                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.WHITE} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{socialMedia[i]}</TextComponent>
                                            </Pressable> : null
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
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.CRAYON} marginTop={Matrics.vs25} paddingHorizontal={Matrics.hs5}>{"Availability"}</TextComponent>
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{`${userData?.availability ? userData?.availability[0] || "" : ""} - ${userData?.availability ? userData?.availability[userData?.availability?.length - 1] || "" : ""}`}</TextComponent>
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{`${userData?.time && userData?.time[0] || ""}`}</TextComponent>

                            </View>
                            <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingBottom: Matrics.vs30, marginTop: Matrics.vs20 }}>
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.CRAYON} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{"Qualification and Experience"}</TextComponent>
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{userData?.qualification}</TextComponent>
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{userData?.workExperience}</TextComponent>

                            </View>
                            <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingBottom: Matrics.vs30, marginTop: Matrics.vs20, justifyContent: "flex-start", alignItems: "flex-start" }}>
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.CRAYON} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{"Portfolio"}</TextComponent>
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{userData?.websiteUrl}</TextComponent>
                                <View style={{ marginTop: Matrics.vs10, flexDirection: "row", flexWrap: "wrap" }}>
                                    {userData?.portfolio ?
                                        userData?.portfolio?.map(item =>
                                            <View style={{ marginRight: Matrics.vs15 }}>

                                                <ImagePlaceHolderComponent disabled={true} size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${item}`} borderColor={Colors.BLUE} />
                                            </View>

                                        ) : null}

                                </View>


                            </View>
                            <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingBottom: Matrics.vs30, marginTop: Matrics.vs20 }}>
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.CRAYON} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{"Focused Assistance in"}</TextComponent>
                                <View style={{ marginTop: Matrics.vs10, flexWrap: "wrap", flexDirection: "row" }}>
                                    {userData?.assist ?
                                        userData?.assist?.map(item =>
                                            <View style={{ backgroundColor: Colors.MEDIUMREDOPACITY, height: Matrics.vs40, borderRadius: Matrics.ms20, paddingHorizontal: Matrics.hs15, marginRight: Matrics.hs10, marginTop: Matrics.vs10 }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.MEDIUMRED} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{item}</TextComponent>

                                            </View>


                                        ) : null}

                                </View>

                            </View>
                            <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingBottom: Matrics.vs30, marginTop: Matrics.vs20 }}>
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.CRAYON} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{"Expertise"}</TextComponent>
                                <View style={{ marginTop: Matrics.vs10, flexWrap: "wrap", flexDirection: "row" }}>
                                    {userData?.expertise ?
                                        userData?.expertise?.map(item =>
                                            <View style={{ backgroundColor: Colors.MEDIUMREDOPACITY, height: Matrics.vs40, borderRadius: Matrics.ms20, paddingHorizontal: Matrics.hs15, marginRight: Matrics.hs10, marginTop: Matrics.vs10 }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.MEDIUMRED} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{item}</TextComponent>

                                            </View>


                                        ) : null}

                                </View>

                            </View>
                        </View> :
                            <View style={{ marginTop: Matrics.vs20 }}>
                                <ImagePlaceHolderComponent disabled={true} size={Matrics.ms215} padding={Matrics.hs40} setImage={(image) => setImage(image)} image={image ? image?.uri || `${IMAGE_URL}${image}` : ""} marginVertical={Matrics.vs0} />
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                                    <TextComponent fontFamily={getRubikFont()} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs13} paddingHorizontal={Matrics.hs5}>{userData?.username}</TextComponent>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: Matrics.vs30 }}>
                                    <View style={{ width: "80%" }}>
                                        <FlatList
                                            data={profileData}
                                            numColumns={2}
                                            horizontal={false}
                                            renderItem={({ item }) => {
                                                console.log("🚀 ~ file: MyProfile.jsx:207 ~ MyProfile ~ item:", item)
                                                return (
                                                    <View style={{ marginHorizontal: Matrics.hs0, marginVertical: Matrics.vs5, justifyContent: "flex-start", alignItems: "flex-start", minWidth: "52%", }}>

                                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs5}>{`${item?.label}:`}</TextComponent>
                                                        {item?.label === "Height" ?
                                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs5}>{`${item?.value?.[0]}'${item?.value?.[1]}"`}</TextComponent>
                                                            : item?.label === "Bust" ?
                                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs5}>{`${item?.value?.[0]}" [${item?.value?.[1]}]`}</TextComponent>
                                                                :
                                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs5}>{item?.value}</TextComponent>

                                                        }
                                                    </View>
                                                )
                                            }}

                                        />

                                    </View>
                                    {/* {userData?.map(user => {
                                  return (
                                      <View style={{ flex: 0.3 }}>
                                          <TextComponent fontFamily={getRobotoFont("")} size={Matrics.ms16} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>{user?.label}</TextComponent>
                                          <TextComponent fontFamily={getRobotoFont("")} size={Matrics.ms16} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>{user?.value}</TextComponent>

                                      </View>
                                  )
                              })} */}
                                </View>



                            </View>
                        }
                    </View>
                </ScrollView>
                <View style={{ alignItems: "center", paddingBottom: insets?.bottom ? 0 : Matrics.ms20 }}>
                    <View style={{ width: "50%" }}>
                        <CommonButton text={"Edit Profile"} onPress={() => navigation.navigate(user?.role ? "OnBoarding" : "UserProfile")} viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} />

                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default MyProfile

const styles = StyleSheet.create({})