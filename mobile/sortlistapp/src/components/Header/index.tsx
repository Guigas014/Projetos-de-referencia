import { View, Text } from 'react-native';
 
import { styles } from './styles';  


export function Header() { 

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>
        Categorias
      </Text>

      <Text style={styles.subtitle}>
        Defina a sequência de assuntos que você mais gosta no topa da lista.
      </Text>
    </View>
  ); 
}
