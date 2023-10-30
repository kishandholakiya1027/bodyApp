import { KeyboardAvoidingView, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Colors, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../core-component/atom/header'
import TextComponent from '../../core-component/atom/TextComponent'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import BookingContext from '../../context/BookingContext'

const SlotScreen = () => {
    const [day, setDay] = useState()
    const [time, setTime] = useState()
    const [error, setError] = useState(false)
    const navigation = useNavigation()
    const { setBooking, booking } = useContext(BookingContext)
    console.log("🚀 ~ file: SlotScreen.jsx:12 ~ SlotScreen ~ day:", day)
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
            <SafeAreaView style={{ flex: 1 }}>
                <View>

                    <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
                        <Header text={"Select Slots"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.goBack()} />

                    </View>
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
                                            new Array(7).fill(0)?.map((user, index) => {
                                                let currentday = moment().add(`${index}`, 'days')
                                                return (
                                                    <Pressable onPress={() => setDay(currentday)} style={{ paddingHorizontal: Matrics.hs20, paddingVertical: Matrics.vs15, backgroundColor: currentday?.format("DDMMMMYYYY") === day?.format("DDMMMMYYYY") ? Colors.MEDIUMREDOPACITY : Colors.BACKGROUNDGRAY, marginRight: Matrics.vs10, marginVertical: Matrics.vs5, borderRadius: Matrics.ms25, justifyContent: "center" }}>
                                                        <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={currentday?.format("DDMMMMYYYY") === day?.format("DDMMMMYYYY") ? Colors.MEDIUMRED : Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>{`${currentday?.calendar()?.split(" ")[0]} , ${currentday?.format("Do MMMM")}`}</TextComponent>

                                                    </Pressable>
                                                )
                                            })
                                        }
                                    </View>
                                </ScrollView>
                            </View>

                        </View>
                        <View style={{ marginVertical: Matrics.vs25, height: (!day || !time) && error ? "43 %" : "49%" }}>
                            <TextComponent numberOfLines={5} fontFamily={getRubikFont()} size={Matrics.ms20} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs20}>{"Pick a slot:"}</TextComponent>
                            <ScrollView showsVerticalScrollIndicator={false}>

                                <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", paddingBottom: Matrics.vs20, justifyContent: "flex-start", marginTop: Matrics.vs10, marginLeft: Matrics.hs20 }}>
                                    {
                                        timeArray?.map((tm, index) => {
                                            return (
                                                <Pressable onPress={() => setTime(tm?.value)} style={{ minWidth: Matrics.hs105, paddingHorizontal: Matrics.hs16, paddingVertical: Matrics.vs12, backgroundColor: time === tm?.value ? Colors.MEDIUMREDOPACITY : Colors.BACKGROUNDGRAY, marginRight: Matrics.vs10, marginVertical: Matrics.vs7, borderRadius: Matrics.ms25, justifyContent: "center" }}>
                                                    <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={time === tm?.value ? Colors.MEDIUMRED : Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>{tm?.label}</TextComponent>

                                                </Pressable>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{ marginHorizontal: Matrics.hs20 }}>
                            {(!day || !time) && error ? <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.MEDIUMRED} marginTop={Matrics.vs0} paddingHorizontal={Matrics.hs0}>{"Please select the date and time from the available slots."}</TextComponent> : null}
                            <View style={{}}>
                                <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs10 }]} onPress={() => onSubmit()}>
                                    <Text style={styles.textStyle}>{"Book Consultation"}</Text>
                                </Pressable>

                            </View>
                        </View>
                    </View>
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