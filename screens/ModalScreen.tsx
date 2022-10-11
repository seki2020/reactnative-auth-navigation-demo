import { Platform, StyleSheet, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { useAuthDispatch, doLogin, useAuthState, doLogout } from '../context/authContext';
import { RootStackScreenProps } from '../types';

export default function ModalScreen({ navigation }: RootStackScreenProps<'Modal'>) {
  const dispatch = useAuthDispatch();
  const authStatus = useAuthState();
  return (
    <View style={styles.container}>
      {authStatus.status === 'resolved' ? (
        <Pressable
          style={{ marginBottom: 20 }}
          onPress={async () => {
            await doLogout(dispatch);
            navigation.goBack();
          }}
        >
          <Text style={styles.title}>Logout</Text>
        </Pressable>
      ) : (
        <Pressable
          style={{ marginBottom: 20 }}
          onPress={async () => {
            await doLogin(dispatch, { name: 'foo', email: 'foo@bar.com' });
            navigation.goBack();
          }}
        >
          <Text style={styles.title}>Login Now</Text>
        </Pressable>
      )}
      <View style={{ marginVertical: 50 }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.title}>I will login later</Text>
        </Pressable>
      </View>
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
