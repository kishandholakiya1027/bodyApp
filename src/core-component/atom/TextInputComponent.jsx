import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme'
import { IS_IOS, getRobotoFont, getRubikFont } from '../../core-utils/utils'

const TextInputComponent = ({ marginBottom = Matrics.vs15, value, multiline = false, secureTextEntry, placeholderTextColor, onChangeText, placeholder, keyboardType, error, height = Matrics.ms50 }) => {
    return (
        <View style={{ marginBottom }}>
            <View style={[styles.inputView, { borderColor: error ? Colors.RED : value ? Colors.BLUE:Colors.LIGHTGRAY, height, justifyContent: multiline ? "flex-start" : "center" }]}>
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
    inputView: { borderWidth: Matrics.ms1, height: Matrics.ms50, paddingHorizontal: Matrics.hs15, justifyContent: "center" },

    textStyle: { color: Colors.LIGHTGRAY, fontSize: Matrics.ms18, fontFamily: getRubikFont("Regular"), paddingVertical: 0, marginVertical: Matrics.vs5 },
    errorText: { color: Colors.RED, fontSize: Matrics.ms16, marginTop: Matrics.vs5, fontFamily: getRubikFont() }
})