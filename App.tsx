import React from 'react';
import './src/translations';

import 'react-native-gesture-handler';
import TogggleTranslatorButton from './src/components/toggleTranslatorButton';

import AuthStack from './src/navigator/authStack';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabsHome} from './src/navigator/homeStack';
import {useUserStore} from './src/zustand';

const App = () => {
  const accessToken = useUserStore(state => state.accessToken);

  return (
    <NavigationContainer>
      <TogggleTranslatorButton />
      {accessToken ? <BottomTabsHome /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
