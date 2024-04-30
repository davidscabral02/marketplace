import { Box, useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRouter } from '@routes/app.routes';
import { AuthRouter } from '@routes/auth.routes';

export const Routes = () => {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[200];

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer>
        {true ? <AuthRouter /> : <AppRouter />}
      </NavigationContainer>
    </Box>
  );
};
