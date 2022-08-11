import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Button } from 'react-native';
import styles from './../../../styles/';
import database from '@react-native-firebase/database';


export default function GoogleButton() {
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
        alert('Something went wrong');
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
