import { FlatList, Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Images, Matrics, height } from '../../theme';
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils';
import Header from '../../core-component/atom/header';
import TextComponent from '../../core-component/atom/TextComponent';
import BookingContext from '../../context/BookingContext';
import moment from 'moment';
import CommonButton from '../../core-component/molecules/CommonButton';
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent';
import CustomModalComponent from '../../core-component/organism/customModalComponent';
import RequirementComponent from '../../core-component/organism/RequirementComponent';

const MyBooking = () => {
    const insets = useSafeAreaInsets();
    const [status, setStatus] = useState("Upcoming")
    const [visible, setVisible] = useState(false)
    const [image, setImage] = useState(["s"])
    const navigation = useNavigation()
    const [requirementData, setRequirementData] = useState({})

    const { booking } = useContext(BookingContext)
    const statusArray = [
        { label: "Upcoming", value: "Upcoming" },
        { label: "Previous", value: "Previous" },
        { label: "Cancelled", value: "Cancelled" },
    ]
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
                        <Header text={"My Bookings"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.goBack()} />

                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>

                            <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", paddingVertical: Matrics.vs20, justifyContent: "flex-start", marginTop: Matrics.vs10, marginLeft: Matrics.hs20 }}>
                                {
                                    statusArray?.map((item, index) => {
                                        return (
                                            <Pressable onPress={() => setStatus(item?.value)} style={{ minWidth: Matrics.hs105, paddingHorizontal: Matrics.hs16, paddingVertical: Matrics.vs12, backgroundColor: status === item?.value ? Colors.MEDIUMREDOPACITY : Colors.BACKGROUNDGRAY, marginRight: Matrics.vs10, marginVertical: Matrics.vs7, borderRadius: Matrics.ms25, justifyContent: "center" }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={status === item?.value ? Colors.MEDIUMRED : Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>{item?.label}</TextComponent>

                                            </Pressable>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                        <View style={{ marginHorizontal: Matrics.vs20, height: "83%" }}>
                            <FlatList
                                data={image}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ flexGrow: 1, }}

                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingBottom: Matrics.vs15, }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                <View style={{ flex: 0.60 }}>
                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs5} paddingHorizontal={Matrics.vs0}>{"Booking ID:"}</TextComponent>
                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont()} size={Matrics.ms18} color={Colors.BLUE} marginTop={Matrics.vs5} paddingHorizontal={Matrics.vs0}>{"#123456"}</TextComponent>

                                                </View>
                                                <View style={{ flex: 0.40, alignItems: "flex-end", justifyContent: "center", }}>
                                                    <View style={{ backgroundColor: Colors.LIMEGREEN, borderRadius: Matrics.ms20, alignItems: "center", justifyContent: "center", paddingVertical: Matrics.vs5, paddingHorizontal: Matrics.hs10 }}>
                                                        <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms14} color={Colors.WHITE} paddingHorizontal={Matrics.vs0}>{"Confirmed"}</TextComponent>

                                                    </View>

                                                </View>
                                            </View>
                                            <View>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Appointment with:"}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{booking?.username || "user"}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Slot:"}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{moment(booking?.day).format("dddd , Do MMMM")}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{booking?.time || "0:00"}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Paid:"}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`INR 300/30 min session`}</TextComponent>

                                                <View style={{ flexDirection: "row" }}>

                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Requirement Summary: "}</TextComponent>
                                                </View>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.vs0}>{`Purpose of Consultation: Wardrobe Refresh`}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`Preferred Look/Style: Western  `}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`Occasion: Business Events `}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`Brief: Need a weekly office wear collection from my wardrobe `}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`Budget: INR ${booking?.consultationCharge || 0}`}</TextComponent>
                                                {
                                                    status === "Upcoming" ?

                                                        <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{`Attachments:`}</TextComponent>
                                                        : status === "Previous" ?
                                                            <View>
                                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Consultation Summary:"}</TextComponent>
                                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs2} paddingHorizontal={Matrics.vs0}>{`Display the notes. images shared by designer during the call.`}</TextComponent>

                                                            </View>
                                                            :
                                                            <View>
                                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Refund:"}</TextComponent>
                                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs2} paddingHorizontal={Matrics.vs0}>{`INR 300 to the source of payment`}</TextComponent>
                                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Reason for Booking Cancellation:"}</TextComponent>
                                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs18} paddingHorizontal={Matrics.vs0}>{`StyleCrew member cancelled the booking or Transactional error`}</TextComponent>
                                                            </View>

                                                }
                                                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                    {image?.map(img => {
                                                        return (
                                                            <View style={{ marginRight: Matrics.hs15 }}>

                                                                <ImagePlaceHolderComponent multiple={true} size={Matrics.ms60} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs15} setImage={(image) => setImage(image)} image={img?.uri} disabled={true} borderColor={Colors.WHITE} />
                                                            </View>
                                                        )
                                                    })}

                                                </View>
                                            </View>
                                            {
                                                status === "Upcoming" ?
                                                    <View style={{ width: "55%", marginVertical: Matrics.vs20 }}>
                                                        <CommonButton text={"Join Video Call"} onPress={() => { }} viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} />
                                                    </View>
                                                    :
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                        <View style={{ flex: 0.49, justifyContent: "center" }}>
                                                            <CommonButton text={"Share Feedback"} onPress={() => { }} viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} />

                                                        </View>
                                                        <View style={{ flex: 0.48, justifyContent: "center" }}>
                                                            <CommonButton text={"Re-book"} onPress={() => { }} viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} />

                                                        </View>

                                                    </View>
                                            }

                                        </View>

                                    )
                                }}
                            />
                        </View>
                    </View>
                </View>

            </SafeAreaView>
            {
                visible ? <CustomModalComponent
                    visible={visible}
                    setVisible={() => setVisible(false)}
                >
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        <View style={{ backgroundColor: Colors.WHITE, height: "auto", paddingBottom: Matrics.vs15, }}>
                            <View style={{}}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", height: Matrics.vs55, marginRight: Matrics.vs20, marginBottom: Matrics.vs10 }}>
                                    <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} >{"Add Requirement"}</TextComponent>

                                    <Pressable onPress={() => setVisible(false)}>
                                        <Image source={Images.close} style={{ width: Matrics.ms26, height: Matrics.ms26, tintColor: Colors.LIGHTBLACK }} />
                                    </Pressable>
                                </View>
                                {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                            </View>
                            <View style={{ paddingHorizontal: Matrics.hs20 }}>

                                <RequirementComponent requirementData={requirementData} setRequirementData={setRequirementData} data={[]} images={[]} />
                                <View style={{ paddingBottom: Matrics.vs10 }}>

                                    <CommonButton text="Submit Requirement" onPress={() => { }} />
                                </View>
                            </View>
                        </View>

                    </View>
                </CustomModalComponent> : null
            }
        </KeyboardAvoidingView>
    )
}

export default MyBooking

const styles = StyleSheet.create({})