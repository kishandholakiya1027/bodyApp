import { KeyboardAvoidingView, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../core-component/atom/header'
import { Colors, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import { useNavigation } from '@react-navigation/native'
import UsedataComponent from '../../core-component/organism/UsedataComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TextInputComponent from '../../core-component/atom/TextInputComponent'

const AllUsers = (props) => {
    console.log("🚀 ~ file: AllUsers.jsx:9 ~ AllUsers ~ props:", props)
    // const navigation = useNavigation()

    const [user, setUser] = useState([])
    const [search, setSearch] = useState()

    const navigation = useNavigation()
    const getUsers = async () => {
        const user = JSON.parse(await AsyncStorage.getItem("user"))
        setUser(user)



    }
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
                    <Header text={"Popular on StyleCrew (100)"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.navigate("Home")} />

                </View>
                <View style={{ margin: Matrics.ms20, paddinBottom: Matrics.vs50 }}>
                    <TextInputComponent placeholder={"Search for designers, stylists or trends"} onChangeText={(text) => setSearch(text)} value={search} />
                    <View style={{ flexDirection: "row", marginBottom: Matrics.vs15 }}>
                        <View style={{ flex: 0.48, alignItems: "center", marginRight: Matrics.hs10 }}>

                            <View style={{}}>
                                <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs10 }]} onPress={() => { }}>
                                    <Text style={styles.textStyle}>{"Sort"}</Text>
                                </Pressable>

                            </View>
                        </View>
                        <View style={{ flex: 0.52, }}>
                            <View style={{}}>
                                <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs5 }]} onPress={() => { }}>
                                    <Text style={styles.textStyle}>{"Filter"}</Text>
                                </Pressable>

                            </View>

                        </View>
                    </View>
                    <View style={{ height: "75%" }}>
                        <UsedataComponent users={props?.route?.params?.users} userId={user?.id} />

                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default AllUsers

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, width: "100%", fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, textAlign: "center" },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs20, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%" },
})