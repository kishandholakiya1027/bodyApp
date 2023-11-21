import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme'
import { getRubikFont } from '../../core-utils/utils'

const CommonButton = ({ onPress, textStyle = {}, viewStyle = {}, text,enabled }) => {
    return (
        <View style={{}}>
            <Pressable style={[styles.buttonView, viewStyle, { paddingHorizontal: Matrics.hs10,backgroundColor:enabled?Colors.BLUE:Colors.WHITE }]} onPress={onPress}>
                <Text style={[styles.textStyle, textStyle,{color:!enabled?Colors.BLUE:Colors.WHITE}]}>{text}</Text>
            </Pressable>

        </View>
    )
}

export default CommonButton

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, width: "100%", fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, textAlign: "center" },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs20,paddingVertical:Matrics.vs5, minHeight: Matrics.ms50, alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%" },
})