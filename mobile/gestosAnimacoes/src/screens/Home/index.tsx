import { useEffect, useState } from 'react'; 
import { View, Button, Alert } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withTiming,
  Easing,
  withSpring,
  runOnJS 
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import { Ball } from '../../components/Ball';

import { styles } from './styles';  


export function Home() {
  const [isActive, setIsActive] = useState(false);
  

  //Variável compartilhada com o javascript. 
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const position = useSharedValue(0);


  //Chama a animação ao clicar no botão.
  function handleAnimation() {
    if (scale.value === 1) {
      scale.value = withTiming(1.5, { duration: 2000, easing: Easing.bounce });
    }
    else {
      scale.value = withSpring(1);
    }
  }  

  //Cria o gesto. Nesse caso "dois toques".
  const onTop = Gesture
    .Tap()
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(Alert.alert)("Toque", "Você tocou no botão!")
    })

  //Cria o gesto. Nesse caso "toque longo".
  const onLongPress = Gesture
    .LongPress()
    .minDuration(200)
    .onStart(() => {
      scale.value = withTiming(1.5); 
    })
    .onEnd((event) => {
      scale.value = withTiming(1);

      console.log(event.duration)
    })

    //Cria o gesto. Nesse caso "rotação com dois dedos".
    const onRotation = Gesture
      .Rotation()
      .onUpdate((event) => {
        rotation.value = event.rotation; 
      })
      .onEnd(() => {
        rotation.value = withTiming(0);
      })

    //Cria o gesto. Nesse caso "pinça".
    const onPinch = Gesture
      .Pinch()
      .onUpdate((event) => {
        scale.value = event.scale; 
      })

    //Cria o gesto. Nesse caso "carregar".
    const onPan = Gesture
      .Pan()
      .onStart(() => {
        runOnJS(setIsActive)(true);  
      })
      .onUpdate((event) => {
        position.value = event.translationX; 
      })
      .onEnd(() => {
        position.value = withTiming(0);
        runOnJS(setIsActive)(false);  
      })


  //Estilização animada.
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateZ: `${(rotation.value / Math.PI) * 180}deg` },
      { translateX: position.value } 
    ]
  }));

      //<GestureDetector gesture={onPan}>

	return ( 
    <View style={styles.container}>
    <GestureDetector gesture={onPan}>
      <Animated.View style={[animatedStyle, { zIndex: 1 }]}> 
        <Ball isActive={isActive} />
      </Animated.View>
    </GestureDetector>
  
    <Button title="Zoom + / -" onPress={handleAnimation}/>

    {/**
      <GestureDetector gesture={Gesture.Simultaneous(onLongPress, onPan)}>
        <Animated.View style={[styles.element, animatedStyle]} />
      </GestureDetector>

      <Button title="Animar" onPress={handleAnimation}/>
    */}
    </View>  

	); 

}
