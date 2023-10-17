import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Colors, Images, Matrics } from '../../theme'
import { API_URL, IMAGE_URL } from '../../../config'
import ImagePlaceHolderComponent from '../atom/imagePlaceHolderComponent'
import TextComponent from '../atom/TextComponent'
import { getRubikFont } from '../../core-utils/utils'
import { AirbnbRating, Rating } from 'react-native-ratings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import UserParamContext from '../../context/setUserContext'
import Loader from '../atom/Loader'

const UsedataComponent = ({ userId, slice, search }) => {
    const [loginUser, setLoginUser] = useState()
    const [likedUser, setLikedUsers] = useState([])
    const [users, setUsers] = useState([])
    console.log("🚀 ~ file: UsedataComponent.jsx:19 ~ UsedataComponent ~ users:", users)
    const [allUsers, setAllUsers] = useState([])
    const [loader, setLoader] = useState(false)

    const { user } = useContext(UserParamContext)

    useEffect(() => {
        setLoader(true)
        if (search)
            setTimeout(async () => {
                await axios.get(`${API_URL}user/get_user_search/${search}`).then(({ data }) => {
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
            setUsers(allUsers)
            setLoader(false)

        }
    }, [search])

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
        getUser()
        await axios.get(`${API_URL}like/get_like_login_user/${user?.id}`).then(({ data }) => {
            setLikedUsers(data?.likes?.map(user => user?.profileId))
        }).catch(err => {


        })

    }
    const getUser = async () => {
        setLoader(true)

        await axios.get(`${API_URL}user/get_user_rating`).then(({ data }) => {
            setLoader(false)

            setUsers(data?.data)
            setAllUsers(data?.data)
        }).catch(err => {
            setLoader(false)


        })
    }

    const addLike = async (id, userId) => {
        let body = {
            "profileId": id,
            "loginUserId": user?.id
        }
        await axios.post(`${API_URL}like/add_like`, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data }) => {
            if (data?.status === 200) {
                setLikedUsers([...likedUser, id])
                Alert.alert("User liked ")


            }
        }).catch(err => {


        })
    }
    const addRating = async (rating, id, userId) => {
        let body = {
            "profileId": id,
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
            "profileId": id,
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
            "profileId": id,
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
        <View style={{ flex: 1, height: "auto" }}>
            {loader ? <Loader /> :
                <FlatList
                    // data={[]}
                    contentContainerStyle={{ flexGrow: 1, height: "auto" }}
                    data={users.slice(0, slice)}
                    keyExtractor={(item) => item?._id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            userId !== item?._id ? <View style={{ marginTop: Matrics.vs10, paddingBottom: Matrics.vs20, flex: 1 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 0.48, alignItems: "center", marginRight: Matrics.hs10 }}>
                                        <ImagePlaceHolderComponent size={Matrics.ms160} borderRadius={Matrics.ms80} padding={Matrics.hs10} marginVertical={Matrics.vs10} image={item?.profile_img ? `${IMAGE_URL}${item?.profile_img}` : ""} borderColor={Colors.MEDIUMREDOPACITY} backgroundColor={item?.profile_img ? "none" : Colors.MEDIUMREDOPACITY} disabled={true} />
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
                                            <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs10 }]} onPress={() => { }}>
                                                <Text style={styles.textStyle}>{"View Portfolio"}</Text>
                                            </Pressable>

                                        </View>
                                    </View>
                                    <View style={{ flex: 0.52, }}>
                                        <View style={{ marginTop: Matrics.vs10 }}>
                                            <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs5 }]} onPress={() => { }}>
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
    )
}

export default UsedataComponent

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs20, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
})