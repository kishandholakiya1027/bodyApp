import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Matrics } from '../../theme';
import TextComponent from '../atom/TextComponent';
import { getRubikFont } from '../../core-utils/utils';
import DropdownComponent from '../atom/DropdownComponent';
import TextInputComponent from '../atom/TextInputComponent';
import ImagePlaceHolderComponent from '../atom/imagePlaceHolderComponent';

const RequirementComponent = ({ data, requirementData, setRequirementData, images }) => {
    return (<View style={{
        marginVertical: Matrics.vs15
    }}>

        <View style={{
            marginBottom: Matrics.vs20
        }}>
            <DropdownComponent items={data} setValue={value => setRequirementData({
                ...requirementData,
                qualification: value
            })} value={requirementData?.qualification} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Purpose of Consultation"} />

        </View>
        <View style={{
            marginBottom: Matrics.vs20
        }}>
            <DropdownComponent items={data} setValue={value => setRequirementData({
                ...requirementData,
                qualification: value
            })} value={requirementData?.qualification} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Preferred Look/ Style"} />

        </View>
        <View style={{
            marginBottom: Matrics.vs20
        }}>
            <DropdownComponent items={data} setValue={value => setRequirementData({
                ...requirementData,
                qualification: value
            })} value={requirementData?.qualification} backgroundColor={Colors.WHITE} borderWidth={1} placeholder={"Occassion"} />

        </View>
        <View style={{
            marginBottom: Matrics.vs5
        }}>
            <TextInputComponent placeholder={"Add a brief about your requirement"} onChangeText={text => setRequirementData({
                ...requirementData,
                username: text
            })} value={requirementData?.username?.toString()} />
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {images?.map(img => {
                    console.log("🚀 ~ file: RequirementComponent.jsx:51 ~ RequirementComponent ~ img:", img)
                    return (
                        <View style={{ marginRight: Matrics.hs15 }}>

                            <ImagePlaceHolderComponent size={Matrics.ms80} borderRadius={Matrics.ms0} padding={Matrics.hs10} marginVertical={Matrics.vs15} setImage={(image) => setImage(image)} image={img?.uri} disabled={true} borderColor={Colors.MEDIUMREDOPACITY} />
                        </View>
                    )
                })}

            </View>
        </View>

        <TextInputComponent placeholder={"Budget for the suggested outfits (In INR)"} onChangeText={text => setRequirementData({
            ...requirementData,
            username: text
        })} value={requirementData?.username?.toString()} />

    </View>);
}

export default RequirementComponent

const styles = StyleSheet.create({})