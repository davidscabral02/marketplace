import * as yup from 'yup';
import { Platform } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  Center,
  VStack,
  Heading,
  ScrollView,
  KeyboardAvoidingView,
  useToast,
} from 'native-base';

import Logo from '@assets/logo.svg';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';
import { useState } from 'react';

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos'),
});

export const SignIn = () => {
  const toast = useToast();
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signInSchema) });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSingIn = async ({ email, password }: FormDataProps) => {
    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.log(error);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível entrar na sua. Tente novamente mais tarde';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      flex={1}
      bg="gray.700"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Center
          flex={1}
          bg="gray.600"
          alignItems="center"
          borderBottomLeftRadius={24}
          borderBottomRightRadius={24}
        >
          <Logo height={100} width={100} />
          <Heading mt={-4} color="gray.100" size="xl" fontFamily="heading">
            marketspace
          </Heading>
          <Text mb={12} color="gray.300" fontSize="sm">
            Seu espaço de compra e venda
          </Text>

          <Center w="full" px={8}>
            <Text mb={4} color="gray.200" fontSize="sm">
              Acesse sua conta
            </Text>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="E-mail"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  keyboardType="email-address"
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  isPasswordInput
                  placeholder="Senha"
                  returnKeyType="send"
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                  onSubmitEditing={handleSubmit(handleSingIn)}
                />
              )}
            />
            <Button
              my={4}
              title="Entrar"
              variant="blue"
              isLoading={isLoading}
              onPress={handleSubmit(handleSingIn)}
            />
          </Center>
        </Center>

        <VStack py={12} px={8}>
          <Center bg="gray.700">
            <Text>Ainda não tem acesso?</Text>
            <Button
              mt={4}
              mb={8}
              title="Criar uma conta"
              onPress={() => {
                navigation.navigate('signUp');
              }}
            />
          </Center>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
