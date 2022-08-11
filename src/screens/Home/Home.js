import database from '@react-native-firebase/database';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { usersActions } from '../../store/slices/usersSlice';
import UserCard from './components/UserCard';

export default function Home() {
  const user = useSelector(state => state?.auth?.user);
  const users = useSelector(state => state?.users?.users);
  const dispatch = useDispatch();

  const filteredUser = users.filter(u => u.uid !== user.uid);

  React.useEffect(() => {
    const getAllUsers = async () => {
      database()
        .ref('users')
        .once('value')
        .then(snapShots => {
          const usersObj = snapShots.val();

          const usersArr = Object.keys(usersObj).map(key => usersObj[key]);
          dispatch(usersActions.setUsers(usersArr));
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
      <View>
        {filteredUser?.map((u, i) => (
          <UserCard key={i} user={u} />
        ))}
      </View>
    </View>
  );
}
