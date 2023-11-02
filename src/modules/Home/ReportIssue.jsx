import { Image, KeyboardAvoidingView, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import TextComponent from '../../core-component/atom/TextComponent'
import { Colors, Images, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import { useNavigation } from '@react-navigation/native'

const ReportIssue = () => {
    const insets = useSafeAreaInsets();
    const [issue, setIssue] = useState()
    const navigation = useNavigation()
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1, paddingBottom: insets?.bottom ? 0 : 20 }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: Matrics.vs55, marginRight: Matrics.vs20 }}>
                        <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} >{"Report an Issue"}</TextComponent>

                        <Pressable onPress={() => navigation.navigate("Home")}>
                            <Image source={Images.close} style={{ width: Matrics.ms18, height: Matrics.ms18, tintColor: Colors.LIGHTBLACK }} />
                        </Pressable>
                    </View>
                    {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                </View>
                <View style={{ flex: 1, marginHorizontal: Matrics.hs20 }}>
                    <TextComponent numberOfLines={5} fontFamily={getRubikFont("Regular")} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs15} paddingHorizontal={Matrics.vs0}>{"Please submit your query or issue below."}</TextComponent>
                    <View style={{ marginVertical: Matrics.vs25 }}>
                        <TextInputComponent placeholder={"Type your issue here"} multiline height={Matrics.vs150} onChangeText={(text) => setIssue(text)} value={issue} />
                    </View>

                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ReportIssue

const styles = StyleSheet.create({})