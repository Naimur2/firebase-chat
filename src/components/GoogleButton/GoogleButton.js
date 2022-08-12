import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';
import React from 'react';
import { Button } from 'react-native';
import styles from './../../../styles/';

export default function GoogleButton() {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '643433349149-imrrs14kkq1olu9qjvjcjimbnloo13cl.apps.googleusercontent.com',
    });
  }, []);

  const googleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Get the users ID token

      const {idToken} = userInfo;

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);

      if (user?.additionalUserInfo?.isNewUser) {
        const userDetails = {
          displayName: user.user.displayName,
          email: user.user.email,
          photoURL: user.user.photoURL,
          uid: user.user.uid,
        };
        await database().ref('users').push(userDetails);
      }

      // Sign-in the user with the credential
      return user;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Login cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        alert('Google Play Services is not available or out of date');
      } else {
        // some other error happened
        alert(error.toString());
      }
    }
  };

  return (
    <Button
      style={styles.button}
      title="Login with google"
      onPress={googleSignUp}
    />
  );
}
