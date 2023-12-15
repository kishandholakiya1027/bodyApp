import { Alert, Dimensions, FlatList, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { IS_ANDROID, getRobotoFont, getRubikFont, showToast } from '../../core-utils/utils'
import HeaderTextComponent from '../../core-component/molecules/HeaderTextComponent'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import { Colors, Images, Matrics } from '../../theme'
import ButtonComponent from '../../core-component/atom/ButtonComponent'
import BoxComponent from '../../core-component/atom/BoxComponent'
import TextComponent from '../../core-component/atom/TextComponent'
import Header from '../../core-component/atom/header'
import DropdownComponent from '../../core-component/atom/DropdownComponent'
import { API_URL, IMAGE_URL } from '../../../config'
import CommonButton from '../../core-component/molecules/CommonButton'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import UserParamContext from '../../context/setUserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { convertToformData } from '../../core-utils/dataConverter'

const { width, height } = Dimensions.get('window');

const UserProfile = () => {
    const [index, setIndex] = useState(0)
    const [loader, setLoader] = useState()

    const [userData, setUserData] = useState({})
    const navigation = useNavigation()
    const { user, setUser } = useContext(UserParamContext)

    useFocusEffect(
        useCallback(() => {
            getUserData()
        }, [])
    )


    const getUserData = async () => {
        if (user) {
            let url = "user/get_user/"
            await axios.get(`${API_URL}${url}${user?.id || user?._id}`).then(async ({ data }) => {
                if (data?.status === 200) {


                    setUserData(data?.data)
                    await AsyncStorage.setItem("user", JSON.stringify({ ...data?.data, role: user?.role }))
                    // setDate(data?.data?.time[0]?.split("-")[1])
                } else {
                    showToast(data?.msg)
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
        "profile_img",
        "username",
        "age",
        "gender",
        "body_type",
        "face_type",
        "complexion",
        "hair_length",
        "height",
        "bust_size",
        "waist_size",
        "hip_size",
    ]

    const hightFeet = [
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "7", value: "7" },
        { label: "8", value: "8" },
    ]
    const hightInch = [
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


    const bustSizeInches = [
        { label: "23", value: "23" },
        { label: "24", value: "24" },
        { label: "25", value: "25" },
        { label: "26", value: "26" },
        { label: "27", value: "27" },
        { label: "28", value: "28" },
        { label: "29", value: "29" },
        { label: "30", value: "30" },
        { label: "31", value: "31" },
        { label: "32", value: "32" },
        { label: "33", value: "33" },
        { label: "34", value: "34" },
        { label: "35", value: "35" },
        { label: "36", value: "36" },
        { label: "37", value: "37" },
        { label: "38", value: "38" },
        { label: "39", value: "39" },
        { label: "40", value: "40" },
        { label: "41", value: "41" },
        { label: "42", value: "42" },
        { label: "43", value: "43" },
        { label: "44", value: "44" },
        { label: "45", value: "45" },
        { label: "46", value: "46" },
        { label: "47", value: "47" },
        { label: "48", value: "48" },
        { label: "49", value: "49" },
    ]

    const bustSizeAlpha = [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
        { label: "D", value: "D" },
        { label: "E", value: "E" },
        { label: "F", value: "F" },
    ]

    const waistSizes = [
        { label: "24", value: "24" },
        { label: "26", value: "26" },
        { label: "28", value: "28" },
        { label: "30", value: "30" },
        { label: "32", value: "32" },
        { label: "34", value: "34" },
        { label: "36", value: "36" },
    ]

    const hipSizes = [
        { label: "33", value: "33" },
        { label: "35", value: "35" },
        { label: "37", value: "37" },
        { label: "39", value: "39" },
        { label: "41", value: "41" },
        { label: "43", value: "43" },
        { label: "45", value: "45" },
    ]

    const gender = [
        { label: "Female", value: "Female" },
        { label: "Male", value: "Male" },
        { label: "Other", value: "Other" },
    ]

    const onProfileUpdate = async () => {
        setLoader(true)
        let usr = { ...userData }
        console.log("🚀 ~ file: UserProfile.jsx:161 ~ onProfileUpdate ~ usr:", usr)
        delete usr["_id"]
        delete usr["__v"]

        // if(usr)
        if (!usr?.new) {
            delete usr["profile_img"]
        }
        usr.complete = true
        let body = convertToformData(usr)
        console.log("🚀 ~ file: UserProfile.jsx:168 ~ onProfileUpdate ~ `${API_URL}user/edit_user/${userData?.id || userData?._id}`:", `${API_URL}user/edit_user/${userData?.id || userData?._id}`)
        await axios.put(`${API_URL}user/edit_user/${userData?.id || userData?._id}`, body, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(async ({ data }) => {
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



        })

    }
    const checkError = (data) => {
        function validateData() {
            for (let i = 0; i < data.length; i++) {
                const item = data[i]?.key;
                if (!userData?.[item] || userData?.[item]?.length === 0) {
                    showToast(`Please enter ${data[i]?.label}`);
                    return true; // Break out of the loop and return false
                }
            }
            return false;
        }

        return validateData();
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                {index !== 5 ? <View style={{ borderBottomWidth: 2, borderColor: Colors.BACKGROUNDGRAY }}>
                    <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index === 0 ? navigation.goBack() : setIndex(index === 1 ? 0 : index === 2 ? 1 : index === 3 ? 2 : index === 4 ? 3 : 0)} />

                </View> : null}

                {index !== 5 ? <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs30} >Update your profile to help our associates serve you better.</TextComponent> : null}
                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: Matrics.vs30 }}>
                    {
                        new Array(5).fill(0).map((item, i) => {
                            return (
                                <View style={{ height: Matrics.ms10, borderWidth: Matrics.ms1, width: Matrics.ms10, borderRadius: Matrics.ms5, marginHorizontal: Matrics.hs3, backgroundColor: index >= i ? Colors.RED : Colors.WHITE, borderColor: Colors.RED }}></View>

                            )
                        })
                    }
                    {/* <View style={{ height: Matrics.ms10, borderWidth: Matrics.ms1, width: Matrics.ms10, borderRadius: Matrics.ms5, marginHorizontal: Matrics.hs3, backgroundColor: index === 1 ? Colors.RED : Colors.WHITE, borderColor: Colors.RED }}></View> */}
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>

                        <View style={{ paddingHorizontal: Matrics.hs20, flex: 1 }}>
                            {index === 0 ? <View>
                                <View >
                                    <ImagePlaceHolderComponent padding={Matrics.hs20} marginVertical={Matrics.vs0} setImage={(image) => setUserData({ ...userData, profile_img: image, new: true })} image={userData?.profile_img ? userData?.profile_img?.uri || `${IMAGE_URL}${userData?.profile_img}` : ""} />
                                    <View style={{ marginTop: Matrics.vs30 }}>
                                        <TextInputComponent placeholder={"Username"} onChangeText={(text) => setUserData({ ...userData, username: text })} value={userData?.username} />
                                    </View>
                                    <View>
                                        <TextInputComponent placeholder={"Age"} onChangeText={(text) => setUserData({ ...userData, age: text })} value={userData?.age?.toString()} keyboardType={"numeric"} />
                                    </View>
                                    <View>
                                    <DropdownComponent placeholder={"Gender"} backgroundColor={Colors.WHITE} borderWidth={1} items={gender} setValue={(value) => setUserData({ ...userData, gender: value })} value={userData?.gender} />

                                        {/* <TextInputComponent placeholder={"Gender"} onChangeText={(text) => setUserData({ ...userData, gender: text })} value={userData?.gender} /> */}
                                    </View>
                                </View>


                            </View> : index === 1 ?
                                <View style={{ marginBottom: Matrics.vs30 }}>
                                    <View>
                                        <Text style={styles.bodyTypeTextStyle}>Select your body type</Text>
                                    </View>
                                    <View style={{ flexDirection: "column" }}>
                                        <View style={{ flexDirection: "row", marginVertical: Matrics.vs15, justifyContent: "space-between" }}>
                                            <View style={{ flex: 0.33, marginHorizontal: Matrics.hs10, justifyContent: "center" }}>
                                                <BoxComponent image={Images.hourglass} width={Matrics.hs75} height={Matrics.vs173} type={"hour-glass"} onPress={(type) => setUserData({ ...userData, body_type: type })} value={userData?.body_type} />

                                            </View>
                                            <View style={{ flex: 0.33, marginHorizontal: Matrics.hs10 }}>
                                                <BoxComponent image={Images.triangle} width={Matrics.hs75} height={Matrics.vs173} type={"triangle"} onPress={(type) => setUserData({ ...userData, body_type: type })} value={userData?.body_type} />

                                            </View>
                                            <View style={{ flex: 0.33, marginHorizontal: Matrics.hs10 }}>
                                                <BoxComponent image={Images.rectangle} width={Matrics.hs75} height={Matrics.vs173} type={"rectangle"} onPress={(type) => setUserData({ ...userData, body_type: type })} value={userData?.body_type} />

                                            </View>

                                        </View>
                                        <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                            <View style={{ flex: 0.25 }}></View>
                                            <View style={{ flex: 0.50, }}>
                                                <BoxComponent image={Images.invertedtriangle} width={Matrics.hs75} height={Matrics.vs173} type={"inverted triangle"} onPress={(type) => setUserData({ ...userData, body_type: type })} value={userData?.body_type} />

                                            </View>
                                            <View style={{ flex: 0.28, marginLeft: Matrics.hs10 }}>
                                                <BoxComponent image={Images.oval} width={Matrics.hs75} height={Matrics.vs173} type={"oval"} onPress={(type) => setUserData({ ...userData, body_type: type })} value={userData?.body_type} />

                                            </View>
                                            <View style={{ flex: 0.17 }}></View>

                                        </View>

                                    </View>


                                </View> : index === 2 ?
                                    <View style={{ marginVertical: Matrics.vs30 }}>
                                        <View>
                                            <Text style={styles.bodyTypeTextStyle}>Select your face type</Text>
                                        </View>
                                        <View style={{ flexDirection: "column" }}>
                                            <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                                <View style={{ flex: 0.33 }}>
                                                    <BoxComponent image={Images.round} width={(width - 70) / 3} height={Matrics.vs118} type={"round"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>
                                                <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                    <BoxComponent image={Images.triangleFace} width={(width - 70) / 3} height={Matrics.vs118} type={"triangle"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>
                                                <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                    <BoxComponent image={Images.square} width={(width - 70) / 3} height={Matrics.vs118} type={"square"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>

                                            </View>
                                            <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                                <View style={{ flex: 0.33 }}>
                                                    <BoxComponent image={Images.ovalFace} width={(width - 70) / 3} height={Matrics.vs118} type={"oval"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>
                                                <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                    <BoxComponent image={Images.diamond} width={(width - 70) / 3} height={Matrics.vs118} type={"daimond"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>
                                                <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                    <BoxComponent image={Images.oblong} width={(width - 70) / 3} height={Matrics.vs118} type={"oblong"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>

                                            </View>
                                            <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                                <View style={{ flex: 0.33 }}></View>

                                                <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                    <BoxComponent image={Images.heartShape} width={(width - 70) / 3} height={Matrics.vs118} type={"heart"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>
                                                <View style={{ flex: 0.33 }}></View>

                                            </View>

                                        </View>


                                    </View> : index === 3 ?
                                        <View style={{ marginBottom: Matrics.vs30 }}>
                                            <View>
                                                <Text style={styles.bodyTypeTextStyle}>Select your complexion</Text>
                                            </View>
                                            <View style={{ flexDirection: "column" }}>
                                                <View style={{ flexDirection: "row", marginVertical: Matrics.vs20 }}>
                                                    <View style={{ flex: 0.33 }}>
                                                        <BoxComponent color={Colors.LIGHTSKIN} width={(width - 70) / 3} height={Matrics.vs118} type={"light"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent color={Colors.FAIRSKIN} width={(width - 70) / 3} height={Matrics.vs118} type={"fair"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent color={Colors.MEDIUMSKIN} width={(width - 70) / 3} height={Matrics.vs118} type={"medium"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>

                                                </View>
                                                <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                                    <View style={{ flex: 0.33 }}>
                                                        <BoxComponent color={Colors.OLIVESKIN} width={(width - 70) / 3} height={Matrics.vs118} type={"olive"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent color={Colors.TANSKIN} width={(width - 70) / 3} height={Matrics.vs118} type={"tan"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent color={Colors.BROWNSKIN} width={(width - 70) / 3} height={Matrics.vs118} type={"brown"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>

                                                </View>
                                                <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>

                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent color={Colors.DARKBROWNSKIN} width={(width - 70) / 3} height={Matrics.vs118} type={"dark brown"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent color={Colors.BLACKSKIN} width={(width - 70) / 3} height={Matrics.vs118} type={"black"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33 }}></View>

                                                </View>

                                            </View>


                                        </View> : index === 4 ?
                                            <View style={{}}>
                                                <View>
                                                    <Text style={styles.bodyTypeTextStyle}>Select your hair length</Text>
                                                </View>
                                                <View style={{ flexDirection: "column" }}>
                                                    <View style={{ flexDirection: "row", marginVertical: Matrics.vs15, justifyContent: "space-between" }}>
                                                        <View style={{ flex: 0.33, marginHorizontal: Matrics.hs10 }}>
                                                            <BoxComponent image={Images.longhair} width={(width - 135) / 3} height={Matrics.vs110} type={"long"} onPress={(type) => setUserData({ ...userData, hair_length: type })} value={userData?.hair_length} />

                                                        </View>
                                                        <View style={{ flex: 0.33, marginHorizontal: Matrics.vs10, }}>
                                                            <BoxComponent image={Images.shorthair} width={(width - 135) / 3} height={Matrics.vs110} type={"short"} onPress={(type) => setUserData({ ...userData, hair_length: type })} value={userData?.hair_length} />

                                                        </View>
                                                        <View style={{ flex: 0.33, marginHorizontal: Matrics.vs10 }}>
                                                            <BoxComponent image={Images.mediumhair} width={(width - 135) / 3} height={Matrics.vs110} type={"medium"} onPress={(type) => setUserData({ ...userData, hair_length: type })} value={userData?.hair_length} />

                                                        </View>

                                                    </View>


                                                </View>
                                                <View style={{ marginVertical: Matrics.vs15 }}>
                                                    <View>
                                                        <Text style={styles.bodyTypeTextStyle}>Enter your height</Text>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: Matrics.vs10 }}>
                                                            <View style={{ flex: 0.48 }}>
                                                                <DropdownComponent backgroundColor={Colors.WHITE} borderWidth={1} items={hightFeet} setValue={(value) => setUserData({ ...userData, height: [value, userData?.height && userData?.height[1]] })} value={userData?.height && userData?.height[0]?.toString()} />

                                                            </View>
                                                            <View style={{ flex: 0.48 }}>
                                                                <DropdownComponent backgroundColor={Colors.WHITE} borderWidth={1} items={hightInch} setValue={(value) => setUserData({ ...userData, height: [userData?.height && userData?.height[0], value] })} value={userData?.height && userData?.height[1]?.toString()} />

                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>
                                                <View style={{ marginVertical: Matrics.vs15 }}>
                                                    <View>
                                                        <Text style={styles.bodyTypeTextStyle}>Select your bust size</Text>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: Matrics.vs10 }}>
                                                            <View style={{ flex: 0.48 }}>
                                                                <DropdownComponent backgroundColor={Colors.WHITE} borderWidth={1} items={bustSizeInches} setValue={(value) => setUserData({ ...userData, bust_size: [value, userData?.bust_size && userData?.bust_size[1]] })} value={userData?.bust_size && userData?.bust_size[0]?.toString()} />

                                                            </View>
                                                            <View style={{ flex: 0.48 }}>
                                                                <DropdownComponent backgroundColor={Colors.WHITE} borderWidth={1} items={bustSizeAlpha} setValue={(value) => setUserData({ ...userData, bust_size: [userData?.bust_size && userData?.bust_size[0], value] })} value={userData?.bust_size && userData?.bust_size[1]} />

                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>
                                                <View style={{ marginVertical: Matrics.vs15 }}>
                                                    <View>
                                                        <Text style={styles.bodyTypeTextStyle}>Select your waist size</Text>
                                                        <View style={{ marginTop: Matrics.vs10 }}>
                                                            <DropdownComponent backgroundColor={Colors.WHITE} borderWidth={1} items={waistSizes} setValue={(value) => setUserData({ ...userData, waist_size: value })} value={userData?.waist_size?.toString()} />

                                                        </View>
                                                    </View>

                                                </View>
                                                <View style={{ marginVertical: Matrics.vs15 }}>
                                                    <View>
                                                        <Text style={styles.bodyTypeTextStyle}>Select your hip size</Text>
                                                        <View style={{ marginTop: Matrics.vs10 }}>
                                                            <DropdownComponent backgroundColor={Colors.WHITE} borderWidth={1} items={hipSizes} setValue={(value) => setUserData({ ...userData, hip_size: value })} value={userData?.hip_size?.toString()} />

                                                        </View>
                                                    </View>

                                                </View>


                                            </View> : null

                            }

                            {
                                index === 5 ?
                                    <View>
                                        <View style={styles.mainView}>
                                            <Image source={Images.close} style={{ width: Matrics.ms26, height: Matrics.ms26 }} />
                                        </View >
                                        <View >
                                            <TextComponent fontFamily={getRobotoFont("Medium")} size={Matrics.ms36} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>Welcome Username</TextComponent>
                                            <TextComponent fontFamily={getRobotoFont("Medium")} size={Matrics.ms23} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>Let's get you ready!</TextComponent>
                                        </View>
                                        <View>
                                            <ImagePlaceHolderComponent setImage={(image) => setUserData({ ...userData, profile_img: image })} image={userData?.profile_img ? userData?.profile_img?.uri || `${IMAGE_URL}${userData?.profile_img?.uri || userData?.profile_img}` : ""} />
                                            <View style={{ flexDirection: "row", paddingHorizontal: Matrics.hs50 }}>
                                                <FlatList
                                                    data={userData}
                                                    numColumns={2}
                                                    horizontal={false}
                                                    renderItem={({ item }) => {
                                                        return (
                                                            <View style={{ marginHorizontal: Matrics.hs10, marginVertical: Matrics.vs5, justifyContent: "center", alignItems: "center", width: "48%" }}>

                                                                <TextComponent fontFamily={getRobotoFont("")} size={Matrics.ms16} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>{item?.label}</TextComponent>
                                                                <TextComponent fontFamily={getRobotoFont("")} size={Matrics.ms16} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>{userData[item?.key]}</TextComponent>
                                                            </View>
                                                        )
                                                    }}

                                                />
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
                                    </View> : null
                            }
                        </View>
                    </View>
                </ScrollView>
                <View style={{ marginHorizontal: Matrics.hs20, paddingVertical: Matrics.vs15 }}>
                    {index === 0 ? <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <CommonButton viewStyle={{ width: "50%" }} text="Next" onPress={() => {
                            return checkError([
                                {"label":"profile image",key:"profile_img"},
                                {"label":"username",key:"username"},
                                {"label":"age",key:"age"},
                                {"label":"gender",key:"gender"},
                            ]) ? {} : setIndex(1)
                        }} />
                    </View> : index === 1 ?
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flex: 0.47 }}>
                                <CommonButton text="Back" onPress={() => setIndex(0)} />
                            </View>
                            <View style={{ flex: 0.47 }}>
                                <CommonButton text="Next" viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} onPress={() => checkError([
                                    {label:"body type",key:"body_type"}]) ? {} : setIndex(2)} />
                            </View>
                        </View> : index === 2 ?
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ flex: 0.47 }}>

                                    <CommonButton text="Back" onPress={() => setIndex(1)} />
                                </View>
                                <View style={{ flex: 0.47 }}>
                                    <CommonButton text="Next" viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} onPress={() => checkError([
                                         {label:"face type",key:"face_type"}]) ? {} : setIndex(3)} />
                                </View>

                            </View> : index === 3 ? <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ flex: 0.47 }}>
                                    <CommonButton text="Back" onPress={() => setIndex(2)} />
                                </View>
                                <View style={{ flex: 0.47 }}>
                                    <CommonButton text="Next" viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} onPress={() => checkError([
                                        {label:"complexion",key:"complexion"}]) ? {} : setIndex(4)} />
                                </View>

                            </View> : index === 4 ? <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ flex: 0.47 }}>
                                    <CommonButton text="Back" onPress={() => setIndex(3)} />
                                </View>
                                <View style={{ flex: 0.47 }}>
                                    <CommonButton text="Next"  disabled={loader} viewStyle={{ backgroundColor: Colors.BLUE,opacity:loader?0.7:1 }} textStyle={{ color: Colors.WHITE }} onPress={() => checkError([
                                        {lable:"hair_length",key:"hair_length"},
                                        {lable:"height",key:"height"},
                                        {lable:"bust_size",key:"bust_size"},
                                        {lable:"waist_size",key:"waist_size"},
                                        {lable:"hip_size",key:"hip_size"},
                                    ]) ? {} :

                                        onProfileUpdate()} />
                                </View>

                            </View> : index === 5 ?
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <CommonButton text="Edit Profile" />
                                </View> : null


                    }
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    bodyTypeTextStyle: { fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms18, color: Colors.LIGHTBLACK },
    mainView: { height: Matrics.vs50, justifyContent: "center", alignItems: "flex-end", marginRight: Matrics.vs20 }

})