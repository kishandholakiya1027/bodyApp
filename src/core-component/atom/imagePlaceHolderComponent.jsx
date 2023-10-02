import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Matrics } from '../../theme'
import { getRobotoFont } from '../../core-utils/utils'
import ImageSelectorComponent from './ImageSelectorComponent'

const ImagePlaceHolderComponent = () => {
    const [visible, setVisible] = useState(false)
    return (
        <View style={styles.mainViw}>
            <Pressable onPress={() => setVisible(true)}>
                <View style={styles.imageView} >
                    <Text style={styles.textStyle}>Upload your profile picture</Text>
                </View>

            </Pressable>
            <ImageSelectorComponent
                visible={visible}
                onDecline={() => setVisible(false)}
                imgurl={() => { }}
                imgName={() => { }}
                imageName={(image) => { }}
            />
        </View>
    )
}

export default ImagePlaceHolderComponent

const styles = StyleSheet.create({
    mainViw: { justifyContent: "center", width: "100%", alignItems: "center", marginVertical: Matrics.vs40 },
    imageView: { borderWidth: Matrics.ms1, borderColor: Colors.DARKGRAY, height: Matrics.ms241, width: Matrics.ms241, borderRadius: Matrics.ms120, alignItems: "center", justifyContent: "center" },
    textStyle: { color: Colors.LIGHTGRAY, fontSize: Matrics.ms20, paddingHorizontal: Matrics.hs50, textAlign: "center", fontFamily: getRobotoFont() }
})