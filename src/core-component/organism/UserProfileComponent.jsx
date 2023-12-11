import { useContext, useEffect, useState } from "react"
import UserParamContext from "../../context/setUserContext"
import { useNavigation } from "@react-navigation/native"
import { API_URL, IMAGE_URL } from "../../../config"
import axios from "axios"
import { Alert, Image, Pressable, View } from "react-native"
import { Colors, Images, Matrics } from "../../theme"
import ImagePlaceHolderComponent from "../atom/imagePlaceHolderComponent"
import TextComponent from "../atom/TextComponent"
import { getRubikFont, showToast } from "../../core-utils/utils"
import { AirbnbRating } from "react-native-ratings"

export default function UserProfileComponent({ item, refetch }) {
    const { user } = useContext(UserParamContext)
    const [likedUser, setLikedUsers] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        if (user)
            getLikedUsers()
    }, [])

    const getLikedUsers = async () => {
        await axios.get(`${API_URL}like/get_like_login_user/${user?.id || user?._id}`).then(({ data }) => {
            if (data?.status === 200)
                setLikedUsers(data?.likes?.map(user => user?.designer?._id || user?.designerId))
        }).catch(err => {


        })

    }


    const addLike = async (id, userId) => {
        let body = {
            "designerId": id,
            "loginUserId": user?.id || user?._id
        }
        await axios.post(`${API_URL}like/add_like`, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data }) => {
            if (data?.status === 200) {
                setLikedUsers([...likedUser || [], id])
                showToast("Profile saved")


            }
        }).catch(err => {
            console.log("🚀 ~ file: UsedataComponent.jsx:107 ~ addLike ~ err:", err)


        })
    }
    const removeLike = async (id, userId) => {

        let body = {
            "designerId": id,
            "loginUserId": user?.id || user?._id
        }
        await axios.post(`${API_URL}like/remove_like`, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data }) => {
            if (data?.status === 200) {
                showToast("Profile unsaved")
                setLikedUsers([...likedUser?.filter(user => user !== id)])
                refetch && refetch()

            }
        }).catch(err => {


        })
    }
    const addRating = async (rating, id, userId) => {
        let body = {
            "designerId": id,
            "loginUserId": user?.id || user?._id,
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
            "loginUserId": user?.id || user?._id,
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
    return (<Pressable style={{
        flexDirection: "row"
    }} onPress={() => navigation.navigate("ProfileDetails", {
        designerId: item?.designer?._id || item?.id || item?._id,
        likedUser: likedUser
    })}>
        <View style={{
            flex: 0.48,
            alignItems: "center",
            marginRight: Matrics.hs10
        }}>
            <ImagePlaceHolderComponent disabled={true} size={Matrics.ms150} borderRadius={Matrics.ms75} padding={Matrics.hs10} marginVertical={Matrics.vs10} image={(item?.designer?.profile_img|| item?.profile_img) ? `${IMAGE_URL}${item?.designer?.profile_img||item?.profile_img}` : ""} borderColor={Colors.MEDIUMREDOPACITY} backgroundColor={item?.profile_img ? "none" : Colors.MEDIUMREDOPACITY} disabled={true} />
            <View style={{
                position: "absolute",
                top: 5,
                left: -2
            }}>
                <Pressable style={{
                    padding: 5,
                    zIndex: 99999
                }} onPress={() => likedUser?.includes(item?.designer?._id || item?.id || item?._id) ? removeLike(item?.designer?._id || item?.id || item?._id) : addLike(item?.designer?._id || item?.id || item?._id)}>
                    <Image source={!likedUser?.includes(item?.designer?._id || item?.id || item?._id) ? Images.saveprofile : Images.heart} width={Matrics.ms15} height={Matrics.ms15} style={{
                        width: Matrics.ms15,
                        height: Matrics.ms15
                    }} />
                    {
                        /* <Rating
                        type='heart'
                        ratingCount={1}
                        imageSize={15}
                        showRating={false}
                        jumpValue={1}
                        minValue={0}
                        style={{ zIndex: 1 }}
                        startingValue={likedUser?.includes(item?._id) ? 1 : 0}
                        /> */
                    }

                </Pressable>

            </View>

        </View>
        <View style={{
            flex: 0.53
        }}>
            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms20} color={Colors.BLUE} marginTop={Matrics.vs15}>{item?.designer?.username || item?.username}</TextComponent>
            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs5}>{item?.designer?.profession || item?.profession}</TextComponent>
            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs5}>{`${item?.designer?.yearExperience || item?.yearExperience || 0} Years of Experience`}</TextComponent>
            <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: Matrics.vs10
            }}>
                <AirbnbRating count={4} defaultRating={item?.designer?.rating || item?.reviewCount} size={14} selectedColor={Colors.MEDIUMRED} showRating={false} // isDisabled={true}
                    onFinishRating={rate => item?.designer?.rating || item?.reviewCount >= rate ? removeRating(rate, item?._id) : addRating(rate, item?._id)} starContainerStyle={{
                        paddingTop: Matrics.vs0,
                        marginHorizontal: Matrics.hs2
                    }} />

                <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms15} color={Colors.MEDIUMRED} marginTop={Matrics.vs10} textDecorationLine='underline'>{`(${item?.designer?.reviewCount ||item?.reviewCount||0}) Reviews`}</TextComponent>

            </View>
            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTGRAY} marginTop={Matrics.vs10}>{"Consultation fees: "}</TextComponent>
            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{`INR ${item?.designer?.consultationCharge || item?.consultationCharge || 0}/30 min session`}</TextComponent>

        </View>
    </Pressable>);
}