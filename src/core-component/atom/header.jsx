import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Images, Matrics } from '../../theme'
const Header = () => {
    return (
        <View style={styles.mainView}>
            <Image source={Images.arrow} style={{ width: Matrics.ms13, height: Matrics.ms27 }} />
        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    mainView: { height: Matrics.vs50, backgroundColor: Colors.GRAY, justifyContent: "center", paddingHorizontal: Matrics.hs15 }
})