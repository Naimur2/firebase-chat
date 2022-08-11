import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import Main from './src/main';
import store from './src/store';

export default function App() {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '643433349149-imrrs14kkq1olu9qjvjcjimbnloo13cl.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
