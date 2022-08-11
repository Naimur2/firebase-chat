import auth from '@react-native-firebase/auth';
import React from 'react';
import {Button} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import styles from '../../../styles';
import database from '@react-native-firebase/database';

export default function FacebookButton() {
  const facebookSignUp = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      alert('Login cancelled');
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    const user = auth().signInWithCredential(facebookCredential);
    if (user.additionalUserInfo.isNewUser) {
      const userDetails = {
        displayName: user.user.displayName,
        email: user.user.email,
        photoURL: user.user.photoURL,
        uid: user.user.uid,
      };
      await database().ref('users').push(userDetails);
    }
    return user;
  };

  return (
    <Button
      style={styles.button}
      title="Facebook Sign-In"
      onPress={facebookSignUp}
    />
  );
}
