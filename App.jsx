/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { getRobotoFont } from './src/core-utils/utils';
import TextComponent from './src/core-component/atom/TextComponent';
import { Colors, Matrics } from './src/theme';
import AppNav from "./src/navigation"
import PushNotification, { Importance } from 'react-native-push-notification';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  PushNotification.createChannel(
    {
      channelId: "test-1", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

  return (
    <>
      <SafeAreaProvider>

        <AppNav />
      </SafeAreaProvider>

      {/* <AppNav /> */}
      {/* <TextComponent fontFamily={getRobotoFont("Medium")} size={Matrics.ms23} color={Colors.DARKGRAY}  >Update your profile to help ourassociates serve you better.</TextComponent> */}
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
