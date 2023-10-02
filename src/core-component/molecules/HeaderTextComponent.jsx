
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../atom/header'
import { getRobotoFont } from '../../core-utils/utils'
import { Colors, Matrics } from '../../theme'
import TextComponent from '../atom/TextComponent'

const HeaderTextComponent = () => {
    return (
        <View>
            <Header />
            <TextComponent fontFamily={getRobotoFont("Medium")} size={Matrics.ms23} color={Colors.DARKGRAY}  >Update your profile to help ourassociates serve you better.</TextComponent>

        </View>
    )
}

export default HeaderTextComponent

const styles = StyleSheet.create({})