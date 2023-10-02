import { Platform } from "react-native";

export const getRobotoFont = (variant = 'Regular') => {
  console.log("🚀 ~ file: utils.js:6 ~ getRobotoFont ~ `Roboto-${variant}`:", `Roboto-${variant}`)
  return `Roboto-${variant}`;
};

export const getGothamFont = (variant = 'Medium') => {
  return `Gotham-${variant}`;
};

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === "android"


export const removeDotExceptOne = (str) => {
  return str?.replace(/^([^.]*\.)(.*)$/, function (a, b, c) {
    return b + c?.replace(/\./g, '');
  })?.replace(/[,-\s]/g, "")
}