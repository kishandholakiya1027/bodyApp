import { Button, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import RNCallKeep from 'react-native-callkeep';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';


export default class IncominCall extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    componentDidMount() {
        // Initialize CallKeep
        RNCallKeep.setup({
            ios: {
                appName: "Example",
                supportsVideo: true,
                displayCallReachabilityTimeout: 1000,
            },
            android: {
                alertTitle: "Permissions required",
                alertDescription:
                    "This application needs to access your phone accounts",
                cancelButton: "Cancel",
                okButton: "ok",
                imageName: "phone_account_icon",
                additionalPermissions: [
                    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
                    PermissionsAndroid.PERMISSIONS.CALL_PHONE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                    PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
                ],
                foregroundService: {
                    channelId: "com.company.my",
                    channelName: "Foreground service for my app",
                    notificationTitle:
                        "My app is running on background",
                    notificationIcon:
                        "Path to the resource icon of the notification",
                },
                displayCallReachabilityTimeout: 30000,
            },
        });
        let r = RNCallKeep.supportConnectionService()

        // Set up event listeners
        // Add RNCallKeep Events
        RNCallKeep.addEventListener('didReceiveStartCallAction', this.didReceiveStartCallAction);
        RNCallKeep.addEventListener('answerCall', this.onAnswerCallAction);
        RNCallKeep.addEventListener('endCall', this.onEndCallAction);
        RNCallKeep.addEventListener('didDisplayIncomingCall', this.onIncomingCallDisplayed);
        RNCallKeep.addEventListener('didPerformSetMutedCallAction', this.onToggleMute);
        RNCallKeep.addEventListener('didToggleHoldCallAction', this.onToggleHold);
        RNCallKeep.addEventListener('didPerformDTMFAction', this.onDTMFAction);
        RNCallKeep.addEventListener('didActivateAudioSession', this.audioSessionActivated);
        // RNCallKeep.addEventListener('answerCall', this.onAnswerCall);

        setTimeout(() => {
            this.startCall()
        }, 2000);
        // RNCallKeep.addEventListener('endCall', this.onEndCall);
    }

    // componentWillUnmount() {
    //     // Clean up event listeners
    //     RNCallKeep.removeEventListener('answerCall', this.onAnswerCall);
    //     RNCallKeep.removeEventListener('endCall', this.onEndCall);
    // }
    didReceiveStartCallAction = (data) => {
        let { handle, callUUID, name } = data;
        RNCallKeep.displayIncomingCall(callUUID, handle, 'Incoming Call', 'default', true);

        // Get this event after the system decides you can start a call
        // You can now start a call from within your app
    };

    onAnswerCallAction = (data) => {
        let { callUUID } = data;
        RNCallKeep.endCall(callUUID);
        this.props.navigation.navigate("Home")
        // Called when the user answers an incoming call
    };

    onEndCallAction = (data) => {
        let { callUUID } = data;
        RNCallKeep.endCall(this.getCurrentCallId());

        this.currentCallId = null;
    };


    getCurrentCallId = () => {
        if (!this.currentCallId) {
            this.currentCallId = uuidv4();
        }

        return this.currentCallId;
    };

    // Currently iOS only
    onIncomingCallDisplayed = (data) => {
        let { error } = data;

        // You will get this event after RNCallKeep finishes showing incoming call UI
        // You can check if there was an error while displaying
    };

    onToggleMute = (data) => {
        let { muted, callUUID } = data;
        // Called when the system or user mutes a call
    };

    onToggleHold = (data) => {
        let { hold, callUUID } = data;
        // Called when the system or user holds a call
    };

    onDTMFAction = (data) => {
        let { digits, callUUID } = data;
        // Called when the system or user performs a DTMF action
    };

    audioSessionActivated = (data) => {
        // you might want to do following things when receiving this event:
        // - Start playing ringback if it is an outgoing call
    };

    onAnswerCall = (callUUID) => {
        // Handle the incoming call answered event here
        // this.props.navigation.navigate("Home")
        console.log(`Call answered: ${callUUID}`);
    }

    onEndCall = (callUUID) => {
        // Handle the call ended event here
        console.log(`Call ended: ${callUUID}`);
    }

    startCall = () => {
        // Start an outgoing call
        const callUUID = uuidv4(); // Generate a unique ID for the call
        const handle = 'recipient_username'; // The recipient's username or phone number
        // RNCallKeep.answerIncomingCall(callUUID)

        RNCallKeep.displayIncomingCall(callUUID, handle, 'Incoming Call', 'default', true);
        // RNCallKeep.updateDisplay(callUUID, "displayName", handle)
        // RNCallKeep.startCall(callUUID, handle, "contactIdentifier", "default", true);
    }

    endCall = () => {
        // End the ongoing call
        const callUUID = 'some_unique_id'; // The same unique ID used to start the call

        RNCallKeep.endCall(callUUID);
    }

    render() {
        return (
            <View style={{ margin: 90 }}>
                <Text>React Native RNCallKeep Example</Text>
                <Button title="End Call" onPress={this.endCall} />
                <Button title="Start Call" onPress={this.startCall} />
            </View>
        );
    }
}
