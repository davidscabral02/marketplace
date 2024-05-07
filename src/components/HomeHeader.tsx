import { Plus } from 'phosphor-react-native';
import { HStack, Heading, Image, Text, VStack, useTheme } from 'native-base';

import { Button } from '@components/Button';

export const HomeHeader = () => {
  const { colors } = useTheme();
  return (
    <HStack
      px={4}
      pt={4}
      pb={4}
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack>
        <Image
          w={12}
          h={12}
          rounded="full"
          borderWidth={3}
          alt="Foto do usuário"
          borderColor="blue.700"
          source={{ uri: 'https://github.com/davidscabral02.png' }}
        />
        <VStack ml={2}>
          <Text color="gray.100" fontSize="md">
            Boas vindas,
          </Text>
          <Heading color="gray.100" fontSize="md" fontFamily="heading">
            Nome!
          </Heading>
        </VStack>
      </HStack>

      <HStack w={160}>
        <Button
          variant="black"
          title="Criar anúncio"
          leftIcon={<Plus size={16} color={colors.white} />}
        />
      </HStack>
    </HStack>
  );
};
