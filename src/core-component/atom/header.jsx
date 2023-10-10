import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Images, Matrics } from '../../theme'
import { getRobotoFont, getRubikFont } from '../../core-utils/utils'
const Header = ({ text, backgroundColor, backArrow, onBackArrow }) => {
    return (
        <View style={[styles.mainView, { backgroundColor: backgroundColor ? backgroundColor : Colors.GRAY }]}>
            <Pressable onPress={() => onBackArrow ? onBackArrow() : {}}>
                <Image source={Images.arrow} style={{ width: Matrics.ms13, height: Matrics.ms27, tintColor: backArrow ? backArrow : Colors.DARKGRAY }} />

            </Pressable>
            {text ? <Text style={styles.textStyle}>{text}</Text> : null}
        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    mainView: { height: Matrics.vs60, backgroundColor: Colors.GRAY, alignItems: "center", paddingHorizontal: Matrics.hs20, flexDirection: "row" },
    textStyle: { fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms22, color: Colors.LIGHTBLACK, paddingHorizontal: Matrics.hs15 }
})