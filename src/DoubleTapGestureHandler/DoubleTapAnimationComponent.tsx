import React, {useCallback} from 'react';
import {Image, ImageBackground, StyleSheet, View,} from 'react-native';
import {Gesture, GestureDetector,} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming,} from 'react-native-reanimated';
import {SCREEN_WIDTH} from "../utils";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const DoubleTapAnimationComponent = () => {

    const scale = useSharedValue(0);
    const opacity = useSharedValue(1);

    const singleTap = Gesture.Tap()
        .maxDelay(100)
        .onEnd((_event, success) => {
            if (success) {
                console.log('singleTap!');
            }
        })
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd((event, success) => {
            if (success) {
                scale.value = withSpring(1, undefined, (isFinite) => {
                    if (isFinite) scale.value = withDelay(350, withSpring(0))
                })
            }

        })


    const rStyle = useAnimatedStyle(() => ({
        transform: [{scale: Math.max(scale.value, 0)}],
    }));

    const rBackgroundStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const onDoubleTap = useCallback(() => {
        scale.value = withSpring(1, undefined, (isFinished) => {
            if (isFinished) {
                scale.value = withDelay(500, withSpring(0));
            }
        });
    }, []);

    const onSingleTap = useCallback(() => {
        opacity.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished) {
                opacity.value = withDelay(500, withTiming(1));
            }
        });
    }, []);

    const imageShadow = {shadowOffset: {width: 0, height: 20}, shadowOpacity: 0.3, shadowRadius: 35}

    return (

        <View style={styles.container}>
            <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
                <ImageBackground source={require('../../assets/image.jpeg')} style={[styles.image]}>
                    <AnimatedImage resizeMode={'center'} style={[styles.image, imageShadow, rStyle]}
                                   source={require('../../assets/heart.png')}/>
                </ImageBackground>
            </GestureDetector>
        </View>

    );
}

//type me a fun

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
    },
    turtles: {fontSize: 40, textAlign: 'center', marginTop: 30},
});
