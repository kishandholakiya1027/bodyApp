import { Dimensions, FlatList, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { IS_ANDROID, getRobotoFont, getRubikFont } from '../../core-utils/utils'
import HeaderTextComponent from '../../core-component/molecules/HeaderTextComponent'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import { Colors, Images, Matrics } from '../../theme'
import ButtonComponent from '../../core-component/atom/ButtonComponent'
import BoxComponent from '../../core-component/atom/BoxComponent'
import TextComponent from '../../core-component/atom/TextComponent'
import Header from '../../core-component/atom/header'
import DropdownComponent from '../../core-component/atom/DropdownComponent'
import { IMAGE_URL } from '../../../config'

const { width, height } = Dimensions.get('window');

const UserProfile = () => {
    const [index, setIndex] = useState(0)
    const [height, setHeight] = useState({})
    // const [heightFeetOpen, setHeightFeetOpen] = useState({})
    // const [heightInchOpen, setHeightInchOpen] = useState({})
    const [bustSize, setBustSize] = useState({})
    // const [bustSizeOpen, setbustSizeOpen] = useState({})
    // const [bustSizOpen, setbustSizOpen] = useState({})
    const [waistSize, setWaistSize] = useState()
    // const [waistSizeOpen, setWaistSizeOpen] = useState()
    const [hipSize, setHipSize] = useState()
    const [userData, setUserData] = useState({})
    console.log("🚀 ~ file: UserProfile.jsx:27 ~ UserProfile ~ userData:", userData)
    // const [hipSizeOpen, setHipSizeOpen] = useState()

    const usersData = [
        { key: "age", label: "Age", value: 32 },
        { key: "gender", label: "Gender", value: "Female" },
        { key: "body_type", label: "Body type", value: "Pear" },
        { key: "face_type", label: "Face type", value: "Pear" },
        { key: "complexion", label: "Complexion", value: "Pear" },
        { key: "hair_length", label: "Hair", value: "Pear" },
        { key: "height", label: "Height", value: "Pear" },
        { key: "waist_size", label: "Waist", value: "Pear" },
        { key: "bust_size", label: "Bust", value: "Pear" },
        { key: "hip_bust", label: "Hip", value: "Pear" },
    ]

    const hightFeet = [
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "7", value: "7" },
        { label: "8", value: "8" },
    ]
    const hightInch = [
        { label: "0", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "7", value: "7" },
        { label: "8", value: "8" },
        { label: "9", value: "9" },
    ]


    const bustSizeInches = [
        { label: "23", value: "23" },
        { label: "24", value: "24" },
        { label: "25", value: "25" },
        { label: "26", value: "26" },
        { label: "27", value: "27" },
        { label: "28", value: "28" },
        { label: "29", value: "29" },
        { label: "30", value: "30" },
        { label: "31", value: "31" },
        { label: "32", value: "32" },
        { label: "33", value: "33" },
        { label: "34", value: "34" },
        { label: "35", value: "35" },
        { label: "36", value: "36" },
        { label: "37", value: "37" },
        { label: "38", value: "38" },
        { label: "39", value: "39" },
        { label: "40", value: "40" },
        { label: "41", value: "41" },
        { label: "42", value: "42" },
        { label: "43", value: "43" },
        { label: "44", value: "44" },
        { label: "45", value: "45" },
        { label: "46", value: "46" },
        { label: "47", value: "47" },
        { label: "48", value: "48" },
        { label: "49", value: "49" },
    ]

    const bustSizeAlpha = [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
        { label: "D", value: "D" },
        { label: "E", value: "E" },
        { label: "F", value: "F" },
    ]

    const waistSizes = [
        { label: "24", value: "24" },
        { label: "26", value: "26" },
        { label: "28", value: "28" },
        { label: "30", value: "30" },
        { label: "32", value: "32" },
        { label: "34", value: "34" },
        { label: "36", value: "36" },
    ]

    const hipSizes = [
        { label: "33", value: "33" },
        { label: "35", value: "35" },
        { label: "37", value: "37" },
        { label: "39", value: "39" },
        { label: "41", value: "41" },
        { label: "43", value: "43" },
        { label: "45", value: "45" },
    ]

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                {index !== 5 ? <Header onBackArrow={() => setIndex(index === 1 ? 0 : index === 2 ? 1 : index === 3 ? 2 : index === 4 ? 3 : 0)} /> : null}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>
                        {index !== 5 ? <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms23} color={Colors.DARKGRAY} marginTop={Matrics.vs15} >Update your profile to help ourassociates serve you better.</TextComponent> : null}

                        <View style={{ paddingHorizontal: Matrics.hs20, flex: 1 }}>
                            {index === 0 ? <View>
                                <View >
                                    <ImagePlaceHolderComponent setImage={(image) => setUserData({ ...userData, profile_img: image })} image={userData?.profile_img ? `${IMAGE_URL}${userData?.profile_img?.uri || userData?.profile_img}` : ""} />
                                    <View>
                                        <TextInputComponent placeholder={"Username"} onChangeText={(text) => setUserData({ ...userData, username: text })} value={userData?.username} />
                                    </View>
                                    <View>
                                        <TextInputComponent placeholder={"Age"} onChangeText={(text) => setUserData({ ...userData, age: text })} value={userData?.age} keyboardType={"numeric"} />
                                    </View>
                                    <View>
                                        <TextInputComponent placeholder={"Gender"} onChangeText={(text) => setUserData({ ...userData, gender: text })} value={userData?.gender} />
                                    </View>
                                </View>


                            </View> : index === 1 ?
                                <View style={{ marginVertical: Matrics.vs30 }}>
                                    <View>
                                        <Text style={styles.bodyTypeTextStyle}>Select your body type</Text>
                                    </View>
                                    <View style={{ flexDirection: "column" }}>
                                        <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                            <View style={{ flex: 0.33 }}>
                                                <BoxComponent width={(width - 70) / 3} height={Matrics.vs173} type={"Hour-Glass"} onPress={(type) => setUserData({ ...userData, body_type: type })} value={userData?.body_type} />

                                            </View>
                                            <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                <BoxComponent width={(width - 70) / 3} height={Matrics.vs173} type={"Triangle"} onPress={(type) => setUserData({ ...userData, body_type: type })} value={userData?.body_type} />

                                            </View>
                                            <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                <BoxComponent width={(width - 70) / 3} height={Matrics.vs173} type={"Rectangle"} onPress={(type) => setUserData({ ...userData, body_type: type })} value={userData?.body_type} />

                                            </View>

                                        </View>
                                        <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                            <View style={{ flex: 0.17 }}></View>
                                            <View style={{ flex: 0.33 }}>
                                                <BoxComponent width={(width - 70) / 3} height={Matrics.vs173} type={"Pear"} onPress={(type) => setUserData({ ...userData, body_type: type })} value={userData?.body_type} />

                                            </View>
                                            <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                <BoxComponent width={(width - 70) / 3} height={Matrics.vs173} type={"Apple"} onPress={(type) => setUserData({ ...userData, body_type: type })} value={userData?.body_type} />

                                            </View>
                                            <View style={{ flex: 0.17 }}></View>

                                        </View>

                                    </View>


                                </View> : index === 2 ?
                                    <View style={{ marginVertical: Matrics.vs30 }}>
                                        <View>
                                            <Text style={styles.bodyTypeTextStyle}>Select your face type</Text>
                                        </View>
                                        <View style={{ flexDirection: "column" }}>
                                            <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                                <View style={{ flex: 0.33 }}>
                                                    <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Round"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>
                                                <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                    <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Triangle"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>
                                                <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                    <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Square"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>

                                            </View>
                                            <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                                <View style={{ flex: 0.33 }}>
                                                    <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Oval"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>
                                                <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                    <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Daimond"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>
                                                <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                    <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Oblong"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>

                                            </View>
                                            <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                                <View style={{ flex: 0.33 }}></View>

                                                <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                    <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Heart"} onPress={(type) => setUserData({ ...userData, face_type: type })} value={userData?.face_type} />

                                                </View>
                                                <View style={{ flex: 0.33 }}></View>

                                            </View>

                                        </View>


                                    </View> : index === 3 ?
                                        <View style={{ marginVertical: Matrics.vs30 }}>
                                            <View>
                                                <Text style={styles.bodyTypeTextStyle}>Select your complexion</Text>
                                            </View>
                                            <View style={{ flexDirection: "column" }}>
                                                <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                                    <View style={{ flex: 0.33 }}>
                                                        <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Light"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Fair"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Medium"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>

                                                </View>
                                                <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                                    <View style={{ flex: 0.33 }}>
                                                        <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Olive"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Tan"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Brown"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>

                                                </View>
                                                <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>

                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Dark Brown"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                        <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Black"} onPress={(type) => setUserData({ ...userData, complexion: type })} value={userData?.complexion} />

                                                    </View>
                                                    <View style={{ flex: 0.33 }}></View>

                                                </View>

                                            </View>


                                        </View> : index === 4 ?
                                            <View style={{ marginVertical: Matrics.vs30 }}>
                                                <View>
                                                    <Text style={styles.bodyTypeTextStyle}>Select your hair length</Text>
                                                </View>
                                                <View style={{ flexDirection: "column" }}>
                                                    <View style={{ flexDirection: "row", marginVertical: Matrics.vs15 }}>
                                                        <View style={{ flex: 0.33 }}>
                                                            <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Long"} onPress={(type) => setUserData({ ...userData, hair_length: type })} value={userData?.hair_length} />

                                                        </View>
                                                        <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                            <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Short"} onPress={(type) => setUserData({ ...userData, hair_length: type })} value={userData?.hair_length} />

                                                        </View>
                                                        <View style={{ flex: 0.33, marginLeft: Matrics.hs10 }}>
                                                            <BoxComponent width={(width - 70) / 3} height={Matrics.vs118} type={"Medium"} onPress={(type) => setUserData({ ...userData, hair_length: type })} value={userData?.hair_length} />

                                                        </View>

                                                    </View>


                                                </View>
                                                <View style={{ marginVertical: Matrics.vs15 }}>
                                                    <View>
                                                        <Text style={styles.bodyTypeTextStyle}>Enter your height</Text>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: Matrics.vs10 }}>
                                                            <View style={{ flex: 0.48 }}>
                                                                <DropdownComponent items={hightFeet} setValue={(value) => setUserData({ ...userData, height: [value, userData?.height && userData?.height[1]] })} value={userData?.height && userData?.height[0]} />

                                                            </View>
                                                            <View style={{ flex: 0.48 }}>
                                                                <DropdownComponent items={hightInch} setValue={(value) => setUserData({ ...userData, height: [userData?.height && userData?.height[0], value] })} value={userData?.height && userData?.height[1]} />

                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>
                                                <View style={{ marginVertical: Matrics.vs15 }}>
                                                    <View>
                                                        <Text style={styles.bodyTypeTextStyle}>Select your bust size</Text>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: Matrics.vs10 }}>
                                                            <View style={{ flex: 0.48 }}>
                                                                <DropdownComponent items={bustSizeInches} setValue={(value) => setUserData({ ...userData, bust_size: [value, userData?.bust_size && userData?.bust_size[1]] })} value={userData?.bust_size && userData?.bust_size[0]} />

                                                            </View>
                                                            <View style={{ flex: 0.48 }}>
                                                                <DropdownComponent items={bustSizeAlpha} setValue={(value) => setUserData({ ...userData, bust_size: [userData?.bust_size && userData?.bust_size[0], value] })} value={userData?.bust_size && userData?.bust_size[1]} />

                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>
                                                <View style={{ marginVertical: Matrics.vs15 }}>
                                                    <View>
                                                        <Text style={styles.bodyTypeTextStyle}>Select your waist size</Text>
                                                        <View style={{ marginTop: Matrics.vs10 }}>
                                                            <DropdownComponent items={waistSizes} setValue={(value) => setUserData({ ...userData, waist_size: value })} value={userData?.waist_size} />

                                                        </View>
                                                    </View>

                                                </View>
                                                <View style={{ marginVertical: Matrics.vs15 }}>
                                                    <View>
                                                        <Text style={styles.bodyTypeTextStyle}>Select your hip size</Text>
                                                        <View style={{ marginTop: Matrics.vs10 }}>
                                                            <DropdownComponent items={hipSizes} setValue={(value) => setUserData({ ...userData, hip_size: value })} value={userData?.hip_size} />

                                                        </View>
                                                    </View>

                                                </View>


                                            </View> : null

                            }

                            {
                                index === 5 ?
                                    <View>
                                        <View style={styles.mainView}>
                                            <Image source={Images.close} style={{ width: Matrics.ms26, height: Matrics.ms26 }} />
                                        </View >
                                        <View >
                                            <TextComponent fontFamily={getRobotoFont("Medium")} size={Matrics.ms36} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>Welcome Username</TextComponent>
                                            <TextComponent fontFamily={getRobotoFont("Medium")} size={Matrics.ms23} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>Let's get you ready!</TextComponent>
                                        </View>
                                        <View>
                                            <ImagePlaceHolderComponent setImage={(image) => setUserData({ ...userData, profile_img: image })} image={userData?.profile_img ? userData?.profile_img?.uri || `${IMAGE_URL}${userData?.profile_img?.uri || userData?.profile_img}` : ""} />
                                            <View style={{ flexDirection: "row", paddingHorizontal: Matrics.hs50 }}>
                                                <FlatList
                                                    data={userData}
                                                    numColumns={2}
                                                    horizontal={false}
                                                    renderItem={({ item }) => {
                                                        return (
                                                            <View style={{ marginHorizontal: Matrics.hs10, marginVertical: Matrics.vs5, justifyContent: "center", alignItems: "center", width: "48%" }}>

                                                                <TextComponent fontFamily={getRobotoFont("")} size={Matrics.ms16} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>{item?.label}</TextComponent>
                                                                <TextComponent fontFamily={getRobotoFont("")} size={Matrics.ms16} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>{userData[item?.key]}</TextComponent>
                                                            </View>
                                                        )
                                                    }}

                                                />
                                                {/* {userData?.map(user => {
                                                    return (
                                                        <View style={{ flex: 0.3 }}>
                                                            <TextComponent fontFamily={getRobotoFont("")} size={Matrics.ms16} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>{user?.label}</TextComponent>
                                                            <TextComponent fontFamily={getRobotoFont("")} size={Matrics.ms16} color={Colors.DARKGRAY} marginTop={Matrics.vs5}>{user?.value}</TextComponent>

                                                        </View>
                                                    )
                                                })} */}
                                            </View>



                                        </View>
                                    </View> : null
                            }
                        </View>
                    </View>
                </ScrollView>
                <View style={{ marginHorizontal: Matrics.hs20, paddingVertical: Matrics.vs15 }}>
                    {index === 0 ? <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <ButtonComponent text="Next" onPress={() => setIndex(1)} />
                    </View> : index === 1 ?
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <ButtonComponent text="Back" onPress={() => setIndex(0)} />
                            <ButtonComponent text="Next" onPress={() => setIndex(2)} />
                        </View> : index === 2 ?
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <ButtonComponent text="Back" onPress={() => setIndex(1)} />
                                <ButtonComponent text="Next" onPress={() => setIndex(3)} />
                            </View> : index === 3 ? <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <ButtonComponent text="Back" onPress={() => setIndex(2)} />
                                <ButtonComponent text="Next" onPress={() => setIndex(4)} />
                            </View> : index === 4 ? <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <ButtonComponent text="Back" onPress={() => setIndex(3)} />
                                <ButtonComponent text="Next" onPress={() => setIndex(5)} />
                            </View> : index === 5 ?
                                <View style={{ alignItems: "center", justifyContent: "center" }}>
                                    <ButtonComponent text="Edit Profile" />
                                </View> : null


                    }
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    bodyTypeTextStyle: { fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms20, color: Colors.DARKGRAY },
    mainView: { height: Matrics.vs50, justifyContent: "center", alignItems: "flex-end", marginRight: Matrics.vs20 }

})