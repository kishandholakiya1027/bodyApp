import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from './Modal'
import { Colors } from '../../theme'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const ImageSelectorComponent = ({ visible, onDecline, imgurl, imageName }) => {
    console.log("🚀 ~ file: ImageSelectorComponent.jsx:6 ~ ImageSelectorComponent ~ visible:", visible)
    const onSetImage = (image, type) => {
        return (
            {
                name: image?.fileName || image?.name,
                type: image?.type || type,
                uri: Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
            }
        )
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
                launchCamera(Constant.cameraOption, (response) => {
                    onDecline();
                    if (response.didCancel) {
                    } else if (response.error) {
                    } else if (response.customButton) {
                    } else {
                        // _showImagePicker(false);
                        let image = response?.assets[0]
                        ImageResizer.createResizedImage(response?.assets[0]?.uri, Matrics.ms450, Matrics.ms450, "JPEG", 80, 0)
                            .then(res => {
                                dispatch(setBackgroundActive(false))
                                imageName(onSetImage(res, image?.type));
                                // RNFS.readFile(response?.uri, 'base64').then(res => {
                                //   base64Img(`data:${image};base64,${res}`); setNewUserImage(false);
                                // }).catch((err) => { });
                            })
                        imgurl(image?.uri);
                        // imageName(onSetImage(image));
                    }
                });
            }
        } else {

            launchCamera(Constant.cameraOption, (response) => {
                onDecline()
                if (response?.didCancel) {
                } else if (response.error) {
                } else if (response?.customButton) {
                } else {
                    // _showImagePicker(false);
                    let image = response?.assets[0]
                    ImageResizer.createResizedImage(response?.assets[0]?.uri, Matrics.ms450, Matrics.ms450, "JPEG", 70, 0)
                        .then(res => {
                            imageName(onSetImage(res, image?.type));
                            dispatch(setBackgroundActive(false))
                            // RNFS.readFile(response?.uri, 'base64').then(res => {
                            //   base64Img(`data:${image};base64,${res}`); setNewUserImage(false);
                            // }).catch((err) => { });
                        })
                    imgurl(response?.assets[0]?.uri);

                    // imageName(onSetImage(image));
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
            cropping: true
        }, async (response) => {
            onDecline()
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                // _showImagePicker(false);
                let image = response?.assets[0]
                console.log("🚀 ~ file: ImageSelectorComponent.jsx:91 ~ onPhotoLibrary ~ response?.assets:", response?.assets)
                console.log("🚀 ~ file: ImageSelectorComponent.jsx:90 ~ onPhotoLibrary ~ image:", image)
                // ImageResizer.createResizedImage(response?.assets[0]?.uri, Matrics.ms450, Matrics.ms450, "JPEG", 70, 0)
                //     .then(res => {
                //         imageName(onSetImage(res, image?.type));
                //         dispatch(setBackgroundActive(false))
                //         // RNFS.readFile(response?.uri, 'base64').then(res => {
                //         //   base64Img(`data:${image};base64,${res}`); setNewUserImage(false);
                //         // }).catch((err) => { });
                //     })
                //     .catch(() => { });

                // imgurl(response?.assets[0]?.uri);
                // imageName(onSetImage(image));
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