import { Button, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import Header from '../../core-component/atom/header'
import TextComponent from '../../core-component/atom/TextComponent'
import CommonButton from '../../core-component/molecules/CommonButton'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import BookingContext from '../../context/BookingContext'
import moment from 'moment'
import { CardField, StripeProvider, createPaymentMethod, presentPaymentSheet, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import UserParamContext from '../../context/setUserContext'
import axios from 'axios'
import { API_URL } from '../../../config'
import CheckoutComponent from '../../core-component/organism/CheckoutComponent'


const CompleteBooking = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const { booking } = useContext(BookingContext)
    const { user } = useContext(UserParamContext)
    const [card, setCard] = useState();
    const { createPaymentMethod } = useStripe();
    const { confirmPayment, loading } = useConfirmPayment();
    useEffect(() => {
        pay()
    }, [])



    const addBooking = async () => {
        let body = {
            "userId": user?.id,
            "designerId": booking?.id || booking?._id,
            "time": booking?.time,
            "date": moment(booking?.day).format("yyyy-MM-DD")
        }
        console.log("🚀 ~ file: CompleteBooking.jsx:33 ~ addBoking ~ body:", body)
        await axios.post(`${API_URL}appointment/add_appointment`, body, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(({ data }) => {
            console.log("🚀 ~ file: CompleteBooking.jsx:46 ~ addBooking ~ data:", data)
            if (data?.status === 200) {
                navigation.navigate("BookingStatus", { status: true })
            }
        }).catch(err => {
            console.log("🚀 ~ file: CompleteBooking.jsx:50 ~ addBooking ~ err:", err)


        })
    }

    const pay = async () => {

        const { paymentMethod, error } = await createPaymentMethod({
            paymentMethodType: "Card",
            paymentMethodData: {
                billingDetails: {
                    name: 'Jenny Rosen',
                },
                // token: "pi_3O6tamSFiZpukCb111W55h6Z_secret_LoH9aOzlzXEwImF1ltTuJlraj"
            }

        });
    }

    // const [paymentMethod, setPaymentMethod] = useState(null);
    const handlePayment = async () => {
        // Create a payment method using the Stripe API
        // You can also add error handling here
        const { paymentIntent, error } = await confirmPayment("pi_3O6to1SFiZpukCb10AjuBHVB_secret_UQoz5OzoSMI7PAdfTaG16fKwC", {
            paymentMethodType: "Card",
            paymentMethodData: {
                billingDetails: {
                    name: 'Jenny Rosen',
                },
                // token: "pi_3O6tamSFiZpukCb111W55h6Z_secret_LoH9aOzlzXEwImF1ltTuJlraj"
            }
        });

        if (error) {
            console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
            console.log('Success from promise', paymentIntent);
        }
        // if (paymentMethod) {
        //     // setPaymentMethod(paymentMethod);
        // } else {
        //     // Handle the error
        //     console.error(error);
        // }
    };
    
    const initializePaymentSheet = async () => {
        const clientSecret = "pi_3O6u7mSFiZpukCb11tj9D4GI_secret_G54BHQy6PnmcW4KrGbACI6qVi"
        if (clientSecret) {
            const billingDetails = {
                name: 'Test User'
            };
            const { error, paymentIntent } = await confirmPayment(clientSecret, {
                paymentMethodType: 'Card',
                paymentMethodData: { billingDetails: billingDetails }
            });
            if (error) {
                console.log("🚀 ~ file: CompleteBooking.jsx:81 ~ initializePaymentSheet ~ error:", error)
            } else if (paymentIntent) {
                onSuccess(`Payment of EUR ${amount} is successful! `)
            }
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet({ clientSecret });
        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };

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
                        <CheckoutComponent booking={booking} user={user}/>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default CompleteBooking

const styles = StyleSheet.create({})