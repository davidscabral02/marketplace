import { Image, IImageProps, FormControl } from 'native-base';

type Props = IImageProps & {
  size: number;
  border: number;
  errorMessage?: string | null;
};

export function UserPhoto({
  size,
  border,
  errorMessage = null,
  ...rest
}: Props) {
  const invalid = !!errorMessage;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <Image
        w={size}
        height={size}
        rounded="full"
        borderWidth={border}
        borderColor="blue.700"
        {...rest}
      />

      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
