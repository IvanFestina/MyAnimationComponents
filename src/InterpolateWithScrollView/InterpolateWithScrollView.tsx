import {View, StyleSheet} from "react-native";
import Animated, {useAnimatedScrollHandler, useSharedValue} from "react-native-reanimated";
import {Page} from "./Page";

export const InterpolateWithScrollViewComponent = () => {

    const translateX = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler((e => {
            translateX.value = e.contentOffset.x
        console.log(e.contentOffset.x)
    })
        // we want to fire onScroll method each 16 milliseconds
    )

    const WORDS = ["What's", "Up", "Down", "Left", "Right"]
    return (
        <Animated.ScrollView
            pagingEnabled
            style={s.container}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            horizontal
        >
            {
                WORDS.map((title, index) => {
                    return (
                        <Page
                            key={index.toString()}
                            index={index}
                            title={title}
                            translateX={translateX}
                        />
                    )
                })
            }
        </Animated.ScrollView>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})
