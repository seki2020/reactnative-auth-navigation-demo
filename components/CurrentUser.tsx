import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthState } from '../context/authContext';
import useColorScheme from '../hooks/useColorScheme';

export const CurrentUser = () => {
  const color = useColorScheme();
  const auth = useAuthState();
  if (auth.status !== 'resolved') {
    return <Text style={color === 'dark' ? styles.dark : styles.white}>Status: {auth.status}, No Loggedin user</Text>;
  }

  return (
    <View>
      <Text style={color === 'dark' ? styles.dark : styles.white}>userId: {auth.user.id}</Text>
      <Text style={color === 'dark' ? styles.dark : styles.white}>userName: {auth.user.name}</Text>
      <Text style={color === 'dark' ? styles.dark : styles.white}>userEmail: {auth.user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dark: {
    color: '#fff',
    fontSize: 16,
  },
  white: {
    color: '#000',
    fontSize: 16,
  },
});
