import { useState, useCallback } from 'react';
import { View, ActivityIndicator, useWindowDimensions, Alert } from 'react-native'; 
import YoutubeIframe, { PLAYER_STATES }  from 'react-native-youtube-iframe';
import * as ScreenOrientation from 'expo-screen-orientation';

import { styles, VIDEO_HEIGHT, SCREEN_SPACE } from './styles'; 
 


export function Home() { 
  const [videoReady, setVideoReady] = useState(false);
  
  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width - (SCREEN_SPACE * 2);

  //Muda a orientação da tela do telelfone;
  const onFullScreenChange = useCallback((FullScreen: boolean) => {
    if (FullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }   
    else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);
  
  //Trabalha com o estado do vídeo rodando, pausado ...
  const onChangeState = useCallback((state: string) => {
    if (state === PLAYER_STATES.ENDED) {
      Alert.alert("E ai, curtiu?", "Não deixe de curtir, comentar e seguir o canal!!");
    }
  }, []);
  


	 return ( 
    //O id do vídeo foi retirado da url do vídeo no youtube.

    <View style={styles.container}> 
      <View style={styles.player}>
        <YoutubeIframe 
          videoId="sEFCFgsHouo"
          width={VIDEO_WIDTH}
          height={videoReady ? VIDEO_HEIGHT: 0}
          onReady={() => setVideoReady(true)}
          onFullScreenChange={onFullScreenChange}
          onChangeState={onChangeState}
        />

        { !videoReady && <ActivityIndicator  color="red" /> } 

      </View>
    </View>

	 ); 

}
