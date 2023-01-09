import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { styles } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { HeaderForm } from '../../components/HeaderForm';

export function Form() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [password , setPassword] = useState("");

  //chave:valor
  const { setItem, getItem } = useAsyncStorage("@savepass:passwords");  


  async function handleNew() {
    try {
      const id = uuid.v4();

      const newData = {
        id,
        name,
        user,
        password
      }

      //Busca no AsyncStorage os dados armazenados anteriormente.
      //const response = await AsyncStorage.getItem("@savepass:passwords");
      const response = await getItem();
      const previousData = response ? JSON.parse(response) : [];

      //Adiciona os dados novos aos dados já armazenados.
      const data = [...previousData, newData];

      //Armazena as informações como texto. Usa a estratégia chave/valor.
      //@nomeDaAplicação:nomeDoSchema (Formato da chave)
      //await AsyncStorage.setItem("@savepass:passwords", JSON.stringify(data));
      await setItem(JSON.stringify(data));

      Toast.show({
        type: "success",
        text1: "Cadastrado com sucesso!"
      });
      
    } catch (error) {
      //Esse console serve só para o dev!!
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Não foi possível cadastrar!"
      });
    }
  }  



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>

          <HeaderForm />

          <View style={styles.form}>
            <Input
              label="Nome do serviço"
              onChangeText={setName}
            />
            <Input
              label="E-mail ou usuário"
              autoCapitalize="none"
              onChangeText={setUser}
            />
            <Input
              label="Senha"
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Salvar"
              onPress={handleNew}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView >
  );
}
