import { FlatList, Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
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
import axios from 'axios';
import { API_URL, IMAGE_URL } from '../../../config';
import UserParamContext from '../../context/setUserContext';
import TextInputComponent from '../../core-component/atom/TextInputComponent';
import { convertToformData } from '../../core-utils/dataConverter';
import VideoCall from '../user/VideoCall';

const MyBooking = () => {
    const insets = useSafeAreaInsets();
    // const { booking } = useContext(BookingContext)
    const [status, setStatus] = useState("Upcoming")
    const [visible, setVisible] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)
    const [reason, setReason] = useState()
    const [image, setImage] = useState([])
    const [booking, setBooking] = useState([])
    const navigation = useNavigation()
    const { user } = useContext(UserParamContext)
    const [requirementData, setRequirementData] = useState({})
    const [currentBooking, setCurrentBooking] = useState({})

    useEffect(() => {
        getBooking()
    }, [])

    const getBooking = async (status = "Upcoming") => {

        if (status === "Cancelled") {
            let url = user?.role ? "appointment/get_appointment_designer_status" : "appointment/get_appointment_user_status"
            let data = user?.role ? {
                "designerId": user?.id || user?._id,
                "status": "cancle"
            } : {
                "userId": user?.id || user?._id,
                "status": "cancle"
            }

            await axios.post(`${API_URL}${url}`, data).then(({ data }) => {
                if (data?.status === 200) {
                    setBooking(data?.data)
                }

            }).catch(err => {
                console.log("🚀 ~ file: MyBooking.jsx:46 ~ getBooking ~ err:", err)
                return {
                }

            })
        } else {
            let url = user?.role ? status === "Upcoming" ?
                "appointment/get_appointment_designer_upcoming/" :
                status === "Previous" ? "appointment/get_appointment_designer_previous/" : "" : status === "Upcoming" ? "appointment/get_appointment_user_upcoming/" : status === "Previous" ? "appointment/get_appointment_user_previous/" : ""
            await axios.get(`${API_URL}${url}${user?.id || user?._id}`, {
                headers: {
                    "Content-Type": "applicatipn/json"
                }
            }).then(({ data }) => {
                if (data?.status === 200) {
                    setBooking(data?.data)
                }

            }).catch(err => {
                console.log("🚀 ~ file: MyBooking.jsx:46 ~ getBooking ~ err:", err)
                return {
                }

            })

        }
    }

    const addRequirement = async () => {
        let data;
        if (requirementData?._id) {
            data = {
                ...requirementData,

            }
            if (!data?.new) {
                delete data["images"]
            } else {

                delete data["new"]
            }
            delete data["_id"]
            let body = convertToformData(data)
            await axios.put(`${API_URL}requirement/edit_requirement/${requirementData?._id}`, body, {
                headers: {
                    "Content-Type": "multipart/form-data",

                }
            }
            ).then(({ data }) => {
                if (data?.status === 200) {
                    getBooking()
                    setVisible(false)
                } else {

                }
            }).catch(err => {
                console.log("🚀 ~ file: MyBooking.jsx:105 ~ addRequirement ~ err:", err)

            })

        } else {
            data = {
                ...requirementData,
                "userId": currentBooking?.userId,
                "appointmentId": currentBooking?._id,
                "designerId": currentBooking?.designerId,

            }
            delete data["new"]
            let body = convertToformData(data)
            await axios.post(`${API_URL}requirement/add_requirement`, body, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(({ data }) => {
                if (data?.status === 200) {
                    getBooking()
                    setVisible(false)
                } else {

                }

            }).catch(err => {

            })
        }

    }

    const startCall = async (item) => {
        // Join Channel using null token and channel name
        await axios.post(`${API_URL}send`, {
            userId:( user?.id === item?.userId || user?._id === item?.userId) ? item?.designerId : item?.userId,
            title: "Incoming Call",
            body: "Incoming Call",
            channelId: `${item?._id}`
        }).then(data => {

            navigation.navigate("VideoCall", { item, user })
        }).catch(err => {

        })
    };

    const appointmentStatus = {
        cancle: "Cancelled",
        complete: "Completed",
        confirm: "Confirmed",
        pending: "Confirmation Pending",

    }
    const appointmentStatusColor = {
        cancle: Colors.ORANGE,
        complete: Colors.COMPLETESTATUS,
        confirm: Colors.LIMEGREEN,
        pending: Colors.LIGHTGRAY,

    }

    const editRequirement = async (status) => {
        let data
        if (status === "cancle") {
            data = { appointmentId: currentBooking?.id || currentBooking?._id, desc: reason }
            await axios.post(`${API_URL}reason/add_reason`, data).then(({ data }) => {
                if (data?.status === 200) {
                    getBooking()
                    setCancelModal(false)
                }
            }).catch(err => {

            })
        } else {
            data = { status }
            await axios.put(`${API_URL}appointment/edit_appointment/${currentBooking?.id || currentBooking?._id}`, data).then(({ data }) => {
                if (data?.status === 200) {
                    getBooking()
                    setCancelModal(false)
                }
            }).catch(err => {
                console.log("🚀 ~ file: MyBooking.jsx:172 ~ awaitaxios.put ~ err:", err)

            })
        }
    }

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
                        <Header text={"My Bookings"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.navigate("Home")} />

                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>

                            <View style={{ flexDirection: "row", alignItems: "center", paddingTop: Matrics.vs20, justifyContent: "flex-start", marginTop: Matrics.vs10, marginLeft: Matrics.hs20 }}>
                                {
                                    statusArray?.map((item, index) => {
                                        return (
                                            <Pressable onPress={() => {
                                                getBooking(item?.value)
                                                setStatus(item?.value)
                                            }} style={{ minWidth: Matrics.hs105, paddingHorizontal: Matrics.hs16, paddingVertical: Matrics.vs12, backgroundColor: status === item?.value ? Colors.MEDIUMREDOPACITY : Colors.BACKGROUNDGRAY, marginRight: Matrics.vs10, marginVertical: Matrics.vs7, borderRadius: Matrics.ms25, justifyContent: "center" }}>
                                                <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={status === item?.value ? Colors.MEDIUMRED : Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>{item?.label}</TextComponent>

                                            </Pressable>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                        <View style={{ marginHorizontal: Matrics.vs20, height: "83%", }}>
                            <FlatList
                                data={booking}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ flexGrow: 1, }}

                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingBottom: Matrics.vs15, marginBottom: Matrics.vs30 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                                <View style={{ flex: 0.50 }}>
                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs5} paddingHorizontal={Matrics.vs0}>{"Booking ID:"}</TextComponent>
                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont()} size={Matrics.ms18} color={Colors.BLUE} marginTop={Matrics.vs5} paddingHorizontal={Matrics.vs0}>{`#${item?._id?.slice(-6)}`}</TextComponent>

                                                </View>
                                                <View style={{ flex: 0.50, alignItems: "flex-end", justifyContent: "center", }}>
                                                    <View style={{ backgroundColor: appointmentStatusColor[item?.status], borderRadius: Matrics.ms20, alignItems: "center", justifyContent: "center", paddingVertical: Matrics.vs5, paddingHorizontal: Matrics.hs10 }}>
                                                        <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms14} color={Colors.WHITE} paddingHorizontal={Matrics.vs0}>{appointmentStatus[item?.status]}</TextComponent>

                                                    </View>

                                                </View>
                                            </View>
                                            <View>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Appointment with:"}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{user?.role ? item?.user_name||"user" : item?.designer_name || "designer"}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Slot:"}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{item?.date ? moment(item?.date).format("dddd , Do MMMM") : ""}</TextComponent>
                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{item?.time || "0:00"}</TextComponent>
                                                {(status === "Upcoming" || status === "Previous") ? <View>
                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Paid:"}</TextComponent>
                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`INR 300/30 min session`}</TextComponent>

                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: Matrics.vs20 }}>

                                                        <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} paddingHorizontal={Matrics.vs0}>{"Requirement Summary: "}</TextComponent>
                                                        <Pressable onPress={() => {
                                                            setCurrentBooking(item)
                                                            setRequirementData(item?.requirement)
                                                            setVisible(true)
                                                        }}>
                                                            <Image source={Images.edit} style={{ width: Matrics.ms24, height: Matrics.ms24, resizeMode: "contain" }} />

                                                        </Pressable>
                                                    </View>

                                                </View> : null}
                                                {item?.requirement?._id && (status === "Upcoming" || status === "Previous") ? <View>
                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.vs0}>{`Purpose of Consultation:${item?.requirement?.consultation}`}</TextComponent>
                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`Preferred Look/Style: ${item?.requirement?.style}  `}</TextComponent>
                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`Occasion: ${item?.requirement?.style}  `}</TextComponent>
                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`Brief: ${item?.requirement?.description} `}</TextComponent>
                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`Budget: INR ${item?.requirement?.budget || 0}`}</TextComponent>

                                                </View> : null}
                                                {
                                                    status === "Upcoming" ?

                                                        item?.requirement?._id ? <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{`Attachments:`}</TextComponent> : null
                                                        : status === "Previous" ?
                                                            <View>
                                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Consultation Summary:"}</TextComponent>
                                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs2} paddingHorizontal={Matrics.vs0}>{`Display the notes. images shared by designer during the call.`}</TextComponent>

                                                            </View>
                                                            :
                                                            <View>
                                                                {!user?.role ? <View>
                                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Refund:"}</TextComponent>
                                                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs2} paddingHorizontal={Matrics.vs0}>{`INR 300 to the source of payment`}</TextComponent>

                                                                </View> : null}
                                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Reason for Booking Cancellation:"}</TextComponent>
                                                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs18} paddingHorizontal={Matrics.vs0}>{item?.reason}</TextComponent>
                                                            </View>

                                                }
                                                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                    {item?.requirement?._id && (status === "Upcoming" || status === "Previous") ? item?.requirement?.images?.map(img => {
                                                        return (
                                                            <View style={{ marginRight: Matrics.hs15 }}>

                                                                <ImagePlaceHolderComponent disabled={true} size={Matrics.ms60} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs15} setImage={(image) => setImage(image)} image={`${IMAGE_URL}${img}`}  borderColor={Colors.WHITE} />
                                                            </View>
                                                        )
                                                    }) : null}

                                                </View>
                                            </View>
                                            {
                                                status === "Upcoming" ? user?.role && item?.status === "pending" ?
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: Matrics.vs30 }}>
                                                        <View style={{ flex: 0.47, justifyContent: "center" }}>
                                                            <CommonButton text={"Cancel"} onPress={() => {
                                                                setCurrentBooking(item)
                                                                setCancelModal(true)
                                                            }} />

                                                        </View>
                                                        <View style={{ flex: 0.48, justifyContent: "center" }}>
                                                            <CommonButton text={"Accept"} onPress={() => editRequirement("confirm")} viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} />

                                                        </View>

                                                    </View>
                                                    :
                                                    <View style={{ width: "55%", marginVertical: Matrics.vs20 }}>
                                                        <CommonButton text={"Join Video Call"} onPress={() => startCall(item)} viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} />

                                                        {/* <VideoCall item={item} user={user}/> */}
                                                    </View>
                                                    : status === "Previous" ?
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: Matrics.vs15 }}>
                                                            <View style={{ flex: 0.49, justifyContent: "center" }}>
                                                                <CommonButton text={"Share Feedback"} onPress={() => { }} viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} />

                                                            </View>
                                                            {user?.role ? <View style={{ flex: 0.48, justifyContent: "center" }}>
                                                                <CommonButton text={"Re-book"} onPress={() => { }} viewStyle={{ backgroundColor: Colors.BLUE }} textStyle={{ color: Colors.WHITE }} />

                                                            </View> : null}

                                                        </View>
                                                        : null}

                                        </View>

                                    )
                                }}
                                ListEmptyComponent={() => {
                                    return (
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms18, color: Colors.DARKGRAY }}>No Bookings.</Text>
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
                        <View style={{ backgroundColor: Colors.WHITE, height: "auto", paddingBottom: Matrics.vs30, }}>
                            <View style={{}}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: Matrics.ms65, marginRight: Matrics.vs20, marginBottom: Matrics.vs10 }}>
                                    <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} >{requirementData?._id ? "Modify Requirement" : "Add Requirement"}</TextComponent>

                                    <Pressable onPress={() => setVisible(false)} style={{}}>
                                        <Image source={Images.close} style={{ width: Matrics.ms18, height: Matrics.ms18, tintColor: Colors.LIGHTBLACK }} />
                                    </Pressable>
                                </View>
                                {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                            </View>
                            <View style={{ paddingHorizontal: Matrics.hs20 }}>

                                <RequirementComponent requirementData={requirementData} setRequirementData={setRequirementData} data={[]} images={[]} />
                                <View style={{ paddingBottom: Matrics.vs10 }}>

                                    <CommonButton text="Submit Requirement" onPress={() => addRequirement()} disabled={(Object.keys(requirementData).length < 5 || Object.values(requirementData).includes(""))} enabled={requirementData?._id || (Object.keys(requirementData).length >= 5 && !Object.values(requirementData).includes(""))} />
                                </View>
                            </View>
                        </View>

                    </View>
                </CustomModalComponent> : null
            }
            {
                cancelModal ? <CustomModalComponent
                    visible={cancelModal}
                    setVisible={() => setCancelModal(false)}
                >
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        <View style={{ backgroundColor: Colors.WHITE, height: "auto", paddingBottom: Matrics.vs10, }}>
                            <View style={{}}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: Matrics.ms65, marginRight: Matrics.vs20, marginBottom: Matrics.vs10 }}>
                                    <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} >{"Reason for Cancellation"}</TextComponent>

                                    <Pressable onPress={() => setCancelModal(false)}>
                                        <Image source={Images.close} style={{ width: Matrics.ms18, height: Matrics.ms18, tintColor: Colors.LIGHTBLACK }} />
                                    </Pressable>
                                </View>
                                {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                            </View>
                            <View style={{ padding: Matrics.hs20, paddingTop: 0 }}>

                                <TextInputComponent placeholder={"Add a brief about your requirement"} onChangeText={text => setReason(text)} value={reason} height={Matrics.ms100} multiline />
                                <View style={{ alignItems: "center", marginBottom: Matrics.vs10 }}>
                                    <View style={{ width: "70%" }}>

                                        <CommonButton text={"Cancel Booking"} onPress={() => editRequirement("cancle")} enabled={reason} />
                                    </View>
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