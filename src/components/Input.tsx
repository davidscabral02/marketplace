import {
  IInputProps,
  FormControl,
  Input as NativeBaseInput,
  Pressable,
  useTheme,
} from 'native-base';
import { Eye, EyeSlash } from 'phosphor-react-native';
import { useState } from 'react';

type Props = IInputProps & {
  isPasswordInput?: boolean;
  errorMessage?: string | null;
};

export const Input = ({
  isInvalid,
  errorMessage = null,
  isPasswordInput = false,
  ...rest
}: Props) => {
  const { colors } = useTheme();

  const [isPasswordShown, setIsPasswordShown] = useState(!isPasswordInput);

  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        h={14}
        w="full"
        rounded="lg"
        bg="gray.700"
        fontSize="md"
        borderWidth={0}
        color="gray.200"
        fontFamily="body"
        isInvalid={invalid}
        placeholderTextColor="gray.400"
        secureTextEntry={!isPasswordShown}
        InputRightElement={
          isPasswordInput ? (
            <Pressable onPress={() => setIsPasswordShown(!isPasswordShown)}>
              {isPasswordShown ? (
                <EyeSlash
                  size={20}
                  color={colors.gray[300]}
                  style={{ marginRight: 12 }}
                />
              ) : (
                <Eye
                  color={colors.gray[300]}
                  size={20}
                  style={{ marginRight: 12 }}
                />
              )}
            </Pressable>
          ) : (
            <></>
          )
        }
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          borderWidth: 1,
          bgColor: 'gray.700',
          borderColor: 'gray.300',
        }}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
