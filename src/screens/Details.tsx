import { useRoute } from '@react-navigation/native'
import { Text, VStack } from 'native-base';

import { Header } from '../components/Header';

type RouteParams = { //aqui eu passo a tipagem dos parâmetros da rota pasada
  orderId: string;
}

export const Details = () => {
  const route = useRoute();
  const { orderId } = route.params as RouteParams; //aqui eu acesso os parâmetros passados para a rota

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="solicitação" />
      <Text color="white">
        {orderId}
      </Text>
    </VStack>
  );
}