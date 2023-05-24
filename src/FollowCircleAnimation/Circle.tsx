
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'

const height = 80

export const Circle: React.FC<{rStyle?: any, style?: any}> = ({rStyle, style}) => {
  return (
    <Animated.View style={[s.circle, rStyle, style]}/>

  )
}


const s = StyleSheet.create({
    circle: {
        position: 'absolute',
        height: height,
        aspectRatio: 1,
        backgroundColor: 'blue',
        borderRadius: height / 2,
        opacity: 0.8
      }
})
