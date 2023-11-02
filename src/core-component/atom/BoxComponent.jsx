import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Images, Matrics } from '../../theme'
import { getRobotoFont, getRubikFont } from '../../core-utils/utils';
const { width, height } = Dimensions.get('window');

const BoxComponent = ({ width, height, type, onPress, value ,image,color}) => {
    let style = image ? {}:{width:width-10,height:height-10,backgroundColor:color}
    return (
        <Pressable onPress={() => onPress(type?.toLowerCase())}>
            <View style={{borderWidth: value === type?.toLowerCase() ? 1 : 0,borderColor:Colors.MEDIUMRED,}}>
            <View style={[styles.boxView, style,{margin:5}]}></View>
           {image ? <View style={{justifyContent:"center",width:"100%",alignItems:"center",}}>

            <Image source={image} style={{width:width,height:height-10,resizeMode:"contain"}}/>
            </View>:null}
            </View>
            {type ? <Text style={styles.textStyle}>{type}</Text> : null}

        </Pressable>
    )
}

export default BoxComponent

const styles = StyleSheet.create({
    boxView: { backgroundColor: Colors.MEDIUMGRAY ,alignItems:"center"},
    textStyle: { fontFamily: getRubikFont(), fontSize: Matrics.ms14, color: Colors.LIGHTBLACK, textAlign: "center", marginTop: Matrics.vs15 }
})