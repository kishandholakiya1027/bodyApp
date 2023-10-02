import { KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IS_ANDROID } from '../../core-utils/utils'
import HeaderTextComponent from '../../core-component/molecules/HeaderTextComponent'
import ImagePlaceHolderComponent from '../../core-component/atom/imagePlaceHolderComponent'
import TextInputComponent from '../../core-component/atom/TextInputComponent'
import { Matrics } from '../../theme'
import ButtonComponent from '../../core-component/atom/ButtonComponent'

const UserProfile = () => {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_ANDROID ? '' : 'padding'} enabled>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />
                <View>
                    <HeaderTextComponent />
                    <View style={{ paddingHorizontal: Matrics.hs15 }}>
                        <ImagePlaceHolderComponent />
                        <View>
                            <TextInputComponent placeholder={"Username"} />
                        </View>
                        <View>
                            <TextInputComponent placeholder={"Age"} />
                        </View>
                        <View>
                            <TextInputComponent placeholder={"Gender"} />
                        </View>
                    </View>
                    <View style={{ alignItems: "center", height: "15%", justifyContent: "center" }}>
                        <ButtonComponent text="Next" />
                    </View>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default UserProfile

const styles = StyleSheet.create({})