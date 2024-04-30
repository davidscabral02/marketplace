import { StatusBar } from 'react-native';
import { Box, NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Karla_700Bold,
  Karla_400Regular,
} from '@expo-google-fonts/karla';

import { THEME } from './src/theme';

import { Loading } from './src/components/Loading';

import { Routes } from '@routes/index';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="trasparent"
      />
      <Box flex={1}>{fontsLoaded ? <Routes /> : <Loading />}</Box>
    </NativeBaseProvider>
  );
}
