import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from './Modal'
import { Colors } from '../../theme'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { IS_ANDROID } from '../../core-utils/utils'

const ImageSelectorComponent = ({ visible, onDecline, imgurl, imageName, multiple }) => {
    const onSetImage = (image, type) => {
        return (
            {
                name: image?.fileName || image?.name,
                type: image?.type || type,
                uri: Platform.OS === "android" ? image.uri : image.uri.replace("file://", ""),
                // uri: image.uri,
                size: image?.fileSize
            }
        )
    }
    const onSetMultipleImage = (images, type) => {
        console.log("🚀 ~ file: ImageSelectorComponent.jsx:21 ~ onSetMultipleImage ~ images:", images)
        return images.map(image => {
            return (
                {
                    name: image?.fileName || image?.name,
                    type: image?.type || type,
                    uri: Platform.OS === "android" ? image.uri : image.uri.replace("file://", ""),
                    // uri: image.uri,
                    size: image?.fileSize
                }
            )

        })
    }

    const onCameraOpen = async () => {
        if (IS_ANDROID) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'We need your permission'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchCamera({
                    mediaType: "photo",
                    width: 300,
                    height: 300,
                    includeBase64: true,
                    cropping: true
                }, (response) => {
                    onDecline();
                    if (response.didCancel) {
                    } else if (response.error) {
                    } else if (response.customButton) {
                    } else {
                        // _showImagePicker(false);
                        let image = response?.assets[0]
                        // ImageResizer.createResizedImage(response?.assets[0]?.uri, Matrics.ms450, Matrics.ms450, "JPEG", 80, 0)
                        //     .then(res => {
                        //         dispatch(setBackgroundActive(false))
                        //         imageName(onSetImage(res, image?.type));
                        //         // RNFS.readFile(response?.uri, 'base64').then(res => {
                        //         //   base64Img(`data:${image};base64,${res}`); setNewUserImage(false);
                        //         // }).catch((err) => { });
                        //     })
                        multiple ? null :imgurl( response?.assets[0]?.uri);
                        imageName(multiple ? onSetMultipleImage(response?.assets) : onSetImage(image));
                    }
                });
            }
        } else {

            launchCamera({
                mediaType: "photo",
                width: 300,
                height: 300,
                includeBase64: true,
                cropping: true
            }, (response) => {
                onDecline()
                if (response?.didCancel) {
                } else if (response.error) {
                } else if (response?.customButton) {
                } else {
                    // _showImagePicker(false);
                    let image = response?.assets[0]
                    // ImageResizer.createResizedImage(response?.assets[0]?.uri, Matrics.ms450, Matrics.ms450, "JPEG", 70, 0)
                    //     .then(res => {
                    //         imageName(onSetImage(res, image?.type));
                    //         dispatch(setBackgroundActive(false))
                    //         // RNFS.readFile(response?.uri, 'base64').then(res => {
                    //         //   base64Img(`data:${image};base64,${res}`); setNewUserImage(false);
                    //         // }).catch((err) => { });
                    //     })
                    multiple ? null :imgurl( response?.assets[0]?.uri);
                    imageName(multiple ? onSetMultipleImage(response?.assets) : onSetImage(image));
                }
            });
        }
    }

    const onPhotoLibrary = () => {
        launchImageLibrary({
            mediaType: "photo",
            width: 300,
            height: 300,
            includeBase64: true,
            cropping: true,
            selectionLimit: 10
        }, async (response) => {
            onDecline()
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                // _showImagePicker(false);
                let image = response?.assets[0]
                // ImageResizer.createResizedImage(response?.assets[0]?.uri, Matrics.ms450, Matrics.ms450, "JPEG", 70, 0)
                //     .then(res => {
                //         imageName(onSetImage(res, image?.type));
                //         dispatch(setBackgroundActive(false))
                //         // RNFS.readFile(response?.uri, 'base64').then(res => {
                //         //   base64Img(`data:${image};base64,${res}`); setNewUserImage(false);
                //         // }).catch((err) => { });
                //     })
                //     .catch(() => { });

                multiple ? null :imgurl( response?.assets[0]?.uri);
                imageName(multiple ? onSetMultipleImage(response?.assets) : onSetImage(image));
            }
        });
    }

    return (
        <View>
            {visible ? <Modal
                visible={visible}
                onDecline={() => onDecline()}
                setEventName={(event) => {
                    if (event === 'Take_Photo') onCameraOpen();
                    else if (event === 'Choose_Photo') onPhotoLibrary('image');
                    else onDecline()
                }}
                content={[
                    {
                        key: 'uper', actions: [
                            { key: 1, label: 'Take_Photo', color: Colors.DARKGRAY },
                            { key: 2, label: 'Choose_Photo', color: Colors.DARKGRAY }
                        ]
                    },
                    { key: 'lower', actions: [{ key: 1, label: 'Cancel', color: Colors.DARKGRAY }] }
                ]}
            /> : null}
        </View>
    )
}

export default ImageSelectorComponent

const styles = StyleSheet.create({})