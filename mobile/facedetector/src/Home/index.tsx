import { useEffect, useState } from 'react';
import { View, ImageSourcePropType } from 'react-native';
import { Camera, CameraType, FaceDetectionResult } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import neutral from '../assets/neutral.png';
import smiling from '../assets/smiling.png';
import winking from '../assets/winking.png';
import sunsglasses from '../assets/sunglasses.png';

import { styles } from './styles';


export function Home() {
  const [faceDetected, setFaceDetected] = useState(false);
  const [emoji, setEmoji] = useState<ImageSourcePropType>(neutral); 

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const faceValues = useSharedValue({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });  


  function handleFacesDetected({ faces }: FaceDetectionResult) {
    const face = faces[0] as any;

    if (face) {
      const { size, origin } = face.bounds;

      faceValues.value = {
        width: size.width,
        height: size.height,
        x: origin.x,
        y: origin.y
      }

      setFaceDetected(true);

      if (face.smilingProbability > 0.5) {
        setEmoji(smiling);
      }
      else if (face.leftEyeOpenProbability > 0.5 && face.rightEyeOpenProbability < 0.5) {
        setEmoji(winking);
      }
      else if (face.leftEyeOpenProbability < 0.5 && face.rightEyeOpenProbability > 0.5) {
        setEmoji(sunsglasses);
      }
      else {
        setEmoji(neutral);
      }
    }
    else {
      setFaceDetected(false);
    }

    //console.log(faces)
  }

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    zIndex: 1,
    width: faceValues.value.width + 90,
    height: faceValues.value.height - 10,
    left: -40,
    transform: [
      { translateX: faceValues.value.x },
      { translateY: faceValues.value.y },
    ],
    //borderColor: 'blue',
    //borderWidth: 10
  }));

  useEffect(() => {
    requestPermission();
  }, []);
   
  if (!permission?.granted) {
    return;
  }


  return (
    <View style={styles.container}>
      { faceDetected && 
        <Animated.Image 
          style={animatedStyle}
          source={emoji}
        />
      }

      <Camera 
        style={styles.camera} 
        type={CameraType.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
    </View>
  );
}

