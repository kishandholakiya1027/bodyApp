import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { getRobotoFont, getRubikFont } from '../../core-utils/utils';
import { Colors, Images, Matrics } from '../../theme';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = ({ setOpen, open, value, setValue, items = [], backgroundColor = Colors.MEDIUMGRAY, color = Colors.DARKGRAY, borderWidth = 0, placeholder }) => {

    return (
        <View style={styles.dropdownCompany}>

            {/* <Pressable onPress={() => setOpen(!open)} style={{ borderWidth: 1, borderColor: Colors.DARKGRAY, height: Matrics.vs45, justifyContent: "center", paddingLeft: Matrics.hs15 }}>
                <Text style={{ fontFamily: getRobotoFont(), color: Colors.DARKGRAY, fontSize: Matrics.ms15 }}>Select</Text>
            </Pressable> */}
            <Dropdown
                style={[styles.dropdown, { backgroundColor, borderWidth ,borderColor:value? Colors.BLUE:Colors.LIGHTGRAY}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemContainerStyle={{ backgroundColor, color }}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{ color: Colors.DARKGRAY }}
                iconStyle={styles.iconStyle}
                data={items}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={placeholder || 'Select item'}
                searchPlaceholder="Search..."
                value={value}
                renderRightIcon={() => (
                   value ? <Image source={Images.dropdownarrow} style={{width:Matrics.vs17,height:Matrics.vs16}}/>:null
                  )}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    // setIsFocus(false);
                }}

            //   renderLeftIcon={() => (
            //     // <AntDesign
            //     //   style={styles.icon}
            //     //   color={isFocus ? 'blue' : 'black'}
            //     //   name="Safety"
            //     //   size={20}
            //     // />
            //   )}
            />
            {/* <View style={styles.menuHeader}>
                <View style={{ zIndex: 999 }}>
                    {items?.map((item) => {
                        // return <View style={{ height: Matrics.vs40, justifyContent: "center", paddingLeft: Matrics.hs15, borderBottomWidth: 0.5, borderBottomColor: Colors.MEDIUMGRAY }}>
                        return <View style={styles.headerItem}>
                            <Text style={{ fontFamily: getRobotoFont(), color: Colors.DARKGRAY, fontSize: Matrics.ms15 }}>{item?.label}</Text>
                        </View>
                    })}

                </View>
            </View> */}

        </View>
    )
}

export default DropdownComponent

const styles = StyleSheet.create({
    dropdownCompany: {
        backgroundColor: '#C4C4C4',

        width: "100%"
    },
    menuHeader: { backgroundColor: Colors.WHITE, paddingHorizontal: Matrics.ms15, top: Matrics.hs15, borderWidth: 1, borderColor: Colors.LIGHTGRAY, left: Matrics.vs0, paddingVertical: Matrics.vs10, zIndex: 1, shadowColor: Colors.SHADOWCOLOR, shadowOffset: { height: 2, width: 5 }, shadowColor: Colors.LIGHTGRAY, shadowOpacity: 0.4, borderRadius: Matrics.ms4, elevation: 10, shadowRadius: Matrics.ms7, width: "90%" },
    headerItem: { paddingVertical: Matrics.vs10, flexDirection: "row", zIndex: 999, alignItems: "center", justifyContent: "space-between" },
    container: {
        backgroundColor: '#C4C4C4',
        padding: 16,
    },
    dropdown: {
        height: 55,
        borderColor: Colors.LIGHTGRAY,
        borderRadius: 0,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: Colors.LIGHTGRAY,
        // backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 18,
        fontFamily: getRubikFont("Regular"),
        color: Colors.LIGHTGRAY,
        paddingHorizontal: Matrics.hs10
    },
    selectedTextStyle: {
        fontSize: 18,
        fontFamily: getRubikFont("Regular"),
        color: Colors.LIGHTGRAY,
        paddingHorizontal: Matrics.hs10


    },
    iconStyle: {
        width: 20,
        height: 20,
        color:Colors.BLUE,
        tintColor:Colors.BLUE
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

})