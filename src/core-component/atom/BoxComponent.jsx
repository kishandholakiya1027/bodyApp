import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme'
import { getRobotoFont } from '../../core-utils/utils';
const { width, height } = Dimensions.get('window');

const BoxComponent = ({ width, height, type, onPress, value }) => {
    console.log("🚀 ~ file: BoxComponent.jsx:7 ~ BoxComponent ~ type:", type)
    return (
        <Pressable onPress={() => onPress(type?.toLowerCase())}>
            <View style={[styles.boxView, { width, height, opacity: value === type?.toLowerCase() ? 1 : 0.5 }]}></View>
            {type ? <Text style={styles.textStyle}>{type}</Text> : null}
        </Pressable>
    )
}

export default BoxComponent

const styles = StyleSheet.create({
    boxView: { backgroundColor: Colors.MEDIUMGRAY },
    textStyle: { fontFamily: getRobotoFont(), fontSize: Matrics.ms16, color: Colors.DARKGRAY, textAlign: "center", marginTop: Matrics.vs15 }
})