import { SafeAreaView, StatusBar } from 'react-native';
import { Box, NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Karla_700Bold,
  Karla_400Regular,
} from '@expo-google-fonts/karla';

import { THEME } from './src/theme';

import { Loading } from './src/components/Loading';

import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: THEME.colors.gray[600] }}
      >
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="trasparent"
        />
        <AuthContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
