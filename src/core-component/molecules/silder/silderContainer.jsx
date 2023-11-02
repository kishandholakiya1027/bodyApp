import React from "react";
import { Image, Text, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

import { Colors, Images, Matrics } from "../../../theme";
import { getRubikFont } from "../../../core-utils/utils";

export const SliderContainer = (props) => {
  // theme variable

  // sliderValue props
  const { sliderValue, trackMarks, setSlider, setFilter } = props;

  let renderTrackMarkComponent;

  if (trackMarks?.length) {
    renderTrackMarkComponent = (index) => {
      return <View style={{ marginTop: -60, alignItems: "center" }} >
        <Text style={[{ color: index === 0 || index === 3 ? Colors.BLUE : Colors.LIGHTGRAY, fontFamily: getRubikFont("Regular"), fontSize: Matrics.ms16 }]}>{trackMarks[index] || ""}</Text>
        {!(index === 0 || index === 3) && trackMarks[index] ? <Image source={Images.downArrow} style={{ width: Matrics.ms15, height: Matrics.ms22, tintColor: Colors.LIGHTGRAY, resizeMode: "contain" }} /> : null}
      </View>
    };
  }

  // slider children function
  const renderChildren = () => {
    return React.Children.map(props.children, (child) => {
      if (!!child && child.type === Slider) {
        return <>
          {React.cloneElement(child, {
            onValueChange: setSlider,
            onSlidingComplete: setFilter,
            renderTrackMarkComponent,
            trackMarks,
            value: sliderValue
          })}
        </>
      }
      return child;
    });
  };

  return (
    <>
      {renderChildren()}
      <View style={{}}>
      </View>
    </>
  );
}