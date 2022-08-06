import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore' //'FirebaseFirestoreTypes' me permite usar as tipagens do próprio firestore

export const dateFormat = (timestamp: FirebaseFirestoreTypes.Timestamp) => { //paso o tipo dodo como 'FirebaseFirestoreTypes.Timestamp' a partir do 'timestamp'
  if (timestamp) {
    const date = new Date(timestamp.toDate()) //'toDate()' passa uma data entendível p/ o JS

    const day = date.toLocaleDateString('pt-BR')
    const hour = date.toLocaleDateString('pt-BR')

    return `${day} às ${hour}`;
  }
}