import { Alert, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IS_ANDROID, getRobotoFont, getRubikFont } from '../../core-utils/utils'
import Header from '../../core-component/atom/header'
import { Colors, Matrics } from '../../theme'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import DropdownComponent from '../../core-component/atom/DropdownComponent'
import TextComponent from '../../core-component/atom/TextComponent'
import axios from 'axios'
import { API_URL, IMAGE_URL } from '../../../config'
import { convertToformData } from '../../core-utils/dataConverter'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const CompleteProfile = () => {
    const [index, setIndex] = useState(0)
    const [userData, setUserData] = useState({})
    const [showlink, setShowLink] = useState(false)
    console.log("🚀 ~ file: completeProfile.jsx:19 ~ CompleteProfile ~ userData:", userData)

    const navigation = useNavigation()
    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        let user = JSON.parse(await AsyncStorage.getItem("user"))
        console.log("🚀 ~ file: completeProfile.jsx:29 ~ getUserData ~ user:", user)
        await axios.get(`${API_URL}/get_user/${user?.id}`).then(async ({ data }) => {
            console.log("🚀 ~ file: completeProfile.jsx:32 ~ awaitaxios.get ~ data:", data)
            setUserData(data)
            setIndex(0)
            await AsyncStorage.setItem("user", JSON.stringify(data))
        }).catch(err => {

        })
    }
    const qualifications = [
        { label: "Bachelor of Designing", value: "bachelor of design" },
        { label: "Bachelor of Engineering", value: "bachelor of engineering" },
        { label: "Bachelor of Computer and Science ", value: "bachelor of computer and science " },
    ]
    const profession = [
        { label: "Fashion Stylist", value: "fashion stylist" },
        { label: "Developer", value: "developer" },
        { label: "Blogger", value: "blogger" },
    ]
    const experiences = [
        { label: "0", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "7", value: "7" },
        { label: "8", value: "8" },
        { label: "9", value: "9" },
    ]

    const onSubmit = async () => {
        let user = { ...userData }
        user = { ...user, expertise: Array.isArray(user?.expertise) ? user?.expertise : user?.expertise?.split(",") }
        if (user?.socialChanels) {
            user.socialChanels = user?.socialChanels?.map(channel => channel ? channel : 0)
        }
        console.log("🚀 ~ file: completeProfile.jsx:65 ~ onSubmit ~ user:", user)
        delete user["id"]
        let body = convertToformData(user)
        console.log("🚀 ~ file: completeProfile.jsx:58 ~ onSubmit ~ body:", body)
        await axios.put(`${API_URL}user/edit_user/${userData?.id}`, body, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(async ({ data }) => {
            console.log("🚀 ~ file: completeProfile.jsx:34 ~ onSubmit ~ data:", data)
            await AsyncStorage.setItem("user", JSON.stringify({ ...user, id: userData?.id }))
            Alert.alert(data?.msg)
            setTimeout(() => {
                navigation.navigate("MyProfile")

            }, 1000);

        }).catch(error => {
            console.log("🚀 ~ file: completeProfile.jsx:38 ~ onSubmit ~ error:", error)


        })
    }

    const logOut = () => {
        AsyncStorage.multiRemove(["token"])
        navigation.reset({
            index: 0,
            routes: [{ name: 'RegisterPage' }]
        })
    }

    const socialMedia = [
        "Instagram",
        "Facebook",
        "Youtube",
        "Linkedin"
    ]
    console.log("🚀 ~ file: completeProfile.jsx:101 ~ CompleteProfile ~ socialMedia?.at(showlink):", socialMedia?.indexOf(showlink))
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <View style={{ borderBottomWidth: 0.5 }}>
                    <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : navigation.navigate("Home")} />

                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{}}>
                        <View style={{ margin: Matrics.vs20 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: Matrics.vs10 }}>
                                <View style={{ height: Matrics.ms10, borderWidth: Matrics.ms1, width: Matrics.ms10, borderRadius: Matrics.ms5, marginHorizontal: Matrics.hs3, backgroundColor: index === 0 ? Colors.RED : Colors.WHITE, borderColor: Colors.RED }}></View>
                                <View style={{ height: Matrics.ms10, borderWidth: Matrics.ms1, width: Matrics.ms10, borderRadius: Matrics.ms5, marginHorizontal: Matrics.hs3, backgroundColor: index === 1 ? Colors.RED : Colors.WHITE, borderColor: Colors.RED }}></View>
                            </View>
                            {index === 0 ? <View>
                                <ImagePlaceHolderComponent size={Matrics.ms180} borderRadius={Matrics.ms90} padding={Matrics.hs10} marginVertical={Matrics.vs25} setImage={(image) => setUserData({ ...userData, profile_img: image })} image={userData?.profile_img ? `${IMAGE_URL}${userData?.profile_img?.uri || userData?.profile_img}` : ""} />
                                <View>
                                    <TextInputComponent placeholder={"Username"} onChangeText={(text) => setUserData({ ...userData, username: text })} value={userData?.username?.toString()} />
                                    <View style={{ marginBottom: Matrics.vs15 }}>
                                        <DropdownComponent items={qualifications} setValue={(value) => setUserData({ ...userData, qualification: value })} value={userData?.qualification} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Qualification"} />

                                    </View>
                                    <View style={{ marginBottom: Matrics.vs15 }}>
                                        <DropdownComponent items={profession} setValue={(value) => setUserData({ ...userData, profession: value })} value={userData?.profession} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Profession"} />

                                    </View>
                                    <View style={{ marginBottom: Matrics.vs15 }}>
                                        <DropdownComponent items={experiences} setValue={(value) => setUserData({ ...userData, yearExperience: value })} value={userData?.yearExperience} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Years of experience"} />

                                    </View>

                                    <TextInputComponent placeholder={"Work Experience"} onChangeText={(text) => setUserData({ ...userData, workExperience: text })} value={userData?.workExperience} />
                                    <TextInputComponent placeholder={"Portfolio/Website URL"} onChangeText={(text) => setUserData({ ...userData, websiteUrl: text })} value={userData?.websiteUrl} />

                                </View>
                                <View style={{}}>
                                    {userData?.portfolio ?
                                        <View style={{}}>
                                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                {/* <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${""}`} borderColor={Colors.BLUE} />
                                                <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${""}`} borderColor={Colors.BLUE} />
                                                <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${""}`} borderColor={Colors.BLUE} />
                                                <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${""}`} borderColor={Colors.BLUE} /> */}

                                                {userData?.portfolio ?
                                                    userData?.portfolio?.map(item =>
                                                        <View style={{ marginRight: Matrics.vs15 }}>
                                                            <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={item?.uri || `${IMAGE_URL}${item}`} borderColor={Colors.BLUE} />
                                                        </View>


                                                    ) : null}

                                            </View>
                                            <Pressable onPress={() => setUserData({ ...userData, portfolio: "" })}>

                                                <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms18} color={Colors.BLUE} marginTop={Matrics.vs15} paddingHorizontal={0} textDecorationLine={"underline"}>Edit Portfolio</TextComponent>
                                            </Pressable>

                                        </View>

                                        : <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                                            <View style={{ flex: 0.77 }}>
                                                <TextComponent fontFamily={getRubikFont("")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15}>or upload your portfolio</TextComponent>
                                                <TextComponent fontFamily={getRubikFont("Italic")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs0}>{"(png,jpeg)"}</TextComponent>

                                            </View>
                                            <View style={{ flex: 0.23 }}>
                                                <ImagePlaceHolderComponent multiple={true} size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs25} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${userData?.portfolio}`} borderColor={Colors.BLUE} />

                                                {/* <View style={{ width: Matrics.ms80, height: Matrics.ms80, borderWidth: 1, borderColor: Colors.BLUE }}></View> */}
                                            </View>

                                        </View>}
                                </View>


                            </View>
                                :
                                <View style={{ height: "97%" }}>
                                    <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.hs0}>Add Your Expertise in Fashion & Styling</TextComponent>
                                    <View style={{ marginVertical: Matrics.vs10 }}>
                                        <TextInputComponent placeholder={"Add tags separated by comma"} onChangeText={(text) => setUserData({ ...userData, expertise: text })} value={userData?.expertise?.toString()} multiline={true} height={Matrics.vs120} />

                                    </View>
                                    <View>
                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.hs0}>Add Your Social Channels</TextComponent>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: Matrics.vs15 }}>
                                            <Pressable onPress={() => setShowLink("Instagram")} style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, backgroundColor: Colors.BLUE, justifyContent: "center", alignItems: "center", position: "relative" }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.WHITE} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{"IN"}</TextComponent>
                                                {userData?.socialChanels && userData?.socialChanels[0] && userData?.socialChanels[0] != 0 ? <View style={{ height: Matrics.ms18, width: Matrics.ms18, backgroundColor: Colors.RED, borderRadius: Matrics.ms9, position: "absolute", bottom: -10, zIndex: 999999, right: -8, borderWidth: 1, borderColor: Colors.WHITE }}></View> : null}
                                            </Pressable>
                                            <Pressable onPress={() => setShowLink("Facebook")} style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginLeft: Matrics.hs15, backgroundColor: Colors.BLUE, justifyContent: "center", alignItems: "center" }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.WHITE} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{"FB"}</TextComponent>
                                                {userData?.socialChanels && userData?.socialChanels[1] && userData?.socialChanels[1] != 0 ? <View style={{ height: Matrics.ms18, width: Matrics.ms18, backgroundColor: Colors.RED, borderRadius: Matrics.ms9, position: "absolute", bottom: -10, zIndex: 999999, right: -8, borderWidth: 1, borderColor: Colors.WHITE }}></View> : null}

                                            </Pressable>
                                            <Pressable onPress={() => setShowLink("Youtube")} style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginLeft: Matrics.hs15, backgroundColor: Colors.BLUE, justifyContent: "center", alignItems: "center" }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.WHITE} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{"YT"}</TextComponent>
                                                {userData?.socialChanels && userData?.socialChanels[2] && userData?.socialChanels[2] != 0 ? <View style={{ height: Matrics.ms18, width: Matrics.ms18, backgroundColor: Colors.RED, borderRadius: Matrics.ms9, position: "absolute", bottom: -10, zIndex: 999999, right: -8, borderWidth: 1, borderColor: Colors.WHITE }}></View> : null}

                                            </Pressable>
                                            <Pressable onPress={() => setShowLink("Linkedin")} style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginLeft: Matrics.hs15, backgroundColor: Colors.BLUE, justifyContent: "center", alignItems: "center" }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.WHITE} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{"LI"}</TextComponent>
                                                {userData?.socialChanels && userData?.socialChanels[3] && userData?.socialChanels[3] != 0 ? <View style={{ height: Matrics.ms18, width: Matrics.ms18, backgroundColor: Colors.RED, borderRadius: Matrics.ms9, position: "absolute", bottom: -10, zIndex: 999999, right: -8, borderWidth: 1, borderColor: Colors.WHITE }}></View> : null}

                                            </Pressable>

                                        </View>
                                        {showlink ? <View style={{ marginTop: Matrics.vs15 }}>
                                            <TextInputComponent placeholder={`${showlink} url`} onChangeText={(text) => {
                                                let data = { ...userData, socialChanels: userData?.socialChanels || new Array(4).fill(0) }
                                                data.socialChanels[socialMedia?.indexOf(showlink)] = text
                                                setUserData({ ...data })
                                            }} value={userData?.socialChanels && userData?.socialChanels?.[socialMedia?.indexOf(showlink)]} />

                                        </View> : null}

                                    </View>
                                    <View>
                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.hs0}>Add Your Consultaion Charges</TextComponent>
                                        <View style={{ marginTop: Matrics.vs15, flexDirection: "row" }}>
                                            <View style={{ flex: 0.45 }}>

                                                <TextInputComponent placeholder={"INR 300"} keyboardType={"numeric"} onChangeText={(text) => setUserData({ ...userData, consultationCharge: text })} value={userData?.consultationCharge?.toString()} />
                                            </View>
                                            <View style={{ flex: 0.35 }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.hs0}> / session</TextComponent>

                                            </View>
                                        </View>
                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.RED} marginTop={Matrics.vs15} paddingHorizontal={Matrics.hs0}>* One session duration will be 30 minutes with minimum charges of INR 300. You can increase the charges as you  see fit</TextComponent>

                                    </View>

                                </View>
                            }
                        </View>

                    </View>

                </ScrollView>
                {
                    index === 0 ?
                        <View style={{ alignItems: "center", marginBottom: Matrics.vs20 }}>
                            <Pressable style={styles.buttonView} onPress={() => setIndex(1)}>
                                <Text style={styles.textStyle}>{"Next"}</Text>
                            </Pressable>

                        </View> :
                        <View style={{ justifyContent: "flex-end", flex: 1, marginHorizontal: Matrics.vs20 }}>
                            <View style={{ alignItems: "flex-end", marginVertical: Matrics.vs20, justifyContent: "space-between", flexDirection: "row" }}>
                                <Pressable style={styles.buttonView} onPress={() => setIndex(0)}>
                                    <Text style={styles.textStyle}>{"Back"}</Text>
                                </Pressable>
                                <Pressable style={styles.buttonView} onPress={() => onSubmit(1)}>
                                    <Text style={styles.textStyle}>{"Next"}</Text>
                                </Pressable>

                            </View>

                        </View>
                }
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default CompleteProfile

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs50, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
})