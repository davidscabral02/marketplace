import { VStack } from 'native-base';

import { HomeHeader } from '@components/HomeHeader';
import { MySalesCard } from '@components/MySalesCard';

export const Home = () => {
  return (
    <VStack flex={1}>
      <HomeHeader />
      <MySalesCard />
    </VStack>
  );
};
