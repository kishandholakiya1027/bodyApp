import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Images, Matrics } from '../../theme'
import TextComponent from '../atom/TextComponent'
import { getRubikFont } from '../../core-utils/utils'

const IncomingCall = ({ onReceive }) => {
    return (
        <ImageBackground source={Images.call} resizeMode="cover" style={{
            flex: 1,
            justifyContent: 'flex-end',
        }}>
            <View style={{ alignItems: "center", justifyContent: "flex-start", }}>
                <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms30} color={Colors.WHITE} marginTop={Matrics.vs15} paddingHorizontal={0}>Janny User</TextComponent>
                <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms18} color={Colors.WHITE} marginTop={Matrics.vs15} paddingHorizontal={0}>89977847847</TextComponent>
            </View>
            <View style={{ flexDirection: "row", marginBottom: Matrics.vs150, justifyContent: "space-between", marginHorizontal: Matrics.hs40, height: "50%", alignItems: "flex-end" }}>
                <Pressable onPress={onReceive}>
                    <Image source={Images.answer} style={{ width: Matrics.ms70, height: Matrics.ms70, tintColor: Colors.WHITE }} />

                </Pressable>
                <Image source={Images.answer} style={{ width: Matrics.ms70, height: Matrics.ms70, tintColor: Colors.WHITE }} />

            </View>
        </ImageBackground>
    )
}

export default IncomingCall

const styles = StyleSheet.create({})