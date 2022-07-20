//rotas disponíveis se o usuário não está logado (direciona para tela de login); rotas para direcionar o usuário para qualquer outra tela (Home) que não seja a tela de 'Login'

import { createNativeStackNavigator } from '@react-navigation/native-stack' //'createNativeStackNavigator' serve para criar as rotas de navegação para a aplicação

import { Home } from '../screens/Home'
import { Details } from '../screens/Details'
import { Register } from '../screens/Register'

const { Navigator, Screen } = createNativeStackNavigator(); //do 'createNativeStackNavigator' eu acesso o 'Navigator' (passo configurações para as rotas), e o 'Screen' são as telas, que são colocadas dentro do 'Navigator'

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {/* dentro de 'screenOptions' posso definir várias coisas, neste caso eu defini que não exibirá o nome da página no topo da mesma ('headerShow: false') */}
      <Screen name="home" component={Home} />
      <Screen name="new" component={Register} />
      <Screen name="details" component={Details} />
      {/*Em 'Screen' eu passo o nome da rota em 'name' e o que será renderizado quando essa rota for chamada eu passo eu 'component' (juntamente da imporntação do arquivo '.tsx')*/}
    </Navigator>
  );
}