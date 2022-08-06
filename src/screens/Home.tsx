import { useState, useEffect } from 'react'; //usando o 'useEffect' p/ renderizar a página a cada nova 'solicitação'
import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore' //importação do firestore p/ buscar dele os dados
import { useNavigation } from '@react-navigation/native'
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut } from 'phosphor-react-native'
import { ChatTeardropText } from 'phosphor-react-native'

import { dateFormat } from '../utils/firestoreDateFormate'

import Logo from '../assets/logo_primary.svg'

import { Filter } from '../components/Filter'
import { Button } from '../components/Button'
import { Loading } from '../components/Loading'
import { Order, OrderProps } from '../components/Order'

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true) //eu deixeo 'true' pois no momento que a tela está abrindo ele já verá o 'loading'
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation()
  const { colors } = useTheme()

  const handleNewOrder = () => {
    navigation.navigate('new')
  }

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate('details', { orderId })
  }

  const handleLogout = () => {
    auth()
      .signOut()
      .catch(err => {
        console.error(err)
        return Alert.alert('Sair', 'Não foi possível deslogar.')
      });
  }

  useEffect(() => {
    setIsLoading(true); //quando eu trocar o filtro ('em andamento' / 'finalizados') eu vou fazer uma nova requisição e issoa precisa do 'laoding' ativo na tela

    const subscriber = firestore() //requisito que "vai no firestore, dentro da coleção 'orders' e faça um filtro como o abaixo ('.where')"
      .collection('orders')
      .where('status', '==', statusSelected) //faça o filtro e peque as cosias onde o 'status' seja '==' ao valor de 'statusSelected' (que é 'open'/'closed')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { patrimony, description, status, created_at } = doc.data()

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at)
          } //vou retornar para o 'data' o conjunto de dados que quero utilizar
        })//'onSnapshot' atualiza os dados em tempo real dentro da aplicação sem o usuário precisar fazer nada -> no caso eu acesso todos os 'docs' (documentos) dentro do 'snapshot' e passo um 'map' neles (array), e para cada item percorrido dentro do 'data' (no caso 'doc.data' pelo parâmetro passado) eu farei isso sobre as infos dentro de 'patrimony, description, status, created_at'

        setOrders(data)
        setIsLoading(false)
      }) // passo o valor da var 'data' p/ dentro do 'setOrders' e determino o 'loading' como 'false'

    return subscriber
  }, [])

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut
            size={26}
            color={colors.gray[300]}
          />}
          onPress={handleLogout}
        />

      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Solicitações
          </Heading>
          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            title="em andamento"
            type="open"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />

          <Filter
            title="finalizados"
            type="closed"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>
        {
          isLoading
            ? <Loading />
            : <FlatList
              data={orders}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={() => (
                <Center>
                  <ChatTeardropText color={colors.gray[300]} size={40} />
                  <Text color="gray.300" fontSize="xl" mt={6} textAlign="center" >
                    Você ainda não possui {'\n'}
                    solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                  </Text>
                </Center>
              )}
            />
        }
        <Button title="Nova Solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}