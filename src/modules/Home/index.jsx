import { FlatList, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, Matrics } from '../../theme'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import TextComponent from '../../core-component/atom/TextComponent'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import { API_URL, IMAGE_URL } from '../../../config'
import axios from 'axios'
import UsedataComponent from '../../core-component/organism/UsedataComponent'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    const [user, setUser] = useState([])
    const navigation = useNavigation()
    const getUsers = async () => {
        const user = JSON.parse(await AsyncStorage.getItem("user"))
        setUser(user)
        await axios.get(`${API_URL}user/get_user_rating`).then(({ data }) => {
            setUsers(data?.data)
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
                            <UsedataComponent slice={2} userId={user?.id} />

                        </View>
                        <Pressable style={{ alignItems: "center" }} onPress={() => navigation.navigate("AllUsers", { users })}>
                            <TextComponent paddingHorizontal={0} fontFamily={getRubikFont("Medium")} size={Matrics.ms18} color={Colors.BLUE} marginTop={Matrics.vs10} textDecorationLine='underline'>{"View all"}</TextComponent>

                        </Pressable>

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