import { FlatList, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../../core-component/atom/header'
import TextComponent from '../../core-component/atom/TextComponent'
import { useNavigation } from '@react-navigation/native'

const ListMessages = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const msg = [
        {
            name: "Prerna Kanaujia",
            message: "Here is the quick styling tip for you : is the quick styling tip for you tip for you",
            time: "Sep 14"
        },
        {
            name: "Prerna Kanaujia",
            message: "Here is the quick styling tip for you:",
            time: "Sep 14"
        }
    ]

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView style={{ flex: 1, paddingBottom: insets?.bottom ? 0 : 20 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
                        <Header text={"Messages"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.goBack()} />

                    </View>
                    <View style={{ flex: 1, marginHorizontal: Matrics.hs20 }}>

                        <FlatList
                            data={msg}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ paddingVertical: Matrics.vs30, borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <View>
                                                <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms20} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0} paddingHorizontal={0}>{item?.name}</TextComponent>

                                            </View>
                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms14} color={Colors.LIGHTGRAY} marginTop={Matrics.vs0} paddingHorizontal={0} >{item?.time}</TextComponent>

                                        </View>
                                        <View style={{ width: "80%" }}>
                                            <TextComponent fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs7} paddingHorizontal={0} numberOfLines={2}>{item?.message}</TextComponent>

                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ListMessages

const styles = StyleSheet.create({})