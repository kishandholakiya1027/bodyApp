import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme'
import { getRobotoFont } from '../../core-utils/utils'

const TextInputComponent = ({ value, secureTextEntry, placeholderTextColor, onChangeText, placeholder, keyboardType, error }) => {
    return (
        <View style={{ marginBottom: Matrics.vs15, }}>
            <View style={[styles.inputView, { borderColor: error ? Colors.RED : Colors.DARKGRAY }]}>
                <TextInput
                    value={value}
                    placeholderTextColor={Colors.LIGHTGRAY}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    style={styles.textStyle}
                    secureTextEntry={secureTextEntry}
                />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

        </View>
    )
}

export default TextInputComponent

const styles = StyleSheet.create({
    inputView: { borderWidth: Matrics.ms1, borderColor: Colors.DARKGRAY, height: Matrics.vs50, justifyContent: "center", paddingHorizontal: Matrics.hs15 },
    textStyle: { color: Colors.DARKGRAY, fontSize: Matrics.ms20, fontFamily: getRobotoFont() },
    errorText: { color: Colors.RED, marginTop: Matrics.vs5, fontFamily: getRobotoFont() }
})