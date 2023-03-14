import { useEffect } from 'react'; 
import { 
  Canvas, 
  Circle, 
  Paint, 
  BlurMask, 
  useValue, 
  Group, 
  runTiming,
  Easing,
  useSharedValueEffect 
} from '@shopify/react-native-skia';
import { useSharedValue, withRepeat,withTiming } from 'react-native-reanimated';
 

const COLOR = "#664AFF";

type Props = {
  isActive: boolean;
}

export function Ball({ isActive }: Props) { 
  const circleRadiusOneSharedValue = useSharedValue(60);

  const blur = useValue(0);
  const circleRadiusOne = useValue(60);
  const circleRadiusTwo = useValue(40);
  const circleRadiusThree = useValue(20);

  useSharedValueEffect(() => {
    circleRadiusOne.current = circleRadiusOneSharedValue.value;
  }, circleRadiusOneSharedValue)

  useEffect(() => {
    if (isActive) {
      circleRadiusOneSharedValue.value = withRepeat(
        withTiming(100, {duration: 1000}),
        -1,
        true
      ); 

      runTiming(blur, 2, { easing: Easing.bounce });
      runTiming(circleRadiusOne, 80, { easing: Easing.elastic(3), duration: 900 });
      runTiming(circleRadiusTwo, 55, { easing: Easing.elastic(3), duration: 700 });
      runTiming(circleRadiusThree, 25, { easing: Easing.elastic(3), duration: 500 });

    } else {
      circleRadiusOneSharedValue.value = withTiming(60);

      runTiming(blur, 0, { easing: Easing.bounce });
      runTiming(circleRadiusOne, 60, { easing: Easing.elastic(3), duration: 900 });
      runTiming(circleRadiusTwo, 45, { easing: Easing.elastic(3), duration: 700 });
      runTiming(circleRadiusThree, 20, { easing: Easing.elastic(3), duration: 500 });

    }
  }, [isActive]);
  

  return ( 
    <Canvas style={{ width: 200, height: 200 }}>
      <Group opacity={0.8}>
        <Circle cx={100} cy={100} r={circleRadiusOne} color={COLOR}>
          <BlurMask blur={blur} style="normal" />
        </Circle>

        <Circle cx={100} cy={100} r={circleRadiusTwo} color={COLOR}>
          <BlurMask blur={blur} style="normal" />
        </Circle>
      </Group>

      <Circle cx={100} cy={100} r={circleRadiusThree} color={COLOR}>
        <BlurMask blur={blur} style="normal" />
        <Paint style="stroke" strokeWidth={10} color="white" opacity={0.5} />
      </Circle>
    </Canvas>
  ); 
}
