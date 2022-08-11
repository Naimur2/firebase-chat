import auth from '@react-native-firebase/auth';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Auth from './routes/auth.routes';
import UserRoute from './routes/user.routes';
import {authActions} from './store/slices/authSlice';

export default function Main() {
  const authState = useSelector(state => state.auth);
  const authDispatch = useDispatch();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = React.useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      const userDetails = {
        displayName: user?.displayName,
        email: user?.email,
        emailVerified: user?.emailVerified,
        uid: user?.uid,
        photoURL: user?.photoURL,
      };

      authDispatch(authActions.login(userDetails));
    }
    if (initializing) {
      setInitializing(false);
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return authState?.isAuthenticated ? <UserRoute /> : <Auth />;
}
