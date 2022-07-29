import { useState, useEffect } from 'react' //'useEffect' é executado quando a interface é renderizada

import { NavigationContainer } from '@react-navigation/native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth' //'FirebaseAuthTypes' já tem a tipagem, então não preciso criar uma nova 

import { Loading } from '../components/Loading'

import { SignIn } from '../screens/SignIn'
import { AppRoutes } from './app.routes'

export const Routes = () => {
  const [loading, setIsLoading] = useState(true) //estado de carregamentoa -> deve começar carregando (true)
  const [user, setUser] = useState<FirebaseAuthTypes.User>() //aqui determino a tipagem do dado como a determina em 'FirebaseAuthTypes' dentro de '.User' -> se o usuário estiver logado terá algo aqui, se não, não terá nada

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(response => {
      setUser(response);
      setIsLoading(false)
    }) // 'auth().onAuthStateChanged(res)' vai ficar observando se o usuário está autenticado ou não -> e se tiver ele vai armazenar ela dentro do 'setUser'

    return subscriber; //assim que o 'useEffect' processar toda a lógica ele aplica a "limpeza" da memória
  }, []) //dentro do array eu deixo o que estará sendo observado pelo 'useEffect' -> e toda vez que o conteúdo sinalizado dentro da array for alterado o 'useEffect' será acionado/executado

  if (loading) { //se ainda não estiver autenticado ele permanece com o component 'Loading' na tela
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
      {/*Se o usuário exixtir (true) ele irá carregar o 'AppRoutes', se não, permanece na tela de login 'SignIn'*/}
    </NavigationContainer>
  )
}