import { useState, useEffect } from 'react';
import { Alert, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';


export default function App() {
  const [text, setText] = useState('');
  const [img, setImg] = useState<string | undefined>();
  

  async function handleCopyToClipboard() {
    await Clipboard.setStringAsync(text);
  }

  async function handlePasteToClipboard() {
    const response = await Clipboard.getStringAsync();

    setText(response);
    //Alert.alert(response);
  }

  async function handleImageToClipboard() {
    const response = await Clipboard.getImageAsync({ format: 'png' });
    setImg(response?.data);
  }

  useEffect(() => {
    //Isso é um Listener, fica apenas escutando a ação do Clipboard.
    //Por isso é necessário um return para limpar o Listener.
      const subscription = Clipboard.addClipboardListener(({
        contentTypes
      }: Clipboard.ClipboardEvent) => {
    
      Alert.alert('Copiado!', `Conteúdo do tipo: ${contentTypes}`);
    });

    return  () => Clipboard.removeClipboardListener(subscription);
  }, []);
  


  return (
    <View style={styles.container}>
      <Image 
        style={styles.img}
        source={{ uri: img }}
      />

      <TextInput style={styles.input}  onChangeText={setText} value={text} />

      <View style={styles.options}>
        <TouchableOpacity style={styles.button} onPress={handleCopyToClipboard}>
          <MaterialIcons name="content-copy" size={24} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePasteToClipboard}>
          <MaterialIcons name="content-paste" size={24} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleImageToClipboard}>
          <MaterialIcons name="image" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

