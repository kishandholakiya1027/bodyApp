import { Alert, Button, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { IS_ANDROID, getRobotoFont, getRubikFont, showToast } from '../../core-utils/utils'
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
import UserParamContext from '../../context/setUserContext'
import DatePicker from 'react-native-date-picker'
import moment from "moment"

const CompleteProfile = () => {
    const [index, setIndex] = useState(0)
    const [userData, setUserData] = useState({})
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState()
    const [loader, setLoader] = useState()
    const [openDate, setOpenDate] = useState(false)
    const [secondDate, setSecondDate] = useState()
    const [openExpertise, setOpenExpertise] = useState(false)
    const [oldPortfolio, setOldPortfolio] = useState([])

    const [showlink, setShowLink] = useState(false)
    const [expertise, setExpertise] = useState()
    const { user, setUser } = useContext(UserParamContext)

    const navigation = useNavigation()
    useEffect(() => {
        getUserData()
    }, [])


    const getUserData = async () => {
        if (user) {
            await axios.get(`${API_URL}designer/get_designer/${user?.id || user?._id}`).then(async ({ data }) => {
                if (data?.status === 200) {
                    setUserData({ ...data?.data, availability: data?.data?.availability || [], portfolio: [] })
                    setOldPortfolio(data?.data?.portfolio)
                    setDate(data?.data?.time?.length ? !(data?.data?.time[0]?.split("-")[0]?.includes("Invalid date") || data?.data?.time[0]?.split("-")[0]?.includes("Invalid Date")) ? moment(data?.data?.time[0]?.split("-")[0], "HH:mm")._d : "" : "")
                    setSecondDate(data?.data?.time?.length ? !(data?.data?.time[0]?.split("-")[1]?.includes("Invalid date") || data?.data?.time[0]?.split("-")[1]?.includes("Invalid Date")) ? moment(data?.data?.time[0]?.split("-")[1], "HH:mm")._d : "" : "")
                    // setDate(data?.data?.time[0]?.split("-")[1])
                    // setIndex(0)
                    setUser({ ...data?.data, role: user?.role })

                    await AsyncStorage.setItem("user", JSON.stringify({ ...data?.data, role: user?.role, }))
                } else {
                    showToast(data?.msg)
                }
            }).catch(err => {

            })

        }
    }
    const qualifications = [
        { label: "Bachelor of Designing", value: "bachelor of design" },
        { label: "Bachelor of Engineering", value: "bachelor of engineering" },
        { label: "Bachelor of Computer and Science ", value: "bachelor of computer and science " },
    ]
    const profession = [
        { label: "Fashion Stylist", value: "fashion stylist" },
        { label: "Fashion Designer", value: "fashion designer" },
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
        if (!secondDate || !date) {
            showToast("Please enter  time")
        } else {
            setLoader(true)
            let updateUser = { ...userData, }
            if (oldPortfolio?.length) {
                updateUser.old_portfolio = oldPortfolio
            }
            updateUser = { ...updateUser, expertise: Array.isArray(updateUser?.expertise) ? updateUser?.expertise : updateUser?.expertise?.split(",") }
            if (date && secondDate) {
                updateUser = { ...updateUser, time: [`${moment(date).format("HH:mm")} - ${moment(secondDate).format("HH:mm")} `] }
            }
            if (updateUser?.socialChanels) {
                updateUser.socialChanels = updateUser?.socialChanels?.map(channel => channel ? channel : 0)
            }
            delete updateUser["id"]
            delete updateUser["_id"]
            updateUser.complete = true
            let body = convertToformData(updateUser)
            console.log("🚀 ~ file: completeProfile.jsx:105 ~ onSubmit ~ body:", body)
            await axios.put(`${API_URL}designer/edit_designer/${userData?.id || userData?._id}`, body, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(async ({ data }) => {
                console.log("🚀 ~ file: completeProfile.jsx:112 ~ onSubmit ~ data:", data)
                if (data?.status === 200) {
                    setUser({ ...user, id: userData?.id || userData?._id, role: user?.role, complete: true })

                    await AsyncStorage.setItem("user", JSON.stringify({ ...user, id: userData?.id, role: user?.role, complete: true }))
                    setLoader(false)

                    navigation.navigate("MyProfile")

                } else {
                    setLoader(false)

                    showToast(data?.msg || data?.error)
                }

            }).catch(error => {
                setLoader(false)
                console.log("🚀 ~ file: completeProfile.jsx:123 ~ onSubmit ~ error:", error)

            })
        }
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

    const assistUser = [
        "Create Unique Looks",
        "Refresh Wardrobe",
        "Custom Designs",
        "Reuse/Mix & Match",
        "Shopping Assistance",
    ]

    const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ]

    const checkError = (data) => {
        function validateData() {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                console.log("🚀 ~ file: completeProfile.jsx:171 ~ validateData ~ userData?.[item?.key]:", userData?.[item?.key])
                if(item?.key === "portfolio"  ){
                    if(oldPortfolio?.length === 0){
                        showToast(`Please enter ${item?.label}`);
                        return true 

                    }
                    return false 
                }
                if (item?.key === "consultationCharge" && userData?.[item?.key] <= 300) {
                    showToast(`consultation charge should be grater than 300`);
                    return true // Break out of the loop and return false

                }
                if (!userData?.[item?.key] || userData?.[item?.key]?.length === 0) {
                    showToast(`Please enter ${item?.label}`);
                    return true // Break out of the loop and return false
                }
            }
            return false; // All items passed the validation
        }

        return validateData();
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <View style={{ borderBottomWidth: 0.5 }}>
                    <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : navigation.goBack()} />

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
                                    <View style={{}}>
                                        <TextInputComponent placeholder={"Qualification"} onChangeText={(text) => setUserData({ ...userData, qualification: text })} value={userData?.qualification} />


                                    </View>
                                    <View style={{ marginBottom: Matrics.vs15 }}>
                                        <DropdownComponent items={profession} setValue={(value) => setUserData({ ...userData, profession: value })} value={userData?.profession} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Profession"} />

                                    </View>
                                    <View style={{}}>
                                        <TextInputComponent placeholder={"Years of experience"} onChangeText={(text) => setUserData({ ...userData, yearExperience: text })} value={userData?.yearExperience} />

                                        {/* <DropdownComponent items={experiences} setValue={(value) => setUserData({ ...userData, yearExperience: value })} value={userData?.yearExperience} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Years of experience"} /> */}

                                    </View>

                                    <TextInputComponent placeholder={"Work Experience"} onChangeText={(text) => setUserData({ ...userData, workExperience: text })} value={userData?.workExperience} />
                                    <TextInputComponent placeholder={"Portfolio/Website URL"} onChangeText={(text) => setUserData({ ...userData, websiteUrl: text })} value={userData?.websiteUrl} />

                                </View>
                                <View style={{}}>
                                    {oldPortfolio?.length || userData?.portfolio?.length ?
                                        <View style={{}}>
                                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                {/* <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${""}`} borderColor={Colors.BLUE} />
                                                <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${""}`} borderColor={Colors.BLUE} />
                                                <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${""}`} borderColor={Colors.BLUE} />
                                                <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${""}`} borderColor={Colors.BLUE} /> */}

                                                {oldPortfolio?.length || userData?.portfolio?.length ?
                                                    [...oldPortfolio||[], ...userData?.portfolio||[]]?.map(item =>
                                                        <View style={{ marginRight: Matrics.vs15 }}>
                                                            <ImagePlaceHolderComponent disabled={true} size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={item?.uri || `${IMAGE_URL}${item?.uri || item}`} borderColor={Colors.BLUE} />
                                                        </View>


                                                    ) : null}

                                            </View>
                                            <View style={{ position: "relative", justifyContent: "center", alignItems: "flex-start" }}>

                                                <ImagePlaceHolderComponent plus={true} multiple={true} size={Matrics.ms60} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs15} setImage={(image) => setUserData({ ...userData, portfolio: [...userData?.portfolio||[], ...image] })} image={`ss`} borderColor={Colors.BLUE} />
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
                                                <ImagePlaceHolderComponent plus multiple={true} size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs25} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}`} borderColor={Colors.BLUE} />

                                                {/* <View style={{ width: Matrics.ms80, height: Matrics.ms80, borderWidth: 1, borderColor: Colors.BLUE }}></View> */}
                                            </View>

                                        </View>}

                                </View>


                            </View>
                                :
                                <View style={{ height: "94%" }}>
                                    <View>
                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.hs0}>How would you like to assist users  </TextComponent>
                                        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start", marginTop: Matrics.vs10 }}>
                                            {
                                                assistUser?.map(user => {
                                                    return (
                                                        <Pressable onPress={() => {
                                                        if(!userData?.assist?.includes(user)){
                                                        setUserData({ ...userData, assist: [...userData?.assist || [], user] })
                                                        
                                                        }else{
                                                            setUserData({ ...userData, assist: userData?.assist?.filter(item => item !== user) })
                                                        }
                                                        
                                                        }} style={{ paddingHorizontal: Matrics.hs15, paddingVertical: Matrics.vs12, backgroundColor: userData?.assist?.includes(user) ? Colors.MEDIUMREDOPACITY : Colors.BACKGROUNDGRAY, marginRight: Matrics.vs10, marginVertical: Matrics.vs5, borderRadius: Matrics.ms25, justifyContent: "center" }}>
                                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={userData?.assist?.includes(user) ? Colors.MEDIUMRED : Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>{user}</TextComponent>

                                                        </Pressable>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>

                                    <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.hs0}>Add Your Expertise in Fashion & Styling</TextComponent>
                                    <View style={{ marginVertical: Matrics.vs10 }}>
                                        {userData?.expertise?.length ?
                                            <Pressable onPress={() => setOpenExpertise(true)} style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start", marginTop: Matrics.vs10, borderColor: Colors.LIGHTGRAY, borderWidth: 1, padding: Matrics.ms10 }}>
                                                {userData?.expertise?.map(user => {
                                                    return (
                                                        <Pressable onPress={() => setOpenExpertise(true)} style={{ paddingHorizontal: Matrics.hs15, paddingVertical: Matrics.vs12, backgroundColor: Colors.MEDIUMREDOPACITY, marginRight: Matrics.vs10, marginVertical: Matrics.vs5, borderRadius: Matrics.ms25, justifyContent: "center" }}>
                                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.MEDIUMRED} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>{user}</TextComponent>

                                                        </Pressable>
                                                    )
                                                })}
                                            </Pressable>
                                            : null
                                        }

                                    </View>
                                    {openExpertise || userData?.expertise?.length === 0 ? <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>

                                        <TextInputComponent placeholder={"Add tags for Fashion&style"} onChangeText={(text) => setExpertise(text)} height={Matrics.vs50} value={expertise} />
                                        <Pressable style={{ backgroundColor: Colors.BLUE, paddingVertical: Matrics.vs7, alignItems: "center", paddingHorizontal: Matrics.hs15, borderRadius: Matrics.ms10, marginTop: Matrics.vs7, marginLeft: Matrics.hs10 }} onPress={() => {
                                            setExpertise("")
                                            setOpenExpertise(false)
                                            setUserData({ ...userData, expertise: [...userData?.expertise || [], expertise] })
                                        }}>
                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.WHITE} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>Add</TextComponent>

                                        </Pressable>
                                    </View> : null}
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
                                    <View>
                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.hs0}>Add Your Availability </TextComponent>
                                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: Matrics.vs10 }}>
                                            {days?.map(day => {
                                                return (
                                                    <>
                                                        <Pressable onPress={() => userData?.availability?.includes(day) ? setUserData({ ...userData, availability: userData?.availability?.filter(item => item !== day) }) : setUserData({ ...userData, availability: [...userData?.availability || [], day] })} style={{ height: Matrics.ms43, width: Matrics.ms43, marginRight: Matrics.vs5, borderRadius: Matrics.ms21, backgroundColor: userData?.availability?.includes(day) ? Colors.MEDIUMRED : Colors.BACKGROUNDGRAY, justifyContent: "center", alignItems: "center", position: "relative" }}>
                                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={userData?.availability?.includes(day) ? Colors.BACKGROUNDGRAY : Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{day[0]?.toUpperCase()}</TextComponent>
                                                        </Pressable>
                                                        {/* <Pressable onPress={() => userData?.availability?.includes(day) ? setUserData({ ...userData, availability: userData?.availability?.filter(item => item !== day) }) : setUserData({ ...userData, availability: [...userData?.availability || [], day] })} style={{ width: Matrics.ms43, marginRight: Matrics.vs5, marginTop: Matrics.vs10, height: Matrics.ms43, borderRadius: Matrics.ms21, backgroundColor: userData?.availability?.includes(day) ? Colors.MEDIUMRED : Colors.BACKGROUNDGRAY, alignItems: "center", justifyContent: "center" }}>
                                                        <TextComponent  textAlign='center' fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={userData?.availability?.includes(day) ? Colors.BACKGROUNDGRAY : Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs1}>{day[0]?.toUpperCase()} </TextComponent>

                                                    </Pressable> */}
                                                    </>
                                                )
                                            })}
                                        </View>
                                    </View>
                                    <View>
                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.hs0}>Timings </TextComponent>
                                        <View style={{ flexDirection: "row", marginTop: Matrics.vs15, alignItems: "center" }}>
                                            <Pressable onPress={() => setOpen(true)} style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginRight: Matrics.vs5, justifyContent: "center", alignItems: "center", position: "relative" }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{date ? moment(date).format("HH") : "00"}</TextComponent>
                                            </Pressable>
                                            <Pressable onPress={() => setOpen(true)} style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginRight: Matrics.vs5, justifyContent: "center", alignItems: "center", position: "relative" }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{date ? moment(date).format("mm") : "00"}</TextComponent>
                                            </Pressable>
                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs15}>-</TextComponent>
                                            <Pressable onPress={() => setOpenDate(true)} style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginRight: Matrics.vs5, justifyContent: "center", alignItems: "center", position: "relative" }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{secondDate ? moment(secondDate).format("HH") : "00"}</TextComponent>
                                            </Pressable>
                                            <Pressable onPress={() => setOpenDate(true)} style={{ borderWidth: 1, borderColor: Colors.BLUE, height: Matrics.ms50, width: Matrics.ms50, marginRight: Matrics.vs5, justifyContent: "center", alignItems: "center", position: "relative" }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs5}>{secondDate ? moment(secondDate).format("mm") : "00"}</TextComponent>
                                            </Pressable>




                                            <DatePicker
                                                modal
                                                open={open}
                                                date={date || new Date()}
                                                onConfirm={(date) => {
                                                    setOpen(false)
                                                    setDate(date)
                                                }}
                                                mode='time'
                                                onCancel={() => {
                                                    setOpen(false)
                                                }}
                                            />
                                            <DatePicker
                                                modal
                                                open={openDate}
                                                date={secondDate || new Date()}
                                                onConfirm={(date) => {
                                                    setOpenDate(false)
                                                    setSecondDate(date)
                                                }}
                                                mode='time'
                                                onCancel={() => {
                                                    setOpenDate(false)
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>

                    </View>

                </ScrollView>
                {
                    index === 0 ?
                        <View style={{ alignItems: "center", marginBottom: Matrics.vs20 }}>
                            <Pressable style={styles.buttonView} onPress={() => checkError([
                                {label:"profile image",key:"profile_img"},
                                {label:"username",key:"username"},
                                {label:"qualification",key:"qualification"},
                                {label:"profession",key:"profession"},
                                {label:"year experience",key:"yearExperience"},
                                {label:"work experience",key:"workExperience"},
                                {label:"website url",key:"websiteUrl"},
                                {label:"portfolio",key:"portfolio"},
                            ]) ? {} : setIndex(1)}>
                                <Text style={styles.textStyle}>{"Next"}</Text>
                            </Pressable>

                        </View> :
                        <View style={{ justifyContent: "flex-end", marginHorizontal: Matrics.vs20 }}>
                            <View style={{ alignItems: "flex-end", marginVertical: Matrics.vs20, justifyContent: "space-between", flexDirection: "row" }}>
                                <Pressable style={styles.buttonView} onPress={() => setIndex(0)}>
                                    <Text style={styles.textStyle}>{"Back"}</Text>
                                </Pressable>
                                <Pressable style={[styles.buttonView, { backgroundColor: Colors.BLUE ,opacity:loader? 0.7:1}]} disabled={loader} onPress={() => checkError([
                                    {label:"assist",key:"assist"},
                                    {label:"expertise",key:"expertise"},
                                    {label:"social channel",key:"socialChanels"},
                                    {label:"consultation charge",key:"consultationCharge"},
                                    {label:"availability",key:"availability"},
                                ]) ? {} : onSubmit(1)}>
                                    <Text style={[styles.textStyle, { color: Colors.WHITE }]}>{"Submit"}</Text>
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