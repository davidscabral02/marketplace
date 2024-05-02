import React from 'react';
import { IButtonProps, Button as NativeBaseButton, Text } from 'native-base';

type ButtonProps = IButtonProps & {
  title: string;
  variant?: 'blue' | 'gray' | 'black';
};

export const Button = ({ title, variant = 'gray', ...rest }: ButtonProps) => {
  return (
    <NativeBaseButton
      h={12}
      w="full"
      rounded="lg"
      borderColor="green.500"
      bg={
        variant === 'blue'
          ? 'blue.700'
          : variant === 'black'
          ? 'gray.100'
          : 'gray.500'
      }
      _pressed={{
        bg:
          variant === 'blue'
            ? 'blue.500'
            : variant === 'black'
            ? 'gray.200'
            : 'gray.400',
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={
          variant === 'blue' || variant === 'black' ? 'gray.700' : 'gray.200'
        }
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
};
