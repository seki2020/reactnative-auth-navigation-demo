import React from 'react';
import { StyleSheet } from 'react-native';
import { CurrentUser } from '../components/CurrentUser';

import { Text, View } from '../components/Themed';
import { useAuthState } from '../context/authContext';
import { RootTabScreenProps } from '../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const loginState = useAuthState();

  return (
    <View style={styles.container}>
      <CurrentUser></CurrentUser>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
