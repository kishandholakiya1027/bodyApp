import { Button, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import RNCallKeep from 'react-native-callkeep';
import { v4 as uuidv4 } from 'uuid';


export default class IncominCall extends Component {
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
        console.log("🚀 ~ file: IncominCall.jsx:16 ~ IncominCall ~ componentDidMount ~ r:", r)

        // Set up event listeners
        RNCallKeep.addEventListener('answerCall', this.onAnswerCall);
        RNCallKeep.addEventListener('endCall', this.onEndCall);
    }

    // componentWillUnmount() {
    //     // Clean up event listeners
    //     RNCallKeep.removeEventListener('answerCall', this.onAnswerCall);
    //     RNCallKeep.removeEventListener('endCall', this.onEndCall);
    // }

    onAnswerCall = (callUUID) => {
        // Handle the incoming call answered event here
        console.log(`Call answered: ${callUUID}`);
    }

    onEndCall = (callUUID) => {
        // Handle the call ended event here
        console.log(`Call ended: ${callUUID}`);
    }

    startCall = () => {
        // Start an outgoing call
        const callUUID = uuidv4(); // Generate a unique ID for the call
        console.log("🚀 ~ file: IncominCall.jsx:40 ~ IncominCall ~ callUUID:", callUUID)
        const handle = 'recipient_username'; // The recipient's username or phone number

        RNCallKeep.displayIncomingCall(callUUID, handle, 'Incoming Call', 'default', true);
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
