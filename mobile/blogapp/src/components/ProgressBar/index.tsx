import { useEffect } from 'react'; 
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeOut,
  ZoomInDown 
} from 'react-native-reanimated';

import { styles } from './styles'; 
 

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity);

type Props = {
  value: number;
  
  //recebe uma função que está escrita em outro componente ou página,
  //pois existe algum dado lá que é necessário para a ação aqui.
  onMoveTop: () => void;
}

export function ProgressBar({ value, onMoveTop }: Props) { 
  //Deixa o campo da scrollbar dinamico.
  const widthContainer = useSharedValue(200); 
  
  //Descobre se o scroll chegou ao fim (95%).
  const endReached = value >= 95;

  //Cria o estilo animado do width do campo do scroll.
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: widthContainer.value
    }
  });

  useEffect(() => {
    widthContainer.value = withSpring(endReached ? 56 : 200, { mass: 0.4 }); 
  }, [value]);
   


  return ( 
    <Animated.View style={[styles.container, animatedStyle]}>
      {
        endReached ?
          <TouchableOpacityAnimated
            entering={ZoomInDown}
            exiting={FadeOut}
            onPress={onMoveTop}
          >
            <Feather name="arrow-up" size={24} color="#C4C4CC" />
          </TouchableOpacityAnimated> 
        :
          <Animated.View 
            style={styles.progressContent}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Text style={styles.value}>
              {value.toFixed(0)}%
            </Text>

            <View style={styles.tracker}>
              <View style={[styles.progress, { width: `${value}%` }]} />
            </View>
          </Animated.View>
      }
    </Animated.View>    
	); 

}
