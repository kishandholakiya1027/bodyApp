import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import { initialWindowMetrics, useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../core-component/atom/header'
import TextComponent from '../../core-component/atom/TextComponent'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import BookingContext from '../../context/BookingContext'
import CommonButton from '../../core-component/molecules/CommonButton'

const SlotScreen = () => {
    const [day, setDay] = useState(moment())
    const [time, setTime] = useState()
    const [error, setError] = useState(false)
    const [noslot, setNoSlot] = useState()
    const navigation = useNavigation()
    const { setBooking, booking } = useContext(BookingContext)
    const insets = useSafeAreaInsets();

    useEffect(() => {
        setNoSlot(moment().format('a') === "pm" ? parseInt(moment().format("hmm")) + 300 > 600 ? true : false : false)
    }, [])

    const timeArray = [
        { label: "10:00 AM", value: "10:00 AM" },
        { label: "10:30 AM", value: "10:30 AM" },
        { label: "11:00 AM", value: "11:00 AM" },
        { label: "11:30 AM", value: "11:30 AM" },
        { label: "12:00 PM", value: "12:00 PM" },
        { label: "12:30 PM", value: "12:30 PM" },
        { label: "01:00 PM", value: "01:00 PM" },
        { label: "01:30 PM", value: "01:30 PM" },
        { label: "02:00 PM", value: "02:00 PM" },
        { label: "02:30 PM", value: "02:30 PM" },
        { label: "03:00 PM", value: "03:00 PM" },
        { label: "03:30 PM", value: "03:30 PM" },
        { label: "04:00 PM", value: "04:00 PM" },
        { label: "04:30 PM", value: "04:30 PM" },
        { label: "05:00 PM", value: "05:00 PM" },
        { label: "05:30 PM", value: "05:30 PM" },
        { label: "06:00 PM", value: "06:00 PM" },
    ]

    const onSubmit = () => {
        if (!day || !time) {
            setError(true)
        } else {
            setError(false)
            setBooking({ ...booking, day, time })
            navigation.navigate("CompleteBooking")
        }
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView initialMetrics={initialWindowMetrics} style={{ flex: 1 }} >
                <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
                    <Header text={"Select Slots"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.goBack()} />

                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>

                        <View style={{}}>
                            <View style={{ marginHorizontal: Matrics.hs20 }}>
                                <View style={{ marginBottom: Matrics.vs25, marginTop: Matrics.vs35 }}>

                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={0}>{"Slots are available for booking only up to next 3 working days."}</TextComponent>
                                </View>
                                <View style={{ borderBottomWidth: 1.5, borderBottomColor: Colors.MEDIUMGRAY }}>
                                    <TextComponent numberOfLines={5} fontFamily={getRubikFont()} size={Matrics.ms20} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={0}>{"Pick a date:"}</TextComponent>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                                        <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: Matrics.vs20, justifyContent: "flex-start", marginTop: Matrics.vs10 }}>
                                            {
                                                new Array(3).fill(0)?.map((user, index) => {
                                                    let currentday = moment().add(`${index}`, 'days')
                                                    let currentdays = moment().add(`${index}`, 'days').format("hmm")
                                                    return (
                                                        <Pressable onPress={() => {
                                                            setNoSlot(currentdays > 600 && index === 0 ? true : false)
                                                            setDay(currentday)
                                                        }} style={{ paddingHorizontal: Matrics.hs20, paddingVertical: Matrics.vs15, backgroundColor: currentday?.format("DDMMMMYYYY") === day?.format("DDMMMMYYYY") ? Colors.MEDIUMREDOPACITY : Colors.BACKGROUNDGRAY, marginRight: Matrics.vs10, marginVertical: Matrics.vs5, borderRadius: Matrics.ms25, justifyContent: "center" }}>
                                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={currentday?.format("DDMMMMYYYY") === day?.format("DDMMMMYYYY") ? Colors.MEDIUMRED : Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>{`${currentday?.calendar()?.split(" ")[0]} , ${currentday?.format("Do MMMM")}`}</TextComponent>

                                                        </Pressable>
                                                    )
                                                })
                                            }
                                        </View>
                                    </ScrollView>
                                </View>

                            </View>
                            <View style={{ marginVertical: Matrics.vs25, height: (!day || !time) && error ? "43%" : "49%" }}>
                                <TextComponent numberOfLines={5} fontFamily={getRubikFont()} size={Matrics.ms20} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs20}>{"Pick a slot:"}</TextComponent>
                                {!noslot ?

                                    <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", paddingBottom: Matrics.vs20, justifyContent: "flex-start", marginTop: Matrics.vs10, marginLeft: Matrics.hs20 }}>
                                        {
                                            timeArray?.map((tm, index) => {
                                                let times = day?.format("DDMMMMYYYY") === moment().format("DDMMMMYYYY") ? moment().add("3", "hours").format("hmm") : "000"
                                                return (
                                                    parseInt(tm?.label?.split(" ")[0]?.replace(":", "")?.slice(1)) >= parseInt(times) ? <Pressable onPress={() => setTime(tm?.value)} style={{ minWidth: Matrics.hs105, paddingHorizontal: Matrics.hs16, paddingVertical: Matrics.vs12, backgroundColor: time === tm?.value ? Colors.MEDIUMREDOPACITY : Colors.BACKGROUNDGRAY, marginRight: Matrics.vs10, marginVertical: Matrics.vs7, borderRadius: Matrics.ms25, justifyContent: "center" }}>
                                                        {/* <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={time === tm?.value ? Colors.MEDIUMRED : Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>{  moment().add("3","hour").format("LT") tm?.label}</TextComponent> */}
                                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={time === tm?.value ? Colors.MEDIUMRED : Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>{tm?.label}</TextComponent>

                                                    </Pressable> : null
                                                )
                                            })
                                        }
                                    </View>
                                    : null}
                                {noslot ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                                    <Text style={{ fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms18, color: Colors.DARKGRAY }}>No slots.</Text>
                                </View> : null}
                            </View>
                            <View style={{ marginHorizontal: Matrics.hs20 }}>
                                {(!day || !time) && error ? <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.MEDIUMRED} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>{"Please select the date and time from the available slots."}</TextComponent> : null}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ marginHorizontal: Matrics.hs20,paddingBottom:insets?.bottom ? 0: Matrics.vs20 }}>
                    <CommonButton text="Book Consultation" onPress={() => onSubmit()} viewStyle={time && day ? { backgroundColor: Colors.BLUE } : {}} textStyle={time && day ? { color: Colors.WHITE } : {}} />



                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default SlotScreen

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, width: "100%", fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, textAlign: "center" },
    buttonView: { marginTop: Matrics.vs15, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs20, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%" },
})