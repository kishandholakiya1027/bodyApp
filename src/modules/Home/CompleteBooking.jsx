import { KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import Header from '../../core-component/atom/header'
import TextComponent from '../../core-component/atom/TextComponent'
import CommonButton from '../../core-component/molecules/CommonButton'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import BookingContext from '../../context/BookingContext'
import moment from 'moment'

const CompleteBooking = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const { booking } = useContext(BookingContext)
    console.log("🚀 ~ file: CompleteBooking.jsx:16 ~ CompleteBooking ~ booking :", booking)
    console.log("🚀 ~ file: CompleteBooking.jsx:12 ~ CompleteBooking ~ insets:", insets)
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView style={{ flex: 1, paddingBottom: insets?.bottom ? 0 : 20 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
                        <Header text={"Complete Booking"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.goBack()} />

                    </View>
                    <View style={{ marginHorizontal: Matrics.hs20, }}>

                        <View style={{ paddingVertical: Matrics.vs30, borderColor: Colors.MEDIUMGRAY, borderBottomWidth: 1 }}>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont()} size={Matrics.ms20} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={Matrics.vs0}>{"Booking Summary"}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Appointment with:"}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{booking?.username}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Slot:"}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{moment(booking?.day).format("dddd , Do MMMM")}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{booking?.time}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTGRAY} marginTop={Matrics.vs20} paddingHorizontal={Matrics.vs0}>{"Consultation Fees: "}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs3} paddingHorizontal={Matrics.vs0}>{`INR ${booking?.consultationCharge}/30 min session`}</TextComponent>

                        </View>
                        <View style={{ paddingVertical: Matrics.vs25 }}>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont()} size={Matrics.ms20} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={Matrics.vs0}>{"Payment Mode"}</TextComponent>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.vs0}>{"Select the mode of payment"}</TextComponent>

                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end", marginHorizontal: Matrics.hs20 }}>

                        <CommonButton text="Proceed to Payment" onPress={() => navigation.navigate("BookingStatus")} />
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default CompleteBooking

const styles = StyleSheet.create({})