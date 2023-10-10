import { FlatList, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Matrics } from '../../theme'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import TextComponent from '../../core-component/atom/TextComponent'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import { API_URL, IMAGE_URL } from '../../../config'
import axios from 'axios'

const data = [
    {
        image: "",
        title: "Create Unique Looks"
    },
    {
        image: "",
        title: "Refresh Wardrobe"
    },
    {
        image: "",
        title: "Reuse/ Mix & Match"
    },
    {
        image: "",
        title: "Shopping Assistance"
    },
    {
        image: "",
        title: "Create Unique Looks"
    },
]

const Home = () => {
    const [search, setSearch] = useState()
    const [users, setUsers] = useState([])
    console.log("🚀 ~ file: index.jsx:37 ~ Home ~ users:", users)

    const getUsers = async () => {
        await axios.get(`${API_URL}/get_user`).then(({ data }) => {
            setUsers(data)
        }).catch(err => {


        })
    }
    useEffect(() => {
        getUsers()
    }, [])


    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ margin: Matrics.ms20, flex: 1 }}>
                    <View >
                        <TextInputComponent placeholder={"Search for designers, stylists or trends"} onChangeText={(text) => setSearch(text)} value={search} />
                        <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10}>{"How can we assist you today?"}</TextComponent>
                        <View style={{ flexDirection: "row" }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {data ?
                                    data?.map(item =>
                                        <View style={{ marginRight: Matrics.vs15, width: Matrics.vs100, justifyContent: "center", marginTop: Matrics.vs10 }}>

                                            <ImagePlaceHolderComponent size={Matrics.ms90} borderRadius={Matrics.ms45} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => { }} image={`${IMAGE_URL}${item?.image}`} borderColor={Colors.MEDIUMREDOPACITY} backgroundColor={Colors.MEDIUMREDOPACITY} />
                                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10} textAlign="center">{item?.title}</TextComponent>

                                        </View>

                                    ) : null}

                            </ScrollView>

                        </View>
                    </View>
                    <View >
                        <View style={{ marginVertical: Matrics.vs20 }}>

                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs10}>{"Popular on StyleCrew"}</TextComponent>
                        </View>
                        <View style={{ height: "58%" }}>
                            <FlatList
                                data={users}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    console.log("🚀 ~ file: index.jsx:92 ~ Home ~ item?.profile_img:", item?.profile_img)

                                    return (
                                        <View style={{ marginTop: Matrics.vs10, paddingBottom: Matrics.vs20, flex: 1 }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <View style={{ flex: 0.50, alignItems: "center", marginRight: Matrics.hs10 }}>
                                                    <ImagePlaceHolderComponent size={Matrics.ms160} borderRadius={Matrics.ms80} padding={Matrics.hs10} marginVertical={Matrics.vs10} setImage={(image) => { }} image={item?.profile_img ? `${IMAGE_URL}${item?.profile_img}` : ""} borderColor={Colors.MEDIUMREDOPACITY} backgroundColor={item?.profile_img ? "none" : Colors.MEDIUMREDOPACITY} />


                                                </View>
                                                <View style={{ flex: 0.50, }}>
                                                    <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms20} color={Colors.BLUE} marginTop={Matrics.vs15}>{item?.username}</TextComponent>
                                                    <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs5}>{item?.profession}</TextComponent>
                                                    <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs5}>{`${item?.yearExperience} Years of Experience`}</TextComponent>
                                                    <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.MEDIUMRED} marginTop={Matrics.vs10}>{"(20) Reviews"}</TextComponent>
                                                    <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTGRAY} marginTop={Matrics.vs10}>{"Consultation fees: "}</TextComponent>
                                                    <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Regular")} size={Matrics.ms16} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{`INR ${item?.consultationCharge}/30 min session`}</TextComponent>

                                                </View>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <View style={{ flex: 0.48, alignItems: "center", marginRight: Matrics.hs10 }}>

                                                    <View style={{ marginTop: Matrics.vs10 }}>
                                                        <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs10 }]} onPress={() => { }}>
                                                            <Text style={styles.textStyle}>{"View Portfolio"}</Text>
                                                        </Pressable>

                                                    </View>
                                                </View>
                                                <View style={{ flex: 0.52, }}>
                                                    <View style={{ marginTop: Matrics.vs10 }}>
                                                        <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs5 }]} onPress={() => { }}>
                                                            <Text style={styles.textStyle}>{"Book Consultation"}</Text>
                                                        </Pressable>

                                                    </View>

                                                </View>
                                            </View>

                                        </View>

                                    )
                                }}
                            />

                        </View>
                        <View style={{ alignItems: "center" }}>
                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms18} color={Colors.BLUE} marginTop={Matrics.vs10} textDecorationLine='underline'>{"View all"}</TextComponent>

                        </View>

                    </View>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Home

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs20, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row" },
})