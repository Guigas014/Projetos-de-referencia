import React from 'react'; 
import { Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { Keyframe } from 'react-native-reanimated';
 
import { styles } from './styles';  


export function Message() { 

  //Animação usando Keyframe. Como no CSS. (1° Maneira)
  const enteringKeyframe = new Keyframe({
    0: {
      opacity: 0,
      transform : [
        { translateY: -100 }
      ]
    },
    70: {
      opacity: 0.3,
    },
    100: {
      opacity: 1,
      transform : [
        { translateY: 0 }
      ]
    }
  });  

  //Animação usando Keyframe. Como no CSS. (2° Maneira)
  const exitingKeyframe = new Keyframe({
    from: {
      opacity: 1,
      transform: [
        { translateY: 0 }
      ]
    },
    to: {
     opacity: 0,
      transform: [
        { translateY: -100 }
      ]
    }
  });


  return ( 
    <Animated.View 
      style={styles.container}
      entering={enteringKeyframe.duration(500)}
      exiting={exitingKeyframe}
    >
      <MaterialIcons 
        name="notifications"
        color="#FFF"
        size={18}
      />

      <Text style={styles.title}>
        Hello ReactNative
      </Text>
    </Animated.View>
  ); 
}
