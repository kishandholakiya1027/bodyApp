import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme'
import { getRobotoFont } from '../../core-utils/utils'

const ButtonComponent = ({ text, onPress }) => {
    return (
        <View>
            <Pressable style={styles.buttonView} onPress={onPress}>
                <Text style={styles.textStyle}>{text}</Text>
            </Pressable>

        </View>
    )
}

export default ButtonComponent

const styles = StyleSheet.create({
    textStyle: { color: Colors.DARKGRAY, fontFamily: getRobotoFont("Bold"), fontSize: Matrics.ms20 },
    buttonView: { backgroundColor: Colors.MEDIUMGRAY, width: Matrics.hs160, height: Matrics.vs50, borderRadius: Matrics.ms30, alignItems: "center", justifyContent: "center" }
})