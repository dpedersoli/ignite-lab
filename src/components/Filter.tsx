import { Text, Button as ButtonNativeBase, IButtonProps, useTheme } from 'native-base';

type Props = IButtonProps & {
  title: string;
  isActive?: boolean;
  type: 'open' | 'closed'
}

export const Filter = ({ title, isActive = false, type, ...rest }: Props) => {
  const { colors } = useTheme();

  const colorType = type === 'open' ? colors.secondary[700] : colors.green[300]

  return (
    <ButtonNativeBase
      variant="outline"
      borderWidth={isActive ? 1 : 1}
      borderColor={isActive ? colorType : "gray.300"}
      bgColor="gray.600"
      flex={1}
      size="sm"
      {...rest}
    >
      <Text color={isActive ? colorType : "gray.300"} fontSize="xs" textTransform="uppercase">
        {title}
      </Text>

    </ButtonNativeBase>
  );
}