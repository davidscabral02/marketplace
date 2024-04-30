import { Center, Spinner, useTheme } from 'native-base';

export const Loading = () => {
  const { colors } = useTheme();

  return (
    <Center flex={1}>
      <Spinner color={colors.blue[500]} />
    </Center>
  );
};
