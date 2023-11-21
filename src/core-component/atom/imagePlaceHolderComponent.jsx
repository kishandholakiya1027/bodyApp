import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Images, Matrics } from '../../theme'
import { getRobotoFont, getRubikFont } from '../../core-utils/utils'
import ImageSelectorComponent from './ImageSelectorComponent'

const ImagePlaceHolderComponent = ({ onPress, plus = false, size = Matrics.ms160, borderRadius = Matrics.ms120, padding = Matrics.hs50, marginVertical = Matrics.vs40, setImage, image, borderColor = Colors.LIGHTGRAY, multiple, backgroundColor = "none", disabled }) => {
    const [visible, setVisible] = useState(false)
    const [imageUrl, setImageUrl] = useState()
    return (
        <View style={[styles.mainViw, { marginVertical }]}>
            <Pressable hitSlop={30} onPress={() => onPress ? onPress() : setVisible(true)} disabled>
                <Pressable onPress={() => onPress ? onPress() : setVisible(true)} style={[styles.imageView, { width: size, height: size, borderRadius: borderRadius, borderColor, backgroundColor }]} >
                    {imageUrl || image ? <Image style={[styles.imageView, { width: size, height:size, borderRadius:borderRadius, borderColor }]} source={{ uri: (imageUrl || image) }} />
                        : disabled ? null : <Text style={[styles.textStyle, { paddingHorizontal: padding }]}>Upload your profile picture</Text>}
                    {plus ? <Pressable hitSlop={30} onPress={() => onPress ? onPress() : setVisible(true)} style={{ position: "absolute", width: size, height: size, alignItems: "center", justifyContent: "center" }}>
                        <Image source={Images.close} style={{ width: size/3, height: size/3, tintColor: Colors.LIGHTBLACK, transform: [{ rotate: "45deg" }], tintColor: Colors.BLUE, resizeMode: "contain" }} />

                    </Pressable> : null}
                </Pressable>

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
    textStyle: { color: Colors.LIGHTGRAY, fontSize: Matrics.ms18, paddingHorizontal: Matrics.hs20, textAlign: "center", fontFamily: getRubikFont("Regular") }
})