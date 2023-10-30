import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextComponent from '../atom/TextComponent';
import { getRubikFont } from '../../core-utils/utils';


function TitleComponent({ open, setOpen, title }) {
    return (<View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: Matrics.vs5,
        borderBottomWidth: 1,
        borderColor: Colors.LIGHTGRAY
    }}>
        <TextComponent fontFamily={getRubikFont("Medium")} paddingHorizontal={0} size={Matrics.ms20} color={Colors.BLUE} marginTop={Matrics.vs0}>{title}</TextComponent>
        <Pressable onPress={() => setOpen(!open)}>
            <Image source={Images.downArrow} style={{
                width: Matrics.ms19,
                height: Matrics.ms29,
                resizeMode: "contain",
                tintColor: Colors.BLUE,
                transform: [{
                    rotate: open ? '180deg' : '0deg'
                }]
            }} />
        </Pressable>
    </View>);
}
const CheckBoxComponent = ({ open, setOpen, filter, setFilter, data, title, component, keyName }) => {
    console.log("🚀 ~ file: AllUsers.jsx:45 ~ CheckBoxComponent ~ filter:", filter, keyName)
    return (
        <View style={{ marginTop: Matrics.vs20 }}>
            <View>
                <TitleComponent open={open} setOpen={setOpen} title={title} />
                {open ? <View style={{ marginVertical: Matrics.vs10 }}>

                    {data?.map(item => {
                        return <View style={{ marginVertical: Matrics.vs10 }}>
                            {
                                /* <TextComponent fontFamily={getRubikFont("Regular")} paddingHorizontal={0} size={Matrics.ms18} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{item}</TextComponent> */
                            }
                            <CheckBox
                                disabled={false}
                                leftTextStyle={{ color: component ? Colors.MEDIUMRED : Colors.LIGHTBLACK, fontFamily: getRubikFont("regular"), fontSize: Matrics.ms18 }}
                                leftText={item?.label}
                                isChecked={filter?.[keyName]?.includes(item?.value)}
                                checkBoxColor={Colors.BLUE}
                                checkedCheckBoxColor={Colors.BLUE}
                                onClick={newValue => setFilter({
                                    ...filter,
                                    [keyName]: filter?.[keyName]?.includes(item?.value) ? filter?.[keyName]?.filter(item => item != item?.value) : [...filter?.[keyName] || [], item?.value]
                                })} />
                        </View>;
                    })}
                </View> : null}
            </View>
        </View>);
}


export default CheckBoxComponent

const styles = StyleSheet.create({})