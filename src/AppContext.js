import React, { useState, createContext } from 'react';

// Create Context Object
export const AppContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const AppContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const { children } = props;

  return (
    <AppContext.Provider value={[token, setToken]}>
      {children}
    </AppContext.Provider>
  );
};
