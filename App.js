import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';


export default function App() {
  const { container } = styles;



  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: '643433349149-imrrs14kkq1olu9qjvjcjimbnloo13cl.apps.googleusercontent.com',
    });

  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }

  };

  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    const user_sign_in = await auth().signInWithCredential(facebookCredential);

    user_sign_in.then(user => {
      console.log(user);
    })
      .catch(error => {
        console.log(error);
      }
      );
  }




  const handleGogleLogin = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    console.log(idToken);

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = await auth().signInWithCredential(googleCredential);
    user_sign_in.then(user => {
      console.log(user);
    })
      .catch(error => {
        console.log(error);
      }
      );

  }


  return (
    <View style={container}>
      <Button title="Login with google" onPress={signIn} />
      <Button
        title="Facebook Sign-In"
        onPress={onFacebookButtonPress}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});