import React, { createContext, useContext, useReducer } from 'react';

const getUser = (user) =>
  Promise.resolve({
    id: 2,
    name: user.name,
    email: user.email,
  });

const initialState = {
  status: 'idle',
  user: null,
  error: null,
};

const AuthStateContext = createContext(initialState);
const AuthDispatchContext = createContext((args: Partial<typeof initialState>) => {});

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) throw new Error('useAuthState must be used in AuthProvider');
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (!context) throw new Error('useAuthDispatch must be used in AuthProvider');
  return context;
};

const reducer = (currentState: typeof initialState, newState: Partial<typeof initialState>) => {
  return { ...currentState, ...newState };
};

export const AuthContextProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export async function doLogin(dispatch, user) {
  try {
    dispatch({ status: 'pending' });
    const result = await getUser(user);
    dispatch({
      status: 'resolved',
      user: result,
      error: null,
    });
  } catch (error) {
    dispatch({ status: 'rejected', error });
  }
}

export function doLogout(dispatch) {
  dispatch(initialState);
  // history.push('/');
}
