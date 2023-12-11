import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { Colors, Images, Matrics } from '../../theme'
import { API_URL, IMAGE_URL } from '../../../config'
import ImagePlaceHolderComponent from '../atom/imagePlaceHolderComponent'
import TextComponent from '../atom/TextComponent'
import { IS_ANDROID, getRubikFont, showToast } from '../../core-utils/utils'
import { AirbnbRating, Rating } from 'react-native-ratings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import UserParamContext from '../../context/setUserContext'
import Loader from '../atom/Loader'
import BookingContext from '../../context/BookingContext';
import UserProfileComponent from './UserProfileComponent'





const UsedataComponent = ({ userId, slice, search, filter, userFilter, setSubmitFilter = () => { }, sort, setCount = () => { }, homeFilter }) => {
    console.log("🚀 ~ file: UsedataComponent.jsx:22 ~ UsedataComponent ~ userFilter:", userFilter)
    const [loginUser, setLoginUser] = useState()
    const [likedUser, setLikedUsers] = useState([])
    const [users, setUsers] = useState([])
    console.log("🚀 ~ file: UsedataComponent.jsx:26 ~ UsedataComponent ~ users:", users)
    const [allUsers, setAllUsers] = useState([])
    const [loader, setLoader] = useState(false)
    const navigation = useNavigation()
    const { user } = useContext(UserParamContext)
    const { setBooking } = useContext(BookingContext)


    useFocusEffect(useCallback(
        () => {

            getData()

        },
        [],
    )
    )

    useEffect(() => {
        console.log("🚀 ~ file: UsedataComponent.jsx:46 ~ useEffect ~ userFilter:", userFilter,userFilter != "null")
        if (userFilter != "null" && userFilter)
            onFilter()
        else {
            console.log("🚀 ~ file: UsedataComponent.jsx:28 ~ UsedataComponent ~ allUsers:", allUsers)
            !homeFilter ? allUsers?.length ? setUsers(allUsers) : null : null
        }
    }, [userFilter?.length])



    
    useEffect(() => {
        if (users?.length)
            setCount(users?.length)
    }, [users])



    const onFilter = async () => {
        setLoader(true)
        setSubmitFilter(false)
        let filter = { ...userFilter }
        if (filter?.consultationCharge) {
            filter.consultationCharge = [filter.consultationCharge?.from, filter.consultationCharge?.to]
        }
        await axios.post(`${API_URL}designer/get_designer_filter`, filter, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(({ data }) => {
            if (data?.status === 200) {
                setUsers(data?.data)

            } else {
                showToast("something went wrong")

            }
            setTimeout(() => {

                setLoader(false)
            }, 1000);

        }).catch(err => {
            setLoader(false)


        })

    }



    const getData = async () => {
        if (!homeFilter || !userFilter )
            getUser()
        const user = JSON.parse(await AsyncStorage.getItem("user"))
        if (user)
            setLoginUser(user)
        await axios.get(`${API_URL}like/get_like_login_user/${user?.id||user?._id}`).then(({ data }) => {
            setLikedUsers(data?.likes?.map(user => user?.designerId))
        }).catch(err => {


        })

    }
    const getUser = async () => {
        setLoader(true)

        await axios.get(`${API_URL}designer/get_designer_rating`).then(({ data }) => {
            !homeFilter ? setUsers(data?.data) : null
            console.log("🚀 ~ file: UsedataComponent.jsx:113 ~ awaitaxios.get ~ data:", data)
            setLoader(false)
            setTimeout(() => {

            }, 300);
            setAllUsers(data?.data)
        }).catch(err => {
            console.log("🚀 ~ file: UsedataComponent.jsx:115 ~ awaitaxios.get ~ err:", err)
            setLoader(false)


        })
    }


    let data = users.filter(usr => (usr?._id !== (user?._id || user?.id)))?.slice(0, slice)
    console.log("🚀 ~ file: UsedataComponent.jsx:123 ~ UsedataComponent ~ data:", data)

    return (
        <>
            <View style={{ flex: 1, }}>
                {loader ? <Loader /> : <>
                    {/* <FlatList
                        // data={[]}
                        contentContainerStyle={{ flexGrow: 1, height: "auto" }}
                        data={users.filter(user => user?._id !== userId)?.slice(0, slice)}
                        keyExtractor={(item) => item?._id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                userId !== item?._id ? <View style={{ marginTop: Matrics.vs10, paddingBottom: Matrics.vs20, flex: 1 }}>
                                    <UserProfileComponent item={item} userId={userId} />
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 0.48, alignItems: "center", marginRight: Matrics.hs10 }}>

                                            <View style={{ marginTop: Matrics.vs10 }}>
                                                <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs3, width: "100%" }]} onPress={() => {
                                                    {
                                                        !(user?.id ||user?._id) ? Alert.alert("Please sign in to explore!",
                                                            '', [

                                                            { text: 'OK', onPress: () => navigation.navigate("LoginPage") },
                                                        ]) : null
                                                    }
                                                    (user?.id ||user?._id) ? navigation.navigate("LeaveMessage", { item }) : ""
                                                }}>
                                                    <Text style={styles.textStyle}>{"Leave a Message"}</Text>
                                                </Pressable>

                                            </View>
                                        </View>
                                        <View style={{ flex: 0.52, }}>
                                            <View style={{ marginTop: Matrics.vs10 }}>
                                                <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs3 }]} onPress={() => {
                                                    setBooking(item)
                                                    {
                                                        !(user?.id ||user?._id) ? Alert.alert("Please sign in to explore!",
                                                            '', [

                                                            { text: 'OK', onPress: () => navigation.navigate("LoginPage") },
                                                        ]) : null
                                                    }
                                                    (user?.id ||user?._id) ? navigation.navigate("SlotScreen") : ""
                                                }}>
                                                    <Text style={styles.textStyle}>{"Book Consultation"}</Text>
                                                </Pressable>

                                            </View>

                                        </View>
                                    </View>

                                </View> : null

                            )
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms18, color: Colors.DARKGRAY }}>No users.</Text>
                                </View>
                            )
                        }}
                    />} */}
                    {data?.length ? data?.map(item => {
                        return (
                            <View style={{ marginTop: Matrics.vs10, paddingBottom: Matrics.vs20, flex: 1 }}>
                                <UserProfileComponent item={item} userId={userId} />
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 0.48, alignItems: "center", marginRight: Matrics.hs10 }}>

                                        <View style={{ marginTop: Matrics.vs10 }}>
                                            <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs3, width: "100%" }]} onPress={() => {

                                                !(user?.id || user?._id) ? showToast("Please sign in to explore!",) : navigation.navigate("LeaveMessage", { item })

                                            }}>
                                                <Text style={styles.textStyle}>{"Leave a Message"}</Text>
                                            </Pressable>

                                        </View>
                                    </View>
                                    <View style={{ flex: 0.52, }}>
                                        <View style={{ marginTop: Matrics.vs10 }}>
                                            <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs3 }]} onPress={() => {
                                                setBooking(item)
                                                !(user?.id || user?._id) ? showToast("Please sign in to explore!",) : navigation.navigate("SlotScreen")
                                            }}>
                                                <Text style={styles.textStyle}>{"Book Consultation"}</Text>
                                            </Pressable>

                                        </View>

                                    </View>
                                </View>

                            </View>

                        )
                    }) : !loader ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms18, color: Colors.DARKGRAY }}>No users.</Text>
                    </View> : null}
                </>}
            </View>
        </>
    )
}

export default UsedataComponent

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: IS_ANDROID ? Matrics.ms16 : Matrics.ms17, textAlign: "center", width: "100%" },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs20, minHeight: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
})