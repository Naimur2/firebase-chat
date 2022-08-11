import database from '@react-native-firebase/database';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { usersActions } from '../../store/slices/usersSlice';

export default function Chat() {
  const getRandomUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };

  const sender = useSelector(state => state?.auth?.user);
  const messages = useSelector(state => state?.users?.messages);
  const receiver = useRoute().params?.user;
  const dispatch = useDispatch();
  const roomId = useRoute().params?.roomId || '';

  useEffect(() => {
    // get messages from chat room
    try {
      const getMessages = async () => {
        // get those messages that send by current the user
        const mszss = await database().ref('messages/').once('value');
        const mssszs = mszss.val();
        const mssszsArr = mssszs && Object.keys(mssszs).map(key => mssszs[key]);
        dispatch(usersActions.setMessages(mssszsArr || []));
      };
      getMessages();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSend = useCallback((msz = []) => {
    try {
      const messeageValue = {
        ...msz[0],
        receiver: {
          _id: receiver.uid,
          name: receiver.displayName,
          avatar: receiver.photoURL,
        },
        createdAt: new Date(),
      };

      database().ref('messages').push(messeageValue);
    } catch (error) {
      console.log('hffghgfhgf', error);
    }
  }, []);

  // get realtime updates
  useEffect(() => {
    const getMessages = async () => {
      database()
        .ref(`messages/${roomId}`)
        .on('value', snapShots => {
          const mszss = snapShots.val();
          const mssszs = mszss
            ? Object.keys(mszss).map(key => mszss[key])
            : null;
          dispatch(usersActions.setMessages(mssszs || []));
        });
    };
    getMessages();
  }, []);

  console.log(receiver);

  const message1 = messages.filter(
    m => m.user._id === sender.uid && m.receiver?._id === receiver.uid,
  );
  const message2 = messages.filter(
    m => m.user._id === receiver.uid && m.receiver?._id === sender.uid,
  );

  const messageToShow = [...message1, ...message2];
  const sortedMessage = messageToShow.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });

  return (
    <GiftedChat
      messages={sortedMessage}
      onSend={mssgs => onSend(mssgs)}
      user={{
        _id: sender.uid,
        name: sender.displayName,
        avatar: sender.photoURL,
        uid: sender.uid,
      }}
    />
  );
}
