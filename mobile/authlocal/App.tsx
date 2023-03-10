import { useState, useEffect } from 'react'; 
import { Text, View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import { styles } from './styles';


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Verifica se o aparelho é compativel com a autenticação.
  async function verifyAvailableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    //Mostra quais as opções de autenticação.
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(types.map(type => LocalAuthentication.AuthenticationType[type]));
  }

  async function handleAuthentication() {
    //Verifica se existe uma biometria cadastrada no dispositivo.
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    //console.log(isBiometricEnrolled);
    
    if (!isBiometricEnrolled) {
      return Alert.alert(
        'Login', 
        'Nenhuma biometria encontrada. Por favor, cadastre uma no dispositivo!'
      )
    }

    //Inicia a autenticação
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecida'
    });

    //console.log(auth);
    setIsAuthenticated(auth.success);
  }  

  useEffect(() => {
    verifyAvailableAuthentication(); 
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Usuário conectado: { 
          isAuthenticated ? 
            <Text style={{ color: "green", fontSize: 18 }}>Sim</Text>
          : 
            <Text style={{ color: "red", fontSize: 18 }}>Não</Text>
          }
      </Text>

      <Button
        title="Entrar"
        onPress={handleAuthentication} 
      />      

    </View>
  );
}

