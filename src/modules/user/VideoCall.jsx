import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RtcEngine, {
    RtcLocalView,
    RtcRemoteView,
    VideoRenderMode,
} from 'react-native-agora';
import { Colors, Matrics } from '../../theme';
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils';
import Header from '../../core-component/atom/header';
import requestCameraAndAudioPermission from '../../core-component/atom/Permission';
import AgoraUIKit from 'agora-rn-uikit';
import RtmEngine from 'agora-react-native-rtm';


// const VideoCall = () => {
//     const _engine = useRef(null);
//     const [isJoined, setJoined] = useState(false);
//     const [peerIds, setPeerIds] = useState([]);
//     useEffect(() => {
//         if (Platform.OS === 'android') {
//             // Request required permissions from Android
//             requestCameraAndAudioPermission().then(() => {
//                 console.log('requested!')
//             })
//         } else {

//         }

//         const init = async () => {
//             const { appId } = config;
//             _engine.current = await RtcEngine.create(appId);
//             await _engine.current.enableVideo();

//             _engine.current.addListener('Warning', (warn) => {
//                 console.log('Warning', warn);
//             });

//             _engine.current.addListener('Error', (err) => {
//                 console.log('Error', err);
//             });

//             _engine.current.addListener('UserJoined', (uid, elapsed) => {
//                 console.log('UserJoined', uid, elapsed);
//                 // If new user
//                 if (peerIds.indexOf(uid) === -1) {
//                     // Add peer ID to state array
//                     setPeerIds((prev) => [...prev, uid]);
//                 }
//             });

//             _engine.current.addListener('UserOffline', (uid, reason) => {
//                 console.log('UserOffline', uid, reason);
//                 // Remove peer ID from state array
//                 setPeerIds((prev) => prev.filter((id) => id !== uid));
//             });

//             // If Local user joins RTC channel
//             _engine.current.addListener(
//                 'JoinChannelSuccess',
//                 (channel, uid, elapsed) => {
//                     console.log('JoinChannelSuccess', channel, uid, elapsed);
//                     // Set state variable to true
//                     setJoined(true);
//                 }
//             );
//         };
//         init();
//     }, [])

//     const startCall = async () => {
//         // Join Channel using null token and channel name
//         await _engine.current?.joinChannel(
//             config.token,
//             config.channelName,
//             null,
//             0
//         );
//     };

//     /**
//      * @name endCall
//      * @description Function to end the call
//      */
//     const endCall = async () => {
//         await _engine.current?.leaveChannel();
//         setPeerIds([]);
//         setJoined(false);
//     }

//     return (
//         <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
//             <SafeAreaView style={{ flex: 1 }}>
//                 <StatusBar barStyle="dark-content" backgroundColor="white" />
//                 <View style={{ borderBottomWidth: 0.5 }}>
//                     <Header text={"Video Call"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => { }} />

//                 </View>
//                 <View>
//                     <View style={{ marginTop: Matrics.vs10 }}>
//                         <Pressable style={styles.buttonView} onPress={startCall}>
//                             <Text style={styles.textStyle}>{"Start Call"}</Text>
//                         </Pressable>

//                     </View>
//                     <View style={{ marginTop: Matrics.vs10 }}>
//                         <Pressable style={styles.buttonView} onPress={endCall}>
//                             <Text style={styles.textStyle}>{"End Call"}</Text>
//                         </Pressable>

//                     </View>
//                 </View>
//             </SafeAreaView>
//         </KeyboardAvoidingView>
//     )
// }

// export default VideoCall


// const styles = StyleSheet.create({
//     textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
//     buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs30, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
// })




const VideoCall = () => {
    const [videoCall, setVideoCall] = useState(false);
    const [channelId, setChannelId] = useState(false);
    const _engine = useRef(null);
    const ref = useRef(null);
    const [isJoined, setJoined] = useState(false);
    const [peerIds, setPeerIds] = useState([]);
    const client = new RtmEngine();

    const connectionData = {
        appId: 'd4bab57c33a74881813563b96ec5470c',
        channel: 'test-',
        rtcUid: 0
    };
    const events = [
        'tokenExpired',
        'remoteInvitationRefused',
        'remoteInvitationFailure',
        'remoteInvitationCanceled',
        'remoteInvitationAccepted',
        'messageReceived',
        'localInvitationRefused',
        'localInvitationReceivedByPeer',
        'localInvitationFailure',
        'localInvitationCanceled',
        'localInvitationAccepted',
        'error',
        'connectionStateChanged',
        'channelMessageReceived',
        'channelMemberLeft',
        'channelMemberJoined',
        'remoteInvitationReceived',
    ];
    useEffect(() => {

        if (Platform.OS === 'android') {
            // Request required permissions from Android
            requestCameraAndAudioPermission().then(() => {
                console.log('requested!')
            })
        } else {

        }

        events.forEach((event) => {
            // @ts-ignore
            client.on(event, (evt) => {
                if (event === "channelMemberJoined") {
                    if (!peerIds?.includes(evt?.uid))
                        setPeerIds([...peerIds, evt?.uid])
                }
                if (event === "channelMemberLeft") {
                    setPeerIds([])
                    setVideoCall(false)
                }
                console.log("sssss", event, evt);
                // this.emit(event, evt);
            });

        });


    }, [])
    const rtcCallbacks = {

        EndCall: () => {
            setVideoCall(false)
        },
    };
    const startCall = async () => {
        // Join Channel using null token and channel name

    };

    //     /**
    //      * @name endCall
    //      * @description Function to end the call
    //      */

    return (

        <>
            {
                videoCall ? (
                    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
                ) : (
                    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
                        <SafeAreaView style={{ flex: 1 }}>
                            <StatusBar barStyle="dark-content" backgroundColor="white" />
                            <View style={{ borderBottomWidth: 0.5 }}>
                                <Header text={"Video Call"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => { }} />

                            </View>
                            <View>
                                {/* <View style={{ marginTop: Matrics.vs10 }}>
                                    <Pressable style={styles.buttonView} onPress={startCall}>
                                        <Text style={styles.textStyle}>{"Start Call"}</Text>
                                    </Pressable>
            
                                </View>
                                <View style={{ marginTop: Matrics.vs10 }}>
                                    <Pressable style={styles.buttonView} onPress={endCall}>
                                    </Pressable>
                                    
                                </View> */}
                                <View style={{ marginTop: Matrics.vs10 }}>
                                    <Pressable style={styles.buttonView} onPress={() => {
                                        // startCall()
                                        setVideoCall(true)
                                    }}>
                                        <Text style={styles.textStyle}>{"Start Call"}</Text>
                                    </Pressable>

                                </View>
                            </View>
                        </SafeAreaView>
                    </KeyboardAvoidingView>
                )
            }
        </>
    )
}

export default VideoCall

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs30, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
})