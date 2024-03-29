import { useCallback, useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { Card, CardProps } from '../../components/Card';
import { HeaderHome } from '../../components/HeaderHome';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import { Button } from '../../components/Button';

export function Home() {
  const [data, setData] = useState<CardProps[]>([]);

  const { getItem, setItem, removeItem } = useAsyncStorage("@savepass:passwords");  


  async function handleFetchData() {
    //const response = await AsyncStorage.getItem("@savepass:passwords"); 
    const response = await getItem(); 
    const data = response ? JSON.parse(response) : [];
    console.log(data);
  
    setData(data);
  }

  async function handleRemove(id: string) {
    const response = await getItem();
    const previousData = response ? JSON.parse(response) : [];

    const data = previousData.filter((item: CardProps) => item.id !== id);
    setItem(JSON.stringify(data)); 
    setData(data);
  }

  async function handleRemoveAll() {
    const response = await getItem();
    
    if (response === null) {
      removeItem(); 
      setData(data);
      
      Toast.show({
        type: "success",
        text1: "Lista apagada!!"
      });
    }
        
    Toast.show({
      type: "info",
      text1: "A lista já está vazia!"
    });
  }



  //A tela será atualiza quando aparecer. 
  useFocusEffect(useCallback(() => {
    handleFetchData(); 
  }, []));
    


  return (
    <View style={styles.container}>
      <HeaderHome />

      <View style={styles.listHeader}>
        <Text style={styles.title}>
          Suas senhas
        </Text>

        <Text style={styles.listCount}>
          {`${data.length} ao total`}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) =>
          <Card
            data={item}
            onPress={() => handleRemove(item.id)}
          />
        }
      />

      <View style={styles.footer}>
        <Button
          title="Limpar lista"
          onPress={() => handleRemoveAll()}
        />
      </View>
    </View>
  );
}
