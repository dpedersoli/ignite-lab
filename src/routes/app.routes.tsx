//rotas disponíveis se o usuário não está logado (direciona para tela de login); rotas para direcionar o usuário para qualquer outra tela (Home) que não seja a tela de 'Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack' //serve para criar as rotas de nagegação para a aplicação

import { Home } from '../screens/Home'
import { Details } from '../screens/Details'
import { Register } from '../screens/Register'

const { Navigator, Screen } = createNativeStackNavigator();