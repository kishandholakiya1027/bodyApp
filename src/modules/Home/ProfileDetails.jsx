import { Alert, FlatList, Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
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
import BookingContext from '../../context/BookingContext'
import CommonButton from '../../core-component/molecules/CommonButton'
import { AirbnbRating } from 'react-native-ratings'

const ProfileDetails = (props) => {
    const {designerId,likedUser} = props.route?.params
    const [userData, setUserData] = useState()
    const [like, setLike] = useState(likedUser?.includes(userData?._id))
    console.log("🚀 ~ file: ProfileDetails.jsx:19 ~ ProfileDetails ~ userData:", userData)
    const [image, setImage] = useState()
    const navigation = useNavigation()
    const { setBooking } = useContext(BookingContext)
    const { user } = useContext(UserParamContext)

    // useEffect(() => {
    //     getUserData()
    // }, [])
    useFocusEffect(
        useCallback(() => {
            getUserData()
        }, [])
    )


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
        { key: "hip_bust", label: "Hip", value: "Pear" },
    ]

    const getUserData = async () => {
            let url = "designer/get_designer/" 
            console.log("🚀 ~ file: ProfileDetails.jsx:54 ~ awaitaxios.get ~ `${API_URL}${url}${designerId}`:", `${API_URL}${url}${designerId}`)
            await axios.get(`${API_URL}${url}${designerId}`).then(async ({ data }) => {
                console.log("🚀 ~ file: ProfileDetails.jsx:33 ~ awaitaxios.get ~ data:", data)
                setImage(data?.data?.profile_img)
                if (data?.status === 200) {
                    setUserData({ ...data?.data, availability: data?.data?.availability || [] })
                    setLike(likedUser?.includes(data?.data?._id))
                // setDate(data?.data?.time[0]?.split("-")[1])
                } else {
                    Alert.alert(data?.msg)
                }
            }).catch(err => {
                console.log("🚀 ~ file: ProfileDetails.jsx:43 ~ awaitaxios.get ~ err:", err)

            })

    }

    const socialMedia = [
        "IN", "FB", "YT", "LI"
    ]


    const addLike = async (id, userId) => {
        let body = {
            "designerId": userData?._id,
            "loginUserId": user?.id
        }
        await axios.post(`${API_URL}like/add_like`, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data }) => {
            if (data?.status === 200) {
               setLike(true)
                Alert.alert("User liked ")


            }
        }).catch(err => {
            console.log("🚀 ~ file: UsedataComponent.jsx:107 ~ addLike ~ err:", err)


        })
    }
    const removeLike = async (id, userId) => {

        let body = {
            "designerId": userData?._id,
            "loginUserId": user?.id
        }
        await axios.post(`${API_URL}like/remove_like`, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data }) => {
            if (data?.status === 200) {
                Alert.alert("Removed liked ")
                setLike(false)

            }
        }).catch(err => {


        })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY }}>
                    <Header text={""} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.goBack("Home")}
                    rightImage1={<Pressable onPress={()=>like ?removeLike() : addLike()}><Image source={!like ? Images.saveprofile:Images.heart} style={{ width: Matrics.ms25, height: Matrics.ms25,  }}/></Pressable>}
                    rightImage2={<Pressable><Image source={Images.share} style={{ width: Matrics.ms25, height: Matrics.ms25,marginLeft:Matrics.vs5  }}/></Pressable>}
                    />

                    {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ margin: Matrics.ms20 }}>
                      <View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: Matrics.vs15 }}>
                            <View style={{}}>
                                <ImagePlaceHolderComponent size={Matrics.ms160} borderRadius={Matrics.ms80} padding={Matrics.hs10} marginVertical={Matrics.vs25} setImage={(image) => setUserData({ ...userData, profile_img: image })} image={userData?.profile_img ? `${IMAGE_URL}${userData?.profile_img?.uri || userData?.profile_img}` : ""} />

                            </View>
                            <View style={{}}>
                                <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{userData?.username}</TextComponent>
                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{userData?.profession}</TextComponent>
                                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginTop: Matrics.vs10 ,marginLeft:Matrics.hs15}}>
                                    <AirbnbRating
                                        count={4}
                                        defaultRating={userData?.rating}
                                        size={14}
                                        selectedColor={Colors.MEDIUMRED}
                                        showRating={false}
                                        isDisabled={true}
                                        starContainerStyle={{ paddingTop: Matrics.vs0, marginHorizontal: Matrics.hs2 }}
                                    />

                                    <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms15} color={Colors.MEDIUMRED} marginTop={Matrics.vs10} textDecorationLine='underline'>{"(20) Reviews"}</TextComponent>

                                    </View>
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
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.CRAYON} marginTop={Matrics.vs25} paddingHorizontal={Matrics.hs5}>{"Availability"}</TextComponent>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={Matrics.hs5}>{`${userData?.availability ? userData?.availability[0] : ""} - ${userData?.availability ? userData?.availability[userData?.availability?.length - 1] : ""}`}</TextComponent>
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

                                            <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => setUserData({ ...userData, portfolio: image })} image={`${IMAGE_URL}${item}`} borderColor={Colors.BLUE} />
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
                        </View>
                             
                 
                    </View>
                </ScrollView>
                <View style={{ flexDirection: "row",marginHorizontal:Matrics.vs20 }}>
                                        <View style={{ flex: 0.48, alignItems: "center", marginRight: Matrics.hs10 }}>

                                            <View style={{ marginTop: Matrics.vs10 }}>
                                                <CommonButton text={"Leave a Message"} onPress={() => {
                                                    {
                                                        !user?.id ? Alert.alert("Please sign in to explore!",
                                                            '', [

                                                            { text: 'OK', onPress: () => navigation.navigate("LoginPage") },
                                                        ]) : null
                                                    }
                                                    user?.id ? navigation.navigate("LeaveMessage") : ""
                                                }}/>


                                            </View>
                                        </View>
                                        <View style={{ flex: 0.52, }}>
                                            <View style={{ marginTop: Matrics.vs10 }}>
                                            <CommonButton text={"Book Consultation"} onPress={() => {
                                setBooking(item)
                                {
                                    !user?.id ? Alert.alert("Please sign in to explore!",
                                        '', [

                                        { text: 'OK', onPress: () => navigation.navigate("LoginPage") },
                                    ]) : null
                                }
                                user?.id ? navigation.navigate("SlotScreen") : ""
                                                }}/>
                                   

                                            </View>

                                        </View>
                                    </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ProfileDetails

const styles = StyleSheet.create({})