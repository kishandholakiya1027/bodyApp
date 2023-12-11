import {  Linking, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Screen } from 'react-native-screens';
import { API_URL } from '../../../config';
import { handleURLCallback, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import CommonButton from '../molecules/CommonButton';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../core-utils/utils';

const CheckoutComponent = ({ user, booking }) => {
  console.log("🚀 ~ file: CheckoutComponent.jsx:13 ~ CheckoutComponent ~ user:", user)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()

  const handleDeepLink = useCallback(
    async (url) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );
  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  const fetchPaymentSheetParams = async () => {
    return await axios.post(`${API_URL}payment/payment-sheet`, {
      amount: booking.consultationCharge
    }).then(({ data }) => {
      const { paymentIntent, ephemeralKey, customer } = data;

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };


    }).catch(err => {


    })


  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error, paymentOption } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // returnURL: 'app://stripe-rediect',
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async (booking) => {
    // see below
    const { error } = await presentPaymentSheet();

    if (error) {
      showToast(`Error code: ${error.code}${error.message}`)
    } else {
      navigation.navigate("BookingStatus", { booking })
      showToast("Payment successfull!")
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const addBooking = async () => {
    let body = {
      "userId": user?.id||user?._id,
      "designerId": booking?.id || booking?._id,
      "time": booking?.time,
      "date": moment(booking?.day).format("yyyy-MM-DD")
    }
    await axios.post(`${API_URL}appointment/add_appointment`, body, {
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(({ data }) => {
      console.log("🚀 ~ file: CheckoutComponent.jsx:123 ~ addBooking ~ data:", data)
      if (data?.status === 200) {
        openPaymentSheet(data?.data)
      } else {
        navigation.navigate("BookingStatus", { booking: "" })
        showToast(data?.msg || data?.error)
      }
    }).catch(err => {
      console.log("🚀 ~ file: CompleteBooking.jsx:50 ~ addBooking ~ err:", err)


    })
  }
  return (
    <CommonButton text="Proceed to Payment" onPress={() => addBooking()} />
  );
}

export default CheckoutComponent

const styles = StyleSheet.create({})

