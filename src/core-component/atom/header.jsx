import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Images, Matrics } from '../../theme'
import { getRobotoFont, getRubikFont } from '../../core-utils/utils'
const Header = ({ text, backgroundColor, backArrow, onBackArrow, text1 }) => {
    return (
        <View style={[styles.mainView, { backgroundColor: backgroundColor ? backgroundColor : Colors.GRAY }]}>
            <Pressable onPress={() => onBackArrow ? onBackArrow() : {}}>
                <Image source={Images.arrow} style={{ width: Matrics.ms13, height: Matrics.ms27, tintColor: backArrow ? backArrow : Colors.DARKGRAY }} />

            </Pressable>
            <View style={{ marginLeft: Matrics.vs10 }}>
                {text1 ? <Text style={styles.text1Style}>{text1}</Text> : null}
                {text ? <Text style={styles.textStyle}>{text}</Text> : null}

            </View>
        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    mainView: { height: Matrics.vs60, backgroundColor: Colors.GRAY, alignItems: "center", paddingHorizontal: Matrics.hs20, flexDirection: "row" },
    textStyle: { fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms22, color: Colors.LIGHTBLACK, paddingHorizontal: Matrics.hs15 },
    text1Style: { fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms14, color: Colors.LIGHTGRAY, paddingHorizontal: Matrics.hs15 }
})