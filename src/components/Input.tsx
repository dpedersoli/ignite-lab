import { Input as InputNativeBase, IInputProps } from 'native-base'; //vou usar o 'Input' do native-base mas vou nomeá-lo como 'InputNativeBase', por isso uso o 'as'

export const Input = ({ ...rest }: IInputProps) => { //vai pegar TODAS as propriedas a mais que eu passar (onde estiver chamando o component) e vai aplicar individual e exclusivamente no component aplicado; ": IInputProps" é eu definindo que todas as propriedades que eu receber aqui serão do tipo 'IInputProps' (coisa do TS) -> faço isso para poder usar o 'NativeBase' sem dar conflito, pois até então ele só aceitava string/texto como propriedade do component, agora ele receberá também 'números' ({12}) (coisa de TS)
  return (
    <InputNativeBase
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
        bg: "gray.700"
      }}
      {...rest}
    />
  );
}