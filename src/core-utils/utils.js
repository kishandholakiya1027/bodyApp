import { Platform } from "react-native";
import Toast from "react-native-simple-toast"
import { Colors, Matrics } from "../theme";

export const getRobotoFont = (variant = 'Regular') => {
  return `Roboto-${variant}`;
};

export const getRubikFont = (variant = 'Medium') => {
  return `Rubik-${variant}`;
};

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === "android"


export const removeDotExceptOne = (str) => {
  return str?.replace(/^([^.]*\.)(.*)$/, function (a, b, c) {
    return b + c?.replace(/\./g, '');
  })?.replace(/[,-\s]/g, "")
}

 export const showToast = (msg) => {
   console.log("🚀 ~ file: utils.js:24 ~ showToast ~ msg:", msg)
   Toast.show(msg, Toast.SHORT, {
     backgroundColor: Colors.LIGHTBLACK,
     fontFamily:getRubikFont("Regular"),
     fontSize:Matrics.ms18,
   });
 }
