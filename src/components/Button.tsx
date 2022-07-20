import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
  title: string;
} //Defini que 'Props' é igual à tudo o que tem dentro de IButtonProps e a essa tipagem customizada que estou criando aqui (coisa de TS com native-base)

export const Button = ({ title, ...rest }: Props) => {
  return (
    <ButtonNativeBase
      bg="green.700"
      h={14}
      fontSize="small"
      rounded="sm"
      _pressed={{
        bg: "green.500"
      }}
      {...rest}
    >
      <Heading
        color="white"
        fontSize="sm"
      >
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}