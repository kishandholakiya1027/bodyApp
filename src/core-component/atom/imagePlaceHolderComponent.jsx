import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Matrics } from '../../theme'
import { getRobotoFont, getRubikFont } from '../../core-utils/utils'
import ImageSelectorComponent from './ImageSelectorComponent'

const ImagePlaceHolderComponent = ({ size = Matrics.ms241, borderRadius = Matrics.ms120, padding = Matrics.hs50, marginVertical = Matrics.vs40, setImage, image, borderColor = Colors.DARKGRAY, multiple, backgroundColor = "none" }) => {
    console.log("🚀 ~ file: imagePlaceHolderComponent.jsx:8 ~ ImagePlaceHolderComponent ~ image:", image)
    const [visible, setVisible] = useState(false)
    const [imageUrl, setImageUrl] = useState()
    console.log("🚀 ~ file: imagePlaceHolderComponent.jsx:10 ~ ImagePlaceHolderComponent ~ imageUrl:", imageUrl)
    return (
        <View style={[styles.mainViw, { marginVertical }]}>
            <Pressable onPress={() => setVisible(true)}>
                <View style={[styles.imageView, { width: size, height: size, borderRadius, borderColor, backgroundColor }]} >
                    {imageUrl || image ? <Image style={[styles.imageView, { width: size, height: size, borderRadius, borderColor }]} source={{ uri: (imageUrl || image) }} />
                        : <Text style={[styles.textStyle, { paddingHorizontal: padding }]}>Upload your profile picture</Text>}
                </View>

            </Pressable>
            <ImageSelectorComponent
                visible={visible}
                onDecline={() => setVisible(false)}
                imgurl={setImageUrl}
                imgName={() => { }}
                imageName={setImage}
                multiple={multiple}
            />
        </View>
    )
}

export default ImagePlaceHolderComponent

const styles = StyleSheet.create({
    mainViw: { justifyContent: "center", alignItems: "center", marginVertical: Matrics.vs40, },
    imageView: { borderWidth: Matrics.ms1, borderColor: Colors.DARKGRAY, height: Matrics.ms241, width: Matrics.ms241, borderRadius: Matrics.ms120, alignItems: "center", justifyContent: "center" },
    textStyle: { color: Colors.LIGHTGRAY, fontSize: Matrics.ms18, paddingHorizontal: Matrics.hs50, textAlign: "center", fontFamily: getRubikFont("Regular") }
})