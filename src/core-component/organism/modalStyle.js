import { StyleSheet } from "react-native";
import { Colors, Matrics, height } from "../../theme";


const styles = StyleSheet.create({
  modalView: {
    margin: 30,
    justifyContent: 'flex-end',
    backgroundColor: Colors.WHITE,
    height: height / 2
  },
  mainView: {
    // justifyContent: 'center'
  },

  subView: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: Matrics.ms26,
    borderTopRightRadius: Matrics.ms26,
    marginTop: 'auto',
    maxHeight: height / 3
  },
  lableView: {
    paddingVertical: Matrics.vs24,
    paddingHorizontal: Matrics.hs25
  },
  headerlable: {
    fontSize: Matrics.ms16
  },
  contentView: {
    paddingVertical: Matrics.ms30,
    paddingHorizontal: Matrics.ms15
  },
  borderView: {
    height: Matrics.ms50,
    width: Matrics.ms50,
    borderRadius: Matrics.ms25,
    borderWidth: Matrics.ms1
  },
  colorView: {
    height: Matrics.ms40,
    width: Matrics.ms40,
    borderRadius: Matrics.ms20
  },
  pH15: {
    paddingHorizontal: Matrics.hs15
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND
  },
  s_innerView: {
    backgroundColor: Colors.WHITE,
    borderRadius: Matrics.ms12,
    // marginBottom: Matrics.vs20,
    marginHorizontal: Matrics.hs15
    // height: 50
  },
  s_bottomB: {
    borderBottomWidth: Matrics.ms1,
    borderBottomColor: Colors.BORDERCOLOR
  },
  s_mT10: {
    marginTop: Matrics.vs10
  },
  s_lableView: {
    paddingVertical: Matrics.vs18
  },
  fs12: { fontSize: Matrics.ms12 },
  fs14: { fontSize: Matrics.ms14 },
  fs16: { fontSize: Matrics.ms16 }
});

export default styles;