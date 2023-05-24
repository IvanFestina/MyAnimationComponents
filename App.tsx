import {Image, StyleSheet} from 'react-native';
import {GestureHandlerRootView, PinchGestureHandler} from "react-native-gesture-handler";
import {FollowCircleAnimation} from "./src/FollowCircleAnimation/FollowCircleAnimation";
import {useState} from "react";
import {PanGestureHandlerComponent} from "./src/PanGestureHandler/PanGestureHandlerComponent";
import {InterpolateWithScrollViewComponent} from "./src/InterpolateWithScrollView/InterpolateWithScrollView";
import {
    InterpolateColorsAnimationComponent
} from "./src/InterpolateColorsAnimation/InterpolateColorsAnimationComponent";
import {PinchGestureHandlerComponent} from "./src/PinchGestureHandler/PinchGestureHandlerComponent";
import {DoubleTapAnimationComponent} from "./src/DoubleTapGestureHandler/DoubleTapAnimationComponent";
import {ColorPickerComponent} from "./src/ColorPicker/ColorPickerComponent";

type AnimationModeType = "BasicPanGestureAnimation" | "followCircleAnimation" | "InterpolateWithScrollView"
    | "InterpolateColorsAnimation" | "PinchGestureHandler" | "DoubleTapAnimation" | "ColorPicker"

export default function App() {

    const [animationMode, setAnimationMode] = useState<AnimationModeType>('ColorPicker');

    let animationToRender
    if (animationMode === 'BasicPanGestureAnimation') animationToRender = <PanGestureHandlerComponent/>
    if (animationMode === 'followCircleAnimation') animationToRender = <FollowCircleAnimation/>
    if (animationMode === 'InterpolateWithScrollView') animationToRender = <InterpolateWithScrollViewComponent/>
    if (animationMode === 'InterpolateColorsAnimation') animationToRender = <InterpolateColorsAnimationComponent/>
    if (animationMode === 'PinchGestureHandler') animationToRender = <PinchGestureHandlerComponent/>
    if (animationMode === 'DoubleTapAnimation') animationToRender = <DoubleTapAnimationComponent/>
    if (animationMode === 'ColorPicker') animationToRender = <ColorPickerComponent />

    return (
        <GestureHandlerRootView style={s.container}>
            {animationToRender}
        </GestureHandlerRootView>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

});
