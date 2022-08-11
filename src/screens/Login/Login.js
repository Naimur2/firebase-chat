import React from 'react';
import { View } from 'react-native';
import styles from '../../../styles';
import FacebookButton from '../../components/FaceBookButton/FacebookButton';
import GoogleButton from '../../components/GoogleButton/GoogleButton';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.vstack}>
        <GoogleButton />
      </View>
      <View style={styles.vstack}>
        <FacebookButton />
      </View>
    </View>
  );
}
