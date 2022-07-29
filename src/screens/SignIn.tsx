import { useState } from 'react'
import { Alert } from 'react-native'

import auth from '@react-native-firebase/auth' //importando o uso do Firebase

import { VStack, Heading, Icon, useTheme } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'

import Logo from '../assets/logo_primary.svg'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false) //loading
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { colors } = useTheme()

  function handleSignIn() { //faço aqui o handle do 'auth'
    if (!email || !password) { //se e-mail OU senha é nulo irá emitir um alerta
      return Alert.alert('Entrar', 'Informe e-mail e senha');
    }
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.error(error)
        setIsLoading(false);

        if (error.code == 'auth/invalid-email') { //a rota de 'auth/invalid-email' é uma das rotas de retorno de erro do firebase dentro do '.code', que no caso é do e-mail invávalido (existem muitas outras, e o ideal é setar todas as possibilidades dentro do 'error.code')
          return Alert.alert('Entrar', 'Email inválido.') //a primeira aspas 'Entrar' seria o título do Alert do react-native, e a segunda aspas é o texto dentro do alert
        }

        if (error.code == 'auth/wrong-password') {
          return Alert.alert('Entrar', 'Email ou senha inválido.')
        }

        if (error.code == 'auth/user-not-found') {
          return Alert.alert('Entrar', 'Email ou senha inválido.')
        }

        return Alert.alert('Entrar', 'Não foi possível acessar')
      }) //'auth()' é a promise de autenticação do firebase

  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        mt={4}
        onPress={handleSignIn}
        isLoading={isLoading}
      />{/*o próprio componente do native-base tem uma propriedade (isLoading) para efeito de 'laoding' -> ele desabilita a possibilidade de clicar no botão novamente e gera o 'load'*/}

    </VStack>
  )
}