import { Button, Image, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../core-component/atom/header'
import { Colors, Images, Matrics, height } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import { useNavigation } from '@react-navigation/native'
import UsedataComponent from '../../core-component/organism/UsedataComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import MainModal from '../../core-component/organism/modalMainComponents'
import CustomModalComponent from '../../core-component/organism/customModalComponent'
import ReactNativeModal from 'react-native-modal'
import TextComponent from '../../core-component/atom/TextComponent'
import CheckBox from 'react-native-check-box'
import { Slider } from '@miblanchard/react-native-slider'
import SliderComponent from '../../core-component/molecules/SliderComponent'
import axios from 'axios'
import { API_URL } from '../../../config'
import UserParamContext from '../../context/setUserContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'



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


function CheckBoxComponent({ open, setOpen, filter, setFilter, data, title, component, keyName }) {
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


const AllUsers = (props) => {
    // const navigation = useNavigation()
const homeFilter = props?.route?.params?.homeFilter
    const [search, setSearch] = useState()
    const [filterModal, setFilterModal] = useState(false)
    const [sortModal, setSortModal] = useState(false)
    const [openProfession, setOpenProfession] = useState(true)
    const [openExperience, setOpenExperience] = useState(true)
    const [openRating, setOpenRating] = useState(true)
    const [openFees, setOpenFees] = useState(true)
    const [filter, setFilter] = useState({})
    const [defaultFilter, setDefaultFilter] = useState({})
    console.log("🚀 ~ file: AllUsers.jsx:90 ~ AllUsers ~ filter:", filter)
    const [sort, setSort] = useState()
    const {user} = useContext(UserParamContext)
    const [submitSort, setSubmitSort] = useState()
    const [submitFilter, setSubmitFilter] = useState(false)
    const [count, setCount] = useState(0)
    const insets = useSafeAreaInsets();

    const navigation = useNavigation()


  
    useEffect(() => {
        if(homeFilter){
            setFilter(homeFilter)
            setDefaultFilter(homeFilter)
            setSubmitFilter(true)

        }
    }, [homeFilter])

    useEffect(() => {
        setSubmitFilter(true)

            
    }, [])

    const professions = [
        { label: "Fashion Designer", value: "Fashion Designer" },
        { label: "Fashion Stylist", value: "Fashion Stylist" }
    ]

    const experience = [
        { label: "Beginner", value: 1 },
        { label: "0-5 Years ", value: 2 },
        { label: "5-10 Years ", value: "" },
        { label: "+ 10 Years", value: "" }
    ]
    const rating = [
        { label: "★", value: 1 },
        { label: "★★", value: 2 },
        { label: "★★★ ", value: 3 },
        { label: "★★★★", value: 4 },
        { label: "★★★★★", value: 5 },
    ]
    const sortData = [
        { label: "Popularity: High to Low", value: 1 },
        { label: "Popularity: Low to High", value: 2 },
        { label: "Consultation fees: High to Low", value: 3 },
        { label: "Consultation fees: Low to High", value: 4 }
    ]

    // const onFilter = async(userFilter)=>{
    //     if (userFilter)
    //     setTimeout(async () => {
    //         let filter = { ...userFilter }
    //         if (filter?.consultationCharge) {
    //             filter.consultationCharge = [filter.consultationCharge?.from, filter.consultationCharge?.to]
    //         }
    //         console.log("🚀 ~ file: UsedataComponent.jsx:83 ~ useEffect ~ filter:", filter)
    //         await axios.post(`${API_URL}designer/get_designer_filter`, filter, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         }).then(({ data }) => {
    //             console.log("🚀 ~ file: index.jsx:66 ~ awaitaxios.get ~ data:", data)
    //             if (data?.status === 200) {
    //                 setFilteredUser(data?.data)

    //             } else {
    //                 Alert.alert("something went wrong")
    //             }
    //             setSubmitFilter(false)
    //             setLoader(false)

    //         }).catch(err => {
    //             setLoader(false)


    //         })
    //     }, 2000);
    // }

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{}}>

                        <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
                            <Header text={`Popular on StyleCrew (${count})`} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.navigate("Home")} />

                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ margin: Matrics.ms20, paddingBottom:30 }}>
                            <TextInputComponent placeholder={"Search for designers, stylists or trends"} onChangeText={(text) =>{ 
                                setFilter({...filter,search:text})
                                setDefaultFilter({...filter,search:text})
                                setTimeout(() => {
                                    setSubmitFilter(true)
                                }, 1000);
                                }} value={search} />
                            <View style={{ flexDirection: "row", marginBottom: Matrics.vs15 }}>
                                <View style={{ flex: 0.48, alignItems: "center", marginRight: Matrics.hs10 }}>

                                    <View style={{}}>
                                        <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs10 }]} onPress={() => setSortModal(true)}>
                                            <Text style={styles.textStyle}>{"Sort"}</Text>
                                        </Pressable>

                                    </View>
                                </View>
                                <View style={{ flex: 0.52, }}>
                                    <View style={{}}>
                                        <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs5 }]} onPress={() => {
                                            setFilter(defaultFilter)
                                            setFilterModal(true)}}>
                                            <Text style={styles.textStyle}>{"Filter"}</Text>
                                        </Pressable>

                                    </View>

                                </View>
                            </View>
                            <View style={{ }}>
                             <UsedataComponent  userId={user?.id||user?._id} homeFilter={homeFilter} search={search} userFilter={Object.keys(defaultFilter)?.length && submitFilter ? defaultFilter :submitFilter ? "null": ""} setSubmitFilter={setSubmitFilter} sort={sort} setCount={setCount}/>

                            </View>
                        </View>

                        </ScrollView>

                    </View>
                </SafeAreaView>
                {filterModal ? <CustomModalComponent
                    visible={filterModal}
                    setVisible={() => setFilterModal(false)}
                >
                    <SafeAreaView style={{ flex: 1, }} >
                        <View style={{ backgroundColor: Colors.WHITE, height: height - 40, paddingBottom: Matrics.vs15 }}>
                            <View style={{ borderBottomWidth: 2, borderColor: Colors.LIGHTERGRAY, paddingVertical: Matrics.vs5 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: Matrics.ms50, marginRight: Matrics.vs20 }}>
                                    <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{"Filter Profiles"}</TextComponent>

                                    <Pressable onPress={() => {setFilterModal(false)
                                    setFilter({})
                                    }}>
                                        <Image source={Images.close} style={{ width: Matrics.ms18, height: Matrics.ms18, tintColor: Colors.LIGHTBLACK }} />
                                    </Pressable>
                                </View>
                                {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                            </View>
                            <ScrollView style={{ flex: 1, paddingHorizontal: Matrics.hs20 }} showsVerticalScrollIndicator={false}>

                                <CheckBoxComponent keyName="profession" title={"Profession"} open={openProfession} setOpen={setOpenProfession} filter={filter} setFilter={setFilter} data={professions} />
                                <CheckBoxComponent keyName="yearExperience" title={"Experience"} open={openExperience} setOpen={setOpenExperience} filter={filter} setFilter={setFilter} data={experience} />
                                <CheckBoxComponent keyName="ratings" title={"Ratings"} open={openRating} setOpen={setOpenRating} filter={filter} setFilter={setFilter} data={rating} component={true} />
                                <View style={{ paddingTop: Matrics.vs15 }}>
                                    <TitleComponent open={openFees} setOpen={setOpenFees} title={"Consultation Fees (in INR)"} />
                                    {openFees ? <View style={{ marginTop: Matrics.vs50 }}>

                                        <SliderComponent setFilter={setFilter} filter={filter} keyName={"consultationCharge"} />
                                    </View> : null}
                                </View>

                            </ScrollView>
                            <View style={{ flexDirection: "row", margin: Matrics.vs20 }}>
                                <View style={{ flex: 0.48, alignItems: "center", marginRight: Matrics.hs10 }}>

                                    <View style={{}}>
                                        <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs10 }]} onPress={() => {
                                            setFilter({})
                                            setDefaultFilter({})
                                            setSubmitFilter(true)
                                            setFilterModal(false)
                                        }}>
                                            <Text style={styles.textStyle}>{"Clear"}</Text>
                                        </Pressable>

                                    </View>
                                </View>
                                <View style={{ flex: 0.52, }}>
                                    <View style={{}}>
                                        <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs5, backgroundColor: Colors.BLUE }]} onPress={() => {
                                            setDefaultFilter(filter)
                                            setSubmitFilter(true)
                                            setFilterModal(false)
                                        }}>
                                            <Text style={[styles.textStyle, { color: Colors.WHITE }]}>{"Apply"}</Text>
                                        </Pressable>

                                    </View>

                                </View>
                            </View>
                        </View>
                    </SafeAreaView>

                </CustomModalComponent> : null}
                {sortModal ? <CustomModalComponent
                    visible={sortModal}
                    setVisible={() => setSortModal(false)}
                >
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        <View style={{ backgroundColor: Colors.WHITE, height: insets?.bottom ? height / 2.9:height / 2.5, paddingBottom: Matrics.vs15, paddingRight: Matrics.vs20 }}>
                            <View style={{ borderBottomWidth: 0, borderColor: Colors.LIGHTERGRAY, paddingTop: Matrics.vs20, height: Matrics.ms50 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <TextComponent fontFamily={getRubikFont("Medium")} size={Matrics.ms22} color={Colors.LIGHTBLACK} marginTop={Matrics.vs0}>{"Sort Profiles"}</TextComponent>

                                    <Pressable onPress={() => setSortModal(false)}>
                                        <Image source={Images.close} style={{ width: Matrics.ms18, height: Matrics.ms18, tintColor: Colors.LIGHTBLACK }} />
                                    </Pressable>
                                </View>
                                {/* <Header text={"Complete Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => index == 1 ? setIndex(0) : logOut()} /> */}

                            </View>
                            <ScrollView style={{ flex: 1, paddingHorizontal: Matrics.hs20 }} showsVerticalScrollIndicator={false}>

                                {sortData?.map(item => {
                                    return (
                                        <Pressable onPress={() => {
                                            setFilter({...filter,sort:item?.value})
                                            setDefaultFilter({...filter,sort:item?.value})
                                            setSubmitFilter(true)
                                            setSortModal(false)
                                        }}>
                                            <TextComponent fontFamily={filter?.sort === item?.value ? getRubikFont("SemiBold") : getRubikFont("Regular")} size={Matrics.ms18} color={sort === item?.value ? Colors?.BLUE : Colors.LIGHTBLACK} marginTop={Matrics.vs20} paddingHorizontal={0}>{item?.label}</TextComponent>

                                        </Pressable>
                                    )
                                })}

                            </ScrollView>

                        </View>
                    </View>

                </CustomModalComponent> : null}
            </KeyboardAvoidingView>

            {/* <ReactNativeModal isVisible={true}>
            </ReactNativeModal> */}
        </View>
    );
    // return (
    //     <SafeAreaView style={{ flex: 1 }}>
    //         <StatusBar barStyle="dark-content" backgroundColor="white" />
    //         <View style={{}}>

    //             <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
    //                 <Header text={"Popular on StyleCrew (100)"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.navigate("Home")} />

    //             </View>
    //             <View style={{ margin: Matrics.ms20, paddinBottom: Matrics.vs50 }}>
    //                 <TextInputComponent placeholder={"Search for designers, stylists or trends"} onChangeText={(text) => setSearch(text)} value={search} />
    //                 <View style={{ flexDirection: "row", marginBottom: Matrics.vs15 }}>
    //                     <View style={{ flex: 0.48, alignItems: "center", marginRight: Matrics.hs10 }}>

    //                         <View style={{}}>
    //                             <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs10 }]} onPress={() => { }}>
    //                                 <Text style={styles.textStyle}>{"Sort"}</Text>
    //                             </Pressable>

    //                         </View>
    //                     </View>
    //                     <View style={{ flex: 0.52, }}>
    //                         <View style={{}}>
    //                             <Pressable style={[styles.buttonView, { paddingHorizontal: Matrics.hs5 }]} onPress={() => { }}>
    //                                 <Text style={styles.textStyle}>{"Filter"}</Text>
    //                             </Pressable>

    //                         </View>

    //                     </View>
    //                 </View>
    //                 <View style={{ height: "75%" }}>
    //                     <UsedataComponent users={props?.route?.params?.users} userId={user?.id} search={search} />

    //                 </View>
    //             </View>
    //             {
    //                 filterModal ?

    //                     <ReactNativeModal isVisible={true}>
    //                         <View style={{ flex: 1 }}>
    //                             <Text>I am the modal content!</Text>
    //                         </View>
    //                     </ReactNativeModal>
    //                     : null
    //             }
    //         </View>
    //     </SafeAreaView>
    // )
}

export default AllUsers

const styles = StyleSheet.create({
    textStyle: { color: Colors.BLUE, width: "100%", fontFamily: getRubikFont("Medium"), fontSize: Matrics.ms18, textAlign: "center" },
    buttonView: { marginTop: Matrics.vs10, borderWidth: 1, borderColor: Colors.BLUE, paddingHorizontal: Matrics.hs20, height: Matrics.vs50, alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%" },
})