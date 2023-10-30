import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Matrics } from '../../theme'
import { Slider } from '@miblanchard/react-native-slider';
import { SliderContainer } from './silder/silderContainer';


const SliderComponent = ({ label, setFilter, filter, keyName }) => {
    const [scoreValue, setScoreValue] = useState(useMemo(() => [300, 0, 0, 5000], []))

    // states
    const [value, setValue] = useState([300, 5000])
    const [isShow, setIsShow] = useState({ isStart: false, isEnd: false })

    useEffect(() => {
        if (filter[keyName]) {
            if (filter[keyName]?.from !== 300) {
                scoreValue[1] = filter[keyName]?.from || 0
                setScoreValue(scoreValue)
            }
            if (filter[keyName]?.to !== 5000) {
                scoreValue[2] = filter[keyName]?.to || 0
                setScoreValue(scoreValue)
            }
            setValue([filter[keyName]?.from || 300, filter[keyName]?.to || 1000])
        } else {
            setValue([300, 1000])
        }
    }, [filter])

    // silder set value function
    const handleSilder = (data) => {
        setValue(data)
    }

    // silder handle change values
    const handleValuesChange = (data) => {
        const [prevValue1, prevValue2] = value;
        const [currentValue1, currentValue2] = data;
        if (prevValue1 !== currentValue1) {
            setIsShow({ isStart: true, isEnd: false })
        }
        if (prevValue2 !== currentValue2) {
            setIsShow({ isStart: false, isEnd: true })
        }
        handleSilder(data)
    };
    return (
        <View style={styles.scoreView}>
            <SliderContainer
                sliderValue={value}
                trackMarks={scoreValue}
                setSlider={(data) => handleValuesChange(data)}
                setFilter={(data) => {
                    setIsShow({ isStart: false, isEnd: false })
                    setFilter({ ...filter, [keyName]: { from: data[0], to: data[1] } })
                }}>
                <Slider
                    step={1}
                    minimumValue={300}
                    maximumValue={5000}
                    thumbTintColor={Colors.BLUE}
                    trackStyle={styles.trackView}
                    thumbStyle={styles.thumbStyle}
                    minimumTrackTintColor={Colors.DARKGRAY}
                    maximumTrackTintColor={Colors.DARKGRAY}
                    renderAboveThumbComponent={(index, actualValue) => {
                        return <>
                            {index === 0 && isShow?.isStart ?
                                <View style={styles.tooltipContainer}>
                                    <Text style={[{ color: Colors.LIGHTBLACK }]}>{actualValue}</Text>
                                    <View style={styles.bottomSpace}>
                                        {/* <DownArrow height={20} width={20} /> */}
                                    </View>
                                </View> : index === 1 && isShow?.isEnd ?
                                    <View style={styles.tooltipContainer}>
                                        <Text style={[{ color: Colors.LIGHTBLACK }]}>{actualValue}</Text>
                                        <View style={styles.bottomSpace}>
                                            {/* <DownArrow height={20} width={20} /> */}
                                        </View>
                                    </View> : null}
                        </>
                    }} />
            </SliderContainer>
        </View>
    )
}

export default SliderComponent
const styles = StyleSheet.create({
    subContainer: { paddingHorizontal: Matrics.vs16 },
    tooltipContainer: { backgroundColor: '#5B5b5b', opacity: 0.5, right: Matrics.ms20, marginBottom: Matrics.vs8, borderRadius: Matrics.ms4, height: Matrics.ms36, width: Matrics.ms36, alignItems: 'center', justifyContent: 'center' },
    trackView: { height: Matrics.ms1, borderRadius: Matrics.ms5, backgroundColor: Colors.DARKGRAY },
    scoreView: { marginTop: Matrics.vs20, paddingBottom: Matrics.vs20, paddingRight: Matrics.hs8 },
    summaryContainer: { marginTop: Matrics.vs16, borderBottomWidth: Matrics.ms1, paddingBottom: Matrics.vs8 },
    thumbStyle: { borderColor: Colors.BLUE, borderWidth: Matrics.ms1, width: Matrics.ms25, height: Matrics.ms25, borderRadius: Matrics.ms13, marginLeft: Matrics.vs5 },
    bottomSpace: { position: 'absolute', top: Matrics.vs30 }
})