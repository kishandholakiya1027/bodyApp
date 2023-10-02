import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import UserProfile from '../modules/user/UserProfile'

const Stack = createNativeStackNavigator()

const Index = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName='UserProfile' screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'transparent' } }}>
                {/* <Stack.Screen name="MainTab" component={BottomTab}/> */}
                {/* {/* <Stack.Screen name='Dashboard' component={Dashboard}/> */}
                <Stack.Screen name='UserProfile' component={UserProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Index

const styles = StyleSheet.create({})