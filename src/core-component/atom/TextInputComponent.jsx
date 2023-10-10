import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme'
import { IS_IOS, getRobotoFont, getRubikFont } from '../../core-utils/utils'

const TextInputComponent = ({ value, multiline = false, secureTextEntry, placeholderTextColor, onChangeText, placeholder, keyboardType, error, height = Matrics.vs50 }) => {
    console.log("🚀 ~ file: TextInputComponent.jsx:7 ~ TextInputComponent ~ value:", value)
    return (
        <View style={{ marginBottom: Matrics.vs15 }}>
            <View style={[styles.inputView, { borderColor: error ? Colors.RED : Colors.LIGHTGRAY, height }]}>
                <TextInput
                    value={value}
                    placeholderTextColor={Colors.LIGHTGRAY}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    style={styles.textStyle}
                    secureTextEntry={secureTextEntry}
                    multiline={multiline}
                />
                {/* <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder="useless placeholder"
                    keyboardType="numeric"
                /> */}
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

        </View>
    )
}

export default TextInputComponent

const styles = StyleSheet.create({
    inputView: { borderWidth: Matrics.ms1, height: Matrics.vs50, paddingTop: IS_IOS ? Matrics.hs13 : Matrics.ms0, paddingHorizontal: Matrics.hs15 },

    textStyle: { color: Colors.LIGHTGRAY, fontSize: Matrics.ms18, fontFamily: getRubikFont("Regular") },
    errorText: { color: Colors.RED, fontSize: Matrics.ms16, marginTop: Matrics.vs5, fontFamily: getRubikFont() }
})