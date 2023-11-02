import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme'
import { getRubikFont } from '../../core-utils/utils'

const CommonButton = ({ onPress, textStyle = {}, viewStyle = {}, text }) => {
    return (
        <View style={{}}>
            <Pressable style={[styles.buttonView, viewStyle, { paddingHorizontal: Matrics.hs10 }]} onPress={onPress}>
                <Text style={[styles.textStyle, textStyle]}>{text}</Text>
            </Pressable>

        </View>
    )
}

export default CommonButton

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, width: "100%", fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, textAlign: "center" },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs20,paddingVertical:Matrics.vs5, minHeight: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%" },
})