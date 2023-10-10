import { Platform } from "react-native";

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