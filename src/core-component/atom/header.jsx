import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Images, Matrics } from '../../theme'
import { getRobotoFont, getRubikFont } from '../../core-utils/utils'
const Header = ({ text, backgroundColor, backArrow, onBackArrow, text1,rightImage1 ,rightImage2}) => {
    return (
        <View style={[styles.mainView, { backgroundColor: backgroundColor ? backgroundColor : Colors.GRAY }]}>
            <Pressable style={{flex:0.05,}}  onPress={() => onBackArrow ? onBackArrow() : {}}>
                <Image source={Images.arrow} style={{ width: Matrics.ms13, height: Matrics.ms27, tintColor: backArrow ? backArrow : Colors.DARKGRAY }} />

            </Pressable>
            <View style={{flex:rightImage1 || rightImage2 ? 0.80:1.8, marginLeft: Matrics.vs10,}}>
                {text1 ? <Text style={styles.text1Style}>{text1}</Text> : null}
                {text ? <Text style={styles.textStyle}>{text}</Text> : null}

            </View>
           { rightImage1 || rightImage2 ? <View style={{flex:0.20,flexDirection:"row"}}>
          {rightImage1?  <View style={{ marginLeft: Matrics.vs10 }}>
                {rightImage1}
                {/* <Image source={rightImage1} style={{ width: Matrics.ms25, height: Matrics.ms25, tintColor: backArrow ? backArrow : Colors.DARKGRAY }} /> */}

            </View>:null}
          {rightImage2?  <View style={{ marginLeft: Matrics.vs10 }}>
          {rightImage2}
                
                {/* <Image source={rightImage2} style={{ width: Matrics.ms25, height: Matrics.ms25, tintColor: backArrow ? backArrow : Colors.DARKGRAY }} /> */}

            </View>:null}

            </View>:null}
        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    mainView: { height: Matrics.ms60, backgroundColor: Colors.GRAY, alignItems: "center", paddingHorizontal: Matrics.hs20, flexDirection: "row" },
    textStyle: { fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms22, color: Colors.LIGHTBLACK, paddingHorizontal: Matrics.hs15 },
    text1Style: { fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms14, color: Colors.LIGHTGRAY, paddingHorizontal: Matrics.hs15 }
})