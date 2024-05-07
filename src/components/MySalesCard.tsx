import {
  HStack,
  Heading,
  Pressable,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import { ArrowRight, Tag } from 'phosphor-react-native';

export const MySalesCard = () => {
  const { colors } = useTheme();

  return (
    <VStack px={4} mt={6}>
      <Text color="gray.300" fontSize="sm" fontFamily="body">
        Seus produtos anunciados para venda
      </Text>
      <HStack
        mt={2}
        py={6}
        px={4}
        w="full"
        rounded="sm"
        alignItems="center"
        bgColor="blue.700:alpha.10"
      >
        <Tag size={24} color={colors.blue[500]} />
        <VStack flex={1} ml={4}>
          <Heading color="gray.200" fontSize="lg" fontFamily="heading">
            2
          </Heading>
          <Text color="gray.200" fontSize="sm" fontFamily="body">
            anúncios ativos
          </Text>
        </VStack>

        <Pressable>
          <HStack alignItems="center">
            <Heading mr={1} color="blue.500" fontSize="sm" fontFamily="heading">
              Meus anúncios
            </Heading>
            <ArrowRight size={20} color={colors.blue[500]} />
          </HStack>
        </Pressable>
      </HStack>
    </VStack>
  );
};
