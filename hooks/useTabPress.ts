import React from 'react';
import { useAuthState } from '../context/authContext';

export const useTabPress = (navigation) => {
  const userState = useAuthState();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      if (userState.status !== 'resolved') {
        e.preventDefault();

        navigation.navigate('Modal');
        return;
      }
    });

    return unsubscribe;
  }, [navigation, userState]);

  return;
};
