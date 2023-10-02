import { Dimensions } from 'react-native'
import Colors from './colors';
import Images from './images';
import { Matrics } from './matrics';
import Scalling from './scalling';
import C_Style from './style';

const { width: _width, height: _height } = Dimensions.get('window');
const width = Math.ceil(Math.min(_width, _height));
const height = Math.ceil(Math.max(_width, _height));

export { Images, Colors, width, height, Scalling, Matrics, C_Style };