import { useState } from 'react'
import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false) //efeito de loading
  const [patrimony, setPatrimony] = useState('') //id do equipamento
  const [description, setDescription] = useState('') //descrição do problema no chamado
  const navigation = useNavigation()

  const handleNewOrderRegister = () => {
    if (!patrimony || !description) { //se 'patrimony' OU 'desciption' estiverem 'null' (sem valor) então retorna o Alert abaixo
      return Alert.alert('Registrar', 'Preencha todos os campos')
    }

    setIsLoading(true)

    firestore()
      .collection('orders') //crio a coleção e dou nome de 'orders' -> se a coleção existir anteriormente dentro do meu firebase-firestore ele cria essa coleção automaticamente
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp
      }) //aqui eu passo o conteúdo do que eu quero adicionar -> no status eu passo se o 'chamado' está 'open' ou 'closed', e por padrão eu passei ele como 'open'; No 'created_at: firestore.FieldValue.serverTimestamp' eu uso o 'firebase' p/ falar a hora atual do chamado (função nativa do 'firestore')
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso.')
        navigation.goBack()
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
        return Alert.alert('Solicitação', 'Não foi possível registrar o pedido.')
      })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova Solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}