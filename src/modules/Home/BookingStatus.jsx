import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CommonButton from '../../core-component/molecules/CommonButton'
import TextComponent from '../../core-component/atom/TextComponent'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import { Colors, Matrics } from '../../theme'
import Header from '../../core-component/atom/header'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import DropdownComponent from '../../core-component/atom/DropdownComponent'
import { useNavigation } from '@react-navigation/native'

const BookingStatus = () => {
    const insets = useSafeAreaInsets();
    const [status, setStatus] = useState(false)
    const [requirementData, setRequirementData] = useState({})
    const navigation = useNavigation()
    const qualifications = [
        { label: "Bachelor of Designing", value: "bachelor of design" },
        { label: "Bachelor of Engineering", value: "bachelor of engineering" },
        { label: "Bachelor of Computer and Science ", value: "bachelor of computer and science " },
    ]
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView style={{ flex: 1, paddingBottom: insets?.bottom ? 0 : 20 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
                        <Header text={"Booking Status"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.goBack()} />

                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ marginHorizontal: Matrics.hs20, marginTop: Matrics.vs40 }}>
                            <View style={{ paddingHorizontal: Matrics.vs20, paddingVertical: Matrics.vs25, backgroundColor: status ? Colors.LIMEGREENOPACITY : Colors.ORANGEOPACITY }}>
                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("SemiBold")} size={Matrics.ms18} color={status ? Colors.LIMEGREEN : Colors.ORANGE} marginTop={Matrics.vs0} paddingHorizontal={Matrics.vs0}>{status ? "Your booking has been confirmed" : "Your booking could not be confirmed"}</TextComponent>
                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.vs0}>{status ? "You can review your booking status and schedule under Upcoming Bookings in your My Account section." : "This must have happened due to technical issues or any other issue with the payment. The amount will be refunded incase the transaction has been done. Please report your issue if you need our assistance further."}</TextComponent>

                            </View>

                            <View style={{ paddingTop: Matrics.vs30, borderColor: Colors.MEDIUMGRAY, borderBottomWidth: 0 }}>
                                <TextComponent numberOfLines={5} fontFamily={getRubikFont()} size={Matrics.ms20} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={Matrics.vs0}>{"Submit Your Requirement"}</TextComponent>
                                <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} paddingHorizontal={Matrics.vs0}>{"Please fill the below form and share your requirement with us. This will help us serve you better."}</TextComponent>
                                <RequirementComponent requirementData={requirementData} setRequirementData={setRequirementData} data={qualifications} />

                            </View>
                        </View>

                    </ScrollView>
                    <View style={{ justifyContent: "flex-end", alignItems: "flex-end", marginHorizontal: Matrics.hs20 }}>

                        <CommonButton text="Submit Requirement" onPress={() => { }} />
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default BookingStatus

const styles = StyleSheet.create({})