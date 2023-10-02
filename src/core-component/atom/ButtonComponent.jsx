import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme'
import { getRobotoFont } from '../../core-utils/utils'

const ButtonComponent = ({ text }) => {
    return (
        <View>
            <View style={styles.buttonView}>
                <Text style={styles.textStyle}>{text}</Text>
            </View>

        </View>
    )
}

export default ButtonComponent

const styles = StyleSheet.create({
    textStyle: { color: Colors.DARKGRAY, fontFamily: getRobotoFont("Bold"), fontSize: Matrics.ms20 },
    buttonView: { backgroundColor: Colors.MEDIUMGRAY, width: Matrics.hs160, height: Matrics.vs50, borderRadius: Matrics.ms30, alignItems: "center", justifyContent: "center" }
})