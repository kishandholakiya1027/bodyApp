import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { Colors, Images, Matrics } from '../../theme'
import { API_URL, IMAGE_URL } from '../../../config'
import ImagePlaceHolderComponent from '../atom/imagePlaceHolderComponent'
import TextComponent from '../atom/TextComponent'
import { getRubikFont } from '../../core-utils/utils'
import { AirbnbRating, Rating } from 'react-native-ratings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import UserParamContext from '../../context/setUserContext'
import Loader from '../atom/Loader'
import BookingContext from '../../context/BookingContext';

const UsedataComponent = ({ userId, slice, search, filter, userFilter, setSubmitFilter, sort }) => {
    const [loginUser, setLoginUser] = useState()
    const [likedUser, setLikedUsers] = useState([])
    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [loader, setLoader] = useState(false)
    const navigation = useNavigation()
    const { user } = useContext(UserParamContext)
    console.log("🚀 ~ file: UsedataComponent.jsx:24 ~ UsedataComponent ~ user:", user)
    const { setBooking } = useContext(BookingContext)

    useEffect(() => {
        setLoader(true)
        if (search)
            setTimeout(async () => {
                await axios.get(`${API_URL}designer/get_designer_search/${search}`).then(({ data }) => {
                    console.log("🚀 ~ file: index.jsx:66 ~ awaitaxios.get ~ data:", data)
                    if (data?.status === 200) {
                        setUsers(data?.data)

                    } else {
                        Alert.alert("something went wrong")
                    }
                    setLoader(false)

                }).catch(err => {
                    setLoader(false)


                })
            }, 2000);
        else {
            setUsers(sort !== 0 || !sort || !filter || !search ? allUsers : users)
            console.log("🚀 ~ file: UsedataComponent.jsx:49 ~ useEffect ~ users:", users)
            setLoader(false)

        }
    }, [search])

    useEffect(() => {
        setLoader(true)
        if (filter)
            setTimeout(async () => {
                console.log("🚀 ~ file: UsedataComponent.jsx:54 ~ useEffect ~ filter:", filter)
                await axios.get(`${API_URL}designer/get_designer_assist/${filter}`).then(({ data }) => {
                    console.log("🚀 ~ file: index.jsx:66 ~ awaitaxios.get ~ data:", data)
                    if (data?.status === 200) {
                        setUsers(data?.data)

                    } else {
                        Alert.alert("something went wrong")
                    }
                    setLoader(false)

                }).catch(err => {
                    setLoader(false)


                })
            }, 2000);
        else {
            setUsers(sort !== 0 || !sort || !filter || !search ? allUsers : users)
            console.log("🚀 ~ file: UsedataComponent.jsx:77 ~ useEffect ~ users:", users)
            setLoader(false)

        }
    }, [filter])

    useEffect(() => {
        onFilter()
    }, [userFilter])

    useEffect(() => {
        onSort()
    }, [sort])

    const onFilter = async () => {
        setLoader(true)
        setSubmitFilter(false)
        if (userFilter) {
            let filter = { ...userFilter }
            if (filter?.consultationCharge) {
                filter.consultationCharge = [filter.consultationCharge?.from, filter.consultationCharge?.to]
            }
            await axios.post(`${API_URL}designer/get_designer_filter`, filter, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(({ data }) => {
                console.log("🚀 ~ file: UsedataComponent.jsx:104 ~ onFilter ~ data:", data)
                if (data?.status === 200) {
                    setUsers(data?.data)

                } else {
                    Alert.alert("something went wrong")
                }
                setLoader(false)

            }).catch(err => {
                setLoader(false)


            })
        }
        else {
            setUsers(sort !== 0 || !sort || !filter || !search ? allUsers : users)
            console.log("🚀 ~ file: UsedataComponent.jsx:119 ~ onFilter ~ users:", users)
            setLoader(false)

        }
    }
    const onSort = async () => {
        setLoader(true)
        if (sort === 0 || sort) {

            await axios.get(`${API_URL}designer/get_designer_sort/${sort}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((data) => {
                console.log("🚀 ~ file: UsedataComponent.jsx:130 ~ onSort ~ data:", data)
                if (data?.status === 200) {
                    setUsers(data?.data)

                } else {
                    Alert.alert("something went wrong")
                }
                setLoader(false)

            }).catch(err => {
                console.log("🚀 ~ file: UsedataComponent.jsx:140 ~ onSort ~ err:", err)
                setLoader(false)


            })
        }
        else {
            setUsers(allUsers)
            console.log("🚀 ~ file: UsedataComponent.jsx:149 ~ onSort ~ allUsers:", allUsers)
            setLoader(false)

        }
    }

    useFocusEffect(useCallback(
        () => {
            getData()

        },
        [],
    )
    )
    const getData = async () => {
        const user = JSON.parse(await AsyncStorage.getItem("user"))
        if (user)
            setLoginUser(user)
        if (sort !== 0 && !sort && !filter && !search)
            getUser()
        await axios.get(`${API_URL}like/get_like_login_user/${user?.id}`).then(({ data }) => {
            setLikedUsers(data?.likes?.map(user => user?.designerId))
        }).catch(err => {


        })

    }
    const getUser = async () => {
        setLoader(true)

        await axios.get(`${API_URL}designer/get_designer_rating`).then(({ data }) => {
            setLoader(false)
            console.log("🚀 ~ file: UsedataComponent.jsx:185 ~ awaitaxios.get ~ data:", data)
            setUsers(data?.data)
            setAllUsers(data?.data)
        }).catch(err => {
            setLoader(false)


        })
    }

    const addLike = async (id, userId) => {
        let body = {
            "designerId": id,
            "loginUserId": user?.id
        }
        console.log("🚀 ~ file: UsedataComponent.jsx:90 ~ addLike ~ body:", body)
        await axios.post(`${API_URL}like/add_like`, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data }) => {
            console.log("🚀 ~ file: UsedataComponent.jsx:99 ~ addLike ~ data:", data)
            if (data?.status === 200) {
                setLikedUsers([...likedUser || [], id])
                Alert.alert("User liked ")


            }
        }).catch(err => {
            console.log("🚀 ~ file: UsedataComponent.jsx:107 ~ addLike ~ err:", err)


        })
    }
    const addRating = async (rating, id, userId) => {
        let body = {
            "designerId": id,
            "loginUserId": user?.id,
            rating,
            desc: "rate"
        }
        await axios.post(`${API_URL}review/add_review`, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data }) => {
            getUser()
        }).catch(err => {


        })
    }
    const removeRating = async (rating, id, userId) => {
        let body = {
            "designerId": id,
            "loginUserId": user?.id,
            rating,
            desc: "rate"
        }
        await axios.post(`${API_URL}review/remove_review`, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data }) => {
            getUser()
        }).catch(err => {


        })
    }
    const removeLike = async (id, userId) => {

        let body = {
            "designerId": id,
            "loginUserId": user?.id
        }
        await axios.post(`${API_URL}like/remove_like`, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data }) => {
            if (data?.status === 200) {
                Alert.alert("Removed liked ")
                setLikedUsers([...likedUser?.filter(user => user !== id)])

            }
        }).catch(err => {


        })
    }

    return (
        <>
            <View style={{ flex: 1, }}>
                {loader ? <Loader /> :
                    <FlatList
                        // data={[]}
                        contentContainerStyle={{ flexGrow: 1, height: "auto" }}
                        data={users.filter(user => user?._id !== userId)?.slice(0, slice)}
                        keyExtractor={(item) => item?._id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                userId !== item?._id ? <View style={{ marginTop: Matrics.vs10, paddingBottom: Matrics.vs20, flex: 1 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 0.48, alignItems: "center", marginRight: Matrics.hs10 }}>
                                            <ImagePlaceHolderComponent size={Matrics.ms150} borderRadius={Matrics.ms75} padding={Matrics.hs10} marginVertical={Matrics.vs10} image={item?.profile_img ? `${IMAGE_URL}${item?.profile_img}` : ""} borderColor={Colors.MEDIUMREDOPACITY} backgroundColor={item?.profile_img ? "none" : Colors.MEDIUMREDOPACITY} disabled={true} />
                                            <View style={{ position: "absolute", top: 5, left: -2 }}>
                                                <Pressable style={{ padding: 5, zIndex: 99999 }} hitSlop={60} onPress={() => likedUser?.includes(item?._id) ? removeLike(item?._id, userId) : addLike(item?._id, userId)}>
                                                    <Image source={Images.heart} width={Matrics.ms15} height={Matrics.ms15} style={{ width: Matrics.ms15, height: Matrics.ms15, tintColor: likedUser?.includes(item?._id) ? Colors.MEDIUMRED : Colors.MEDIUMREDOPACITY }} />
                                                    {/* <Rating
                                                type='heart'
                                                ratingCount={1}
                                                imageSize={15}
                                                showRating={false}
                                                jumpValue={1}
                                                minValue={0}
                                                style={{ zIndex: 1 }}
                                                startingValue={likedUser?.includes(item?._id) ? 1 : 0}
    
                                            /> */}

                                                </Pressable>

                                            </View>

                                        </View>
                                        <View style={{ flex: 0.53, }}>
                                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms20} color={Colors.BLUE} marginTop={Matrics.vs15}>{item?.username}</TextComponent>
                                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs5}>{item?.profession}</TextComponent>
                                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs5}>{`${item?.yearExperience || 0} Years of Experience`}</TextComponent>
                                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", flexWrap: "wrap", marginTop: Matrics.vs10 }}>
                                                <AirbnbRating
                                                    count={4}
                                                    defaultRating={item?.reviewCount}
                                                    size={14}
                                                    selectedColor={Colors.MEDIUMRED}
                                                    showRating={false}
                                                    // isDisabled={true}
                                                    onFinishRating={(rate) => item?.reviewCount >= rate ? removeRating(rate, item?._id) : addRating(rate, item?._id)}
                                                    starContainerStyle={{ paddingTop: Matrics.vs0, marginHorizontal: Matrics.hs2 }}
                                                />

                                                <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms15} color={Colors.MEDIUMRED} marginTop={Matrics.vs10} textDecorationLine='underline'>{"(20) Reviews"}</TextComponent>

                                            </View>
                                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTGRAY} marginTop={Matrics.vs10}>{"Consultation fees: "}</TextComponent>
                                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{`INR ${item?.consultationCharge || 0}/30 min session`}</TextComponent>

                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 0.48, alignItems: "center", marginRight: Matrics.hs10 }}>

                                            <View style={{ marginTop: Matrics.vs10 }}>
                                                <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs10, width: "100%" }]} onPress={() => {
                                                    {
                                                        !user?.id ? Alert.alert("Please sign in to explore!",
                                                            '', [

                                                            { text: 'OK', onPress: () => navigation.navigate("LoginPage") },
                                                        ]) : null
                                                    }
                                                    user?.id ? navigation.navigate("LeaveMessage") : ""
                                                }}>
                                                    <Text style={styles.textStyle}>{"Leave a Message"}</Text>
                                                </Pressable>

                                            </View>
                                        </View>
                                        <View style={{ flex: 0.52, }}>
                                            <View style={{ marginTop: Matrics.vs10 }}>
                                                <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs5 }]} onPress={() => {
                                                    setBooking(item)
                                                    {
                                                        !user?.id ? Alert.alert("Please sign in to explore!",
                                                            '', [

                                                            { text: 'OK', onPress: () => navigation.navigate("LoginPage") },
                                                        ]) : null
                                                    }
                                                    user?.id ? navigation.navigate("SlotScreen") : ""
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
                    />}
            </View>
        </>
    )
}

export default UsedataComponent

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, textAlign: "center", width: "100%" },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs20, minheight: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
})