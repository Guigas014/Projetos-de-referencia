import { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy 
} from 'expo-location';

import { styles } from './styles';


export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  
  //Faz referência a algum componente. Funciona quase como um AddEventListener.
  const mapRef = useRef<MapView>(null);


  //Pede a permissão do usuário para usar sua localização.
  async function requestForegroundPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);

      //console.log(currentPosition);
    }
  }

  useEffect(() => {
   requestForegroundPermissions();
  }, []);
  
  //Observa se houve alguma alteração na localização do usuário.
  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
      mapRef.current?.animateCamera({
        pitch: 70,
        center: response.coords
      })

      console.log("Nova localização:", response);
    });  
  }, []);


  return (
    <>
      <StatusBar 
        backgroundColor="#00000033"
        translucent
        style="light"
      />

      <View style={styles.container}>
        {
          location &&
            <MapView 
              ref={mapRef}
              style={styles.map} 
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }}
            >
              <Marker 
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              />
            </MapView>
        }
      </View>
    </>
  );
}

