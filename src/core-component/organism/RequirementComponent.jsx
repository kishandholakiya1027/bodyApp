import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, Images, Matrics } from '../../theme';
import TextComponent from '../atom/TextComponent';
import { getRubikFont } from '../../core-utils/utils';
import DropdownComponent from '../atom/DropdownComponent';
import TextInputComponent from '../atom/TextInputComponent';
import ImagePlaceHolderComponent from '../atom/imagePlaceHolderComponent';
import { IMAGE_URL } from '../../../config';
import ImageSelectorComponent from '../atom/ImageSelectorComponent';

const RequirementComponent = ({ data, requirementData, setRequirementData, images }) => {
    const [visible, setVisible] = useState(false)

    const purposeOfConsultation = [
        {
            label: "Create Unique Looks",
            value: "Create Unique Looks"
        },
        {
            label: "Refresh Wardrobe",
            value: "Refresh Wardrobe"
        },
        {
            label: "Reuse/ Mix & Match",
            value: "Reuse/ Mix & Match"
        },
        {
            label: "Shopping Assistance",
            value: "Shopping Assistance"
        },
        {
            label: "Custom Designs",
            value: "Custom Designs"
        },
    ]
    const style = [
        {label:"Ethnic",value:"Ethnic"},
        {label:"Western",value:"Western"},
        {label:"Indo-western",value:"Indo-western"},
        {label:"Athleisure",value:"Athleisure"},
        {label:"Boho",value:"Boho"},
        {label:"Grunge",value:"Grunge"},
        {label:"Preppy",value:"Preppy"},
        {label:"Punk",value:"Punk"},
        {label:"Streetwear",value:"Streetwear"},
        {label:"Classic",value:"Classic"},
        {label:"Retro",value:"Retro"},
    ]
    const occasion = [
        { label: "Casual outing", value: "Casual outing" },
        { label: "Business events", value: "Business events" },
        { label: "Weddings", value: "Weddings" },
        { label: "Evening Parties", value: "Evening Parties" },
        { label: "Festival", value: "Festival" },
        { label: "others", value: "others" }
    ]

    return (<View style={{
        marginVertical: Matrics.vs15
    }}>

        <View style={{
            marginBottom: Matrics.vs20
        }}>
            <DropdownComponent items={purposeOfConsultation} setValue={value => setRequirementData({
                ...requirementData,
                consultation: value
            })} value={requirementData?.consultation} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Purpose of Consultation"} />

        </View>
        <View style={{
            marginBottom: Matrics.vs20
        }}>
            <DropdownComponent items={style} setValue={value => setRequirementData({
                ...requirementData,
                style: value
            })} value={requirementData?.style} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Preferred Look/ Style"} />

        </View>
        <View style={{
            marginBottom: Matrics.vs20
        }}>
            <DropdownComponent items={occasion} setValue={value => setRequirementData({
                ...requirementData,
                occassion: value
            })} value={requirementData?.occassion} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Occassion"} />

        </View>
        <View style={{
            marginBottom: Matrics.vs5
        }}>
            <View style={{ position: "relative" }}>
                <TextInputComponent placeholder={"Add a brief about your requirement"} multiline onChangeText={text => setRequirementData({
                    ...requirementData,
                    description: text
                })} value={requirementData?.description?.toString()} />
                <Pressable style={{ position: "absolute", right: 10, top: 10 }} onPress={() => setVisible(true)}>
                    <Image source={Images.attachfile} style={{ width: Matrics.ms24, height: Matrics.ms24 }} />
                </Pressable>

            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {requirementData?.images?.map(img => {
                    return (
                        <View style={{ marginRight: Matrics.hs15 }}>

                            <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs15} setImage={(image) => setRequirementData({ ...requirementData, images: image })} image={img?.uri || `${IMAGE_URL}${img}`} disabled={true} borderColor={Colors.MEDIUMREDOPACITY} />
                        </View>
                    )
                })}

            </View>
        </View>

        <TextInputComponent placeholder={"Budget for the suggested outfits (In INR)"} onChangeText={text => setRequirementData({
            ...requirementData,
            budget: text
        })} value={requirementData?.budget?.toString()}
            keyboardType={"numeric"} />
        <ImageSelectorComponent
            visible={visible}
            onDecline={() => setVisible(false)}
            imgurl={() => { }}
            imgName={() => { }}
            imageName={(image) => setRequirementData({ ...requirementData, images: image, new: true })}
            multiple={true}
        />
    </View>);
}

export default RequirementComponent

const styles = StyleSheet.create({})