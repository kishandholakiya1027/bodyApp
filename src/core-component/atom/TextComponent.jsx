import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Matrics } from '../../theme'

const TextComponent = ({ color, size, fontFamily, children, marginTop, paddingHorizontal = Matrics.hs20, textDecorationLine = "none", textAlign = "left" }) => {
    return (
        <View style={[styles.textView, { marginTop, paddingHorizontal }]}>
            <Text style={{ fontFamily: fontFamily, color, fontSize: size, textDecorationLine, textAlign }}>{children}</Text>
        </View>
    )
}

export default TextComponent

const styles = StyleSheet.create({
    textView: { paddingHorizontal: Matrics.hs20, marginTop: Matrics.ms27 }
})