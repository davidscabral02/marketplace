import * as yup from 'yup';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Text,
  Image,
  Center,
  Heading,
  ScrollView,
  useTheme,
  VStack,
  Pressable,
  KeyboardAvoidingView,
  Skeleton,
  useToast,
} from 'native-base';

import Logo from '@assets/logo.svg';
import DefaultUserPhoto from '@assets/avatar.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { PencilLine } from 'phosphor-react-native';
import { ImageSourcePropType, Platform } from 'react-native';
import { useState } from 'react';
import { UserPhoto } from '@components/UserPhoto';
import { phoneMask, phoneUnmask } from '@utils/PhoneMask';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import axios from 'axios';

type FormDataProps = {
  tel: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
  passwordConfirm: string;
};

const signInSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  tel: yup
    .string()
    .required('Informe o número de telefone.')
    .min(13, 'O número deve seguir o formato +00 (00) 00000-0000'),
  avatar: yup.string().required('O avatar é obrigatório.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos'),
  passwordConfirm: yup
    .string()
    .required('Informe a senha novamente.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere.'),
});

const PHOTO_SIZE = 28;

export const SignUp = () => {
  const toast = useToast();
  const { colors } = useTheme();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
    defaultValues: { tel: '' },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset>();

  const handleSingUp = async ({
    tel,
    name,
    email,
    avatar,
    password,
  }: FormDataProps) => {
    setIsLoading(true);
    try {
      const phone = phoneUnmask(tel);
      const fileExtension = avatar.split('.').pop();

      // const photoFile = {
      //   uri: photo?.uri,
      //   name: `${name}.${fileExtension}`,
      //   type: `${photo?.type}/${fileExtension}`,
      // };
      const photoFile = {
        // uri: photo?.uri,
        type: `${photo?.type}/${fileExtension}`,
        avatar: `@${name}.${fileExtension}`.toLowerCase(),
      };
      const userPhotoUploadForm = new FormData();

      userPhotoUploadForm.append('avatar', avatar as unknown as Blob);
      userPhotoUploadForm.append('name', name);
      userPhotoUploadForm.append('email', email);
      userPhotoUploadForm.append('tel', tel);
      userPhotoUploadForm.append('password', password);

      await api.post(
        '/users/',
        {
          avatar: photoFile,
          name,
          email,
          tel: phone,
          password,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );
        if (
          photoInfo.exists &&
          photoInfo.size &&
          photoInfo.size / 1024 / 1024 > 5
        ) {
          return toast.show({
            placement: 'top',
            bgColor: 'red.500',
            title: 'Essa imagem é muito grande. Escolha uma imagem de até 5mb',
          });
        }

        toast.show({
          bg: 'green.500',
          placement: 'top',
          title: 'Foto selecionada com sucesso!',
        });

        setPhoto(photoSelected.assets[0]);

        return photoSelected.assets[0].uri;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Box flex={1} justifyContent="center">
          <Center px={8} mt={4}>
            <Logo height={80} width={80} />
            <Heading mb={2} color="gray.100" fontSize="lg" fontFamily="heading">
              Boas-vindas!
            </Heading>
            <Text color="gray.200" fontSize="sm" textAlign="center">
              Crie sua conta e use o espaço para comprar itens variados e vender
              seus produtos
            </Text>
          </Center>

          <Center w="full" px={8}>
            <Controller
              name="avatar"
              control={control}
              render={({ field: { onChange } }) => (
                <VStack mt={6} mb={8}>
                  {photoIsLoading ? (
                    <Skeleton
                      w={PHOTO_SIZE}
                      h={PHOTO_SIZE}
                      rounded="full"
                      borderWidth={3}
                      endColor="gray.400"
                      startColor="gray.500"
                      borderColor={colors.blue[700]}
                    />
                  ) : (
                    <UserPhoto
                      border={3}
                      size={PHOTO_SIZE}
                      alt="Foto de perfil"
                      borderColor={colors.blue[700]}
                      errorMessage={errors.avatar?.message as string}
                      source={
                        !!photo?.uri ? { uri: photo.uri } : DefaultUserPhoto
                      }
                    />
                  )}
                  <Pressable
                    h={12}
                    w={12}
                    ml={16}
                    mt={16}
                    zIndex={1}
                    bg="blue.700"
                    rounded="full"
                    position="absolute"
                    alignItems="center"
                    justifyContent="center"
                    onPress={async () => {
                      onChange(await handleUserPhotoSelect());
                    }}
                  >
                    <PencilLine color={colors.white} size={20} />
                  </Pressable>
                </VStack>
              )}
            />

            <Controller
              name="name"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Nome"
                  autoCapitalize="words"
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                />
              )}
            />
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
              name="tel"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Telefone"
                  onChangeText={onChange}
                  value={phoneMask(value)}
                  keyboardType="phone-pad"
                  errorMessage={errors.tel?.message}
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
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  isPasswordInput
                  returnKeyType="send"
                  onChangeText={onChange}
                  placeholder="Confirmar senha"
                  onSubmitEditing={handleSubmit(handleSingUp)}
                  errorMessage={errors.passwordConfirm?.message}
                />
              )}
            />
            <Button
              mt={4}
              title="Criar"
              variant="black"
              isLoading={isLoading}
              onPress={handleSubmit(handleSingUp)}
            />
          </Center>

          <Center my={8} px={8}>
            <Text>Já tem uma conta?</Text>
            <Button
              mt={4}
              title="Ir para o login"
              onPress={() => {
                navigation.navigate('signIn');
              }}
            />
          </Center>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
