import { Box, useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRouter } from '@routes/app.routes';
import { AuthRouter } from '@routes/auth.routes';

export const Routes = () => {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600];

  return (
    <Box flex={1} bg="gray.100">
      <NavigationContainer>
        {true ? <AuthRouter /> : <AppRouter />}
      </NavigationContainer>
    </Box>
  );
};
