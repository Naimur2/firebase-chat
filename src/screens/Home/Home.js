import database from '@react-native-firebase/database';
import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector(state => state?.auth?.user);
  React.useEffect(() => {
    const getAllUsers = async () => {
      const users = await database()
        .ref('users')
        .once('value')
        .then(snapShots => {
          console.log(snapShots.val());
        });
    };
    getAllUsers();
  }, []);

  React.useEffect(() => {
    database()
      .ref()
      .child('users')
      .orderByChild('uid')
      .equalTo(user.uid)
      .on('value', function (snapshot) {
        if (snapshot.exists()) {
          console.log('exists');
        } else {
          console.log("doesn't exist");
        }
      });
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
