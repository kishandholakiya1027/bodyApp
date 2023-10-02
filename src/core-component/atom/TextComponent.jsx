import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Matrics } from '../../theme'

const TextComponent = ({ color, size, fontFamily, children }) => {
    return (
        <View style={styles.textView}>
            <Text style={{ fontFamily: fontFamily, color, fontSize: size }}>{children}</Text>
        </View>
    )
}

export default TextComponent

const styles = StyleSheet.create({
    textView: { paddingHorizontal: Matrics.hs15, marginTop: Matrics.ms27 }
})