import React, { useContext, useState } from 'react'
import { Alert, FlatList, Image, KeyboardAvoidingView, Linking, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import CommonButton from '../../core-component/molecules/CommonButton'
import { Colors, Images, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont, showToast } from '../../core-utils/utils'
import { useNavigation } from '@react-navigation/native'
import TextComponent from '../../core-component/atom/TextComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BookingContext from '../../context/BookingContext'
import UserParamContext from '../../context/setUserContext'
import { AirbnbRating } from 'react-native-ratings'
import axios from 'axios'
import { API_URL } from '../../../config'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import moment from 'moment'

const ShareFeedback = () => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();
    const [rating, setRating] = useState(0)
    const [ratingDesigner, setRatingDesigner] = useState(0)
    const [comment, setComment] = useState()
    const [commentDesigner, setCommentDesigner] = useState()

    const { booking } = useContext(BookingContext)
    console.log("🚀 ~ file: shareFeedback.jsx:25 ~ ShareFeedback ~ booking:", booking)
    const { user } = useContext(UserParamContext)
    const addRating = async (rating) => {
        setRating(rating)
    }

    const submitRating = async () => {
        if(!user?.role){
            await axios.post(`${API_URL}review/add_review`, {
                "loginUserId": booking?.userId,
                "designerId": booking?.designerId,
                "rating": ratingDesigner,
                "desc": commentDesigner
            }).then(({ data }) => {
                console.log("🚀 ~ file: MyBooking.jsx:106 ~ submitRating ~ data:", data)
                if (data?.status === 200) {
                    navigation.goBack()
                    setCommentDesigner("")
                    setRatingDesigner(0)
                } else {
                    showToast(data?.message || data?.err)
                }
            }).catch(err => {
                showToast(err?.message || err)
    
            })

        }
        await axios.post(`${API_URL}review/add_review`, {
            "loginUserId": booking?.userId,
            "designerId": booking?.designerId,
            "rating": rating,
            "desc": comment,
            "admin":true
        }).then(({ data }) => {
            console.log("🚀 ~ file: MyBooking.jsx:106 ~ submitRating ~ data:", data)
            if (data?.status === 200) {
                navigation.goBack()
                setComment("")
                setRating(0)
            } else {
                showToast(data?.message || data?.err)
            }
        }).catch(err => {
            showToast(err?.message || err)

        })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: Matrics.ms55, marginRight: Matrics.vs20 }}>
                        <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{"Share Feedback"}</TextComponent>

                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={Images.close} style={{ width: Matrics.ms18, height: Matrics.ms18 }} />
                        </Pressable>
                    </View>
                    {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, marginTop: Matrics.vs10, marginHorizontal: Matrics.hs20 }}>
                        <View>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs20} numberOfLines={5} paddingHorizontal={Matrics.hs0}>{"Please share your feedback on this consultation. Your feedback is valuable to us and will help us improve our services."}</TextComponent>

                        </View>
                        <View style={{ backgroundColor: Colors.BACKGROUNDGRAY, padding: Matrics.vs20, marginVertical: Matrics.vs15 }}>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs5} paddingHorizontal={Matrics.vs0}>{"Booking ID:"}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont()} size={Matrics.ms18} color={Colors.BLUE} marginTop={Matrics.vs5} paddingHorizontal={Matrics.vs0}>{`#${booking?._id?.slice(-6)}`}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Appointment with:"}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{user?.role ? booking?.user_name || "" : booking?.designer_name || ""}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Slot:"}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{booking?.date ? moment(booking?.date).format("dddd , Do MMMM") : ""}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{booking?.time || "0:00"}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Paid:"}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`INR 300/30 min session`}</TextComponent>
                        </View>
                        <View>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs20} numberOfLines={5} paddingHorizontal={Matrics.hs0}>{"Rate your overall experience with the platform"}</TextComponent>
                            <View style={{ alignItems: "flex-start", width: "100%" }}>
                                <AirbnbRating count={5} defaultRating={rating} size={25} selectedColor={Colors.MEDIUMRED} showRating={false} // isDisabled={true}
                                    onFinishRating={rate => addRating(rate)} starContainerStyle={{
                                        paddingTop: Matrics.vs10,
                                        marginBottom: Matrics.vs20
                                    }} />
                                <View style={{ width: "100%" }}>
                                    <TextInputComponent placeholder={"Add your comments"} onChangeText={text => setComment(text)} value={comment} height={Matrics.ms100} multiline />

                                </View>

                            </View>
                        </View>
                        {!user?.role ? <View>
                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs20} numberOfLines={5} paddingHorizontal={Matrics.hs0}>{"Rate your experience with our StyleCrew associate"}</TextComponent>
                            <View style={{ alignItems: "flex-start", width: "100%" }}>
                                <AirbnbRating count={5} defaultRating={ratingDesigner} size={25} selectedColor={Colors.MEDIUMRED} showRating={false} // isDisabled={true}
                                    onFinishRating={rate => setRatingDesigner(rate)} starContainerStyle={{
                                        paddingTop: Matrics.vs10,
                                        marginBottom: Matrics.vs20
                                    }} />
                                <View style={{ width: "100%" }}>
                                    <TextInputComponent placeholder={"Add your comments"} onChangeText={text => setCommentDesigner(text)} value={commentDesigner} height={Matrics.ms100} multiline />

                                </View>

                            </View>
                        </View> :null}
                    </View>
                </ScrollView>
                <View style={{ alignItems: "center", paddingBottom: insets?.bottom ? 0 : Matrics.ms20 }}>
                    <View style={{ marginHorizontal: Matrics.hs20 }}>
                        <CommonButton text={"Submit Feedback"} onPress={() => submitRating()} viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} />

                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ShareFeedback

const styles = StyleSheet.create({})