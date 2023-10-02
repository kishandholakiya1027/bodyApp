import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme'
import { getRobotoFont } from '../../core-utils/utils'

const TextInputComponent = ({ value, placeholderTextColor, onChangeText, placeholder, keyboardType }) => {
    return (
        <View style={styles.inputView}>
            <TextInput
                value={value}
                placeholderTextColor={Colors.LIGHTGRAY}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                style={styles.textStyle}
            />
        </View>
    )
}

export default TextInputComponent

const styles = StyleSheet.create({
    inputView: { borderWidth: Matrics.ms1, borderColor: Colors.DARKGRAY, height: Matrics.vs50, marginBottom: Matrics.vs15, justifyContent: "center", paddingHorizontal: Matrics.hs15 },
    textStyle: { color: Colors.LIGHTGRAY, fontSize: Matrics.ms20, fontFamily: getRobotoFont() }
})