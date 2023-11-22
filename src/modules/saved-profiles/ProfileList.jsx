import { FlatList, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors, Matrics } from '../../theme'
import { IS_ANDROID, getRubikFont } from '../../core-utils/utils'
import Header from '../../core-component/atom/header'
import { useNavigation } from '@react-navigation/native'
import Loader from '../../core-component/atom/Loader'
import UserProfileComponent from '../../core-component/organism/UserProfileComponent'
import { API_URL } from '../../../config'
import axios from 'axios'
import UserParamContext from '../../context/setUserContext'

const ProfileList = () => {
  const navigation = useNavigation()
  const [loader, setLoader] = useState(false)
  const [likedUser, setLikedUsers] = useState([])
  console.log("🚀 ~ file: ProfileList.jsx:17 ~ ProfileList ~ likedUser:", likedUser)
  const { user } = useContext(UserParamContext)

  const getLikedUsers = async () => {
    await axios.get(`${API_URL}like/get_like_login_user/${user?.id || user?._id}`).then(({ data }) => {
      if (data?.status === 200)
        setLikedUsers(data?.likes)
      else {
        setLikedUsers([])
      }
    }).catch(err => {


    })

  }
  useEffect(() => {
    if (user)
      getLikedUsers()
  }, [])
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.WHITE, }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>

          <View style={{ borderBottomWidth: 0.5, borderColor: Colors.LIGHTGRAY }}>
            <Header text={"Saved Profile"} backgroundColor={"white"} backArrow={Colors.LIGHTBLACK} onBackArrow={() => navigation.navigate("Home")} />

          </View>
          <View style={{ flex: 1, }}>
            {loader ? <Loader /> :
              <FlatList
                // data={[]}
                contentContainerStyle={{ flexGrow: 1, height: "auto" }}
                data={likedUser}
                keyExtractor={(item) => item?._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={{ borderBottomWidth: 1, borderColor: Colors.BACKGROUNDGRAY, padding: Matrics.vs20 }}>
                      <UserProfileComponent item={item} refetch={getLikedUsers} />

                    </View>
                  )
                }}
                ListEmptyComponent={() => {
                  return (
                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms18, color: Colors.DARKGRAY }}>No profile.</Text>
                      </View>
                  )
              }}
                
                />}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ProfileList

const styles = StyleSheet.create({})