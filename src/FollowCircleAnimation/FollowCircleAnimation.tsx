import {useSharedValue} from "react-native-reanimated";
import {SCREEN_WIDTH, useFollowAnimatedPosition} from "../utils";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {Circle} from "./Circle";
import {View} from "react-native";

export const FollowCircleAnimation = () => {

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const context = useSharedValue({x: 0, y: 0})

    const {
        rStyle: rBlueCircleStyle,
        followY: blueFallowY,
        followX: blueFallowX
    } = useFollowAnimatedPosition({x: translateX, y: translateY})
    const {
        rStyle: rRedCircleStyle,
        followY: redFollowY,
        followX: redFollowX
    } = useFollowAnimatedPosition({x: blueFallowX, y: blueFallowY})
    const {
        rStyle: rGreenCircleStyle,
        followY: greenFollowY,
        followX: greenFollowX
    } = useFollowAnimatedPosition({x: redFollowX, y: redFollowY})

    const gesture = Gesture.Pan()
        .onStart(event => {
            context.value = {x: translateX.value, y: translateY.value}
        })
        .onUpdate(event => {
            translateX.value = event.translationX + context.value.x;
            translateY.value = event.translationY + context.value.y;
        })
        .onEnd(event => {
            if (translateX.value > SCREEN_WIDTH / 2) {
                translateX.value = SCREEN_WIDTH - 80
            } else {
                translateX.value = 0
            }
        })

    return (
        <View style={{flex: 1}}>
            <Circle style={{backgroundColor: 'red'}} rStyle={rRedCircleStyle}/>
            <Circle style={{backgroundColor: 'green'}} rStyle={rGreenCircleStyle}/>
            <GestureDetector gesture={gesture}>
                <Circle rStyle={rBlueCircleStyle}/>
            </GestureDetector>
        </View>
    )
}

