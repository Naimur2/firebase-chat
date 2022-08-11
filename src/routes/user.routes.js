import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../../styles';
import Home from '../screens/Home/Home';
import Chat from './../screens/Chat/Chat';
import auth from '@react-native-firebase/auth';
import {authActions} from '../store/slices/authSlice';

const Stack = createNativeStackNavigator();

export default function UserRoute() {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.user);

  const logOut = () => {
    auth().signOut();
    dispatch(authActions.logOut());
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <Text onPress={logOut} style={[styles.bold]}>
            Log Out
          </Text>
        ),
        headerTitle: () => (
          <Text onPress={logOut} style={[styles.bold]}>
            {user?.displayName?.split(' ')[0]}
          </Text>
        ),
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}
