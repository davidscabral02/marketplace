import { Box, useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRouter } from '@routes/app.routes';
import { AuthRouter } from '@routes/auth.routes';

import { useAuth } from '@hooks/useAuth';

export const Routes = () => {
  const { user } = useAuth();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600];

  return (
    <Box flex={1} bg="gray.100">
      <NavigationContainer>
        {user.id ? <AppRouter /> : <AuthRouter />}
      </NavigationContainer>
    </Box>
  );
};
