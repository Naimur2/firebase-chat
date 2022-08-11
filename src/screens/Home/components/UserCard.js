import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../../../styles';

export default function UserCard({user}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Chat', {user});
      }}>
      <View style={[styles.hstack, styles.card]}>
        <Text style={[styles.bold]}>{user.displayName}</Text>
        <Image style={[styles.avatar]} source={{uri: user.photoURL}} />
      </View>
    </TouchableOpacity>
  );
}
