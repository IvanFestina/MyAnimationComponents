import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {Image, StyleSheet, View} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../utils";

const imageUri =
    'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const PinchGestureHandlerComponent = () => {
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
                scale.value = event.scale;
                console.log(event.scale)
                focalX.value = event.focalX;
                focalY.value = event.focalY;
            }
        )
        .onEnd((event) => {
            scale.value = withTiming(1);

        }
    );

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
                { translateX: -SCREEN_WIDTH / 2 },
                { translateY: -SCREEN_HEIGHT / 2 },
                { scale: scale.value },
                { translateX: -focalX.value },
                { translateY: -focalY.value },
                { translateX: SCREEN_WIDTH / 2 },
                { translateY: SCREEN_HEIGHT / 2 },
            ],
        };
    });

    const focalPointStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value }
            ],
        };
    });

    return (
        <GestureDetector gesture={pinchGesture}>
            <Animated.View style={{ flex: 1 }}>
                <AnimatedImage
                    style={[{flex: 1}, rStyle]}
                    source={{ uri: imageUri }}
                />
                <Animated.View style={[styles.focalPoint, focalPointStyle]} />
            </Animated.View>
        </GestureDetector>
    );
}
const styles = StyleSheet.create({

    focalPoint: {
        ...StyleSheet.absoluteFillObject,
        width: 20,
        height: 20,
        borderRadius: 10,
    },
});
