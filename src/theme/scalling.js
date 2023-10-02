import { IS_IOS } from "../core-utils/utils";
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const guidelineBaseWidth = IS_IOS ? 375 : 360;
const guidelineBaseHeight = IS_IOS ? 812 : 800;

const scale = size => (shortDimension / guidelineBaseWidth) * size;
const verticalScale = size => (longDimension / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const moderateVerticalScale = (size, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;

export default {
  hs: value => {
    return scale(value);
  },
  vs: value => {
    return verticalScale(value);
  },
  ms: (value, factor = 0.5) => {
    return moderateScale(value, factor);
  }
};
