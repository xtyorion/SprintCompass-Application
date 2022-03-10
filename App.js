import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import store from './store/index';
import AppNavigator from './navigation/AppNavigator';

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </StoreProvider>
  );
}