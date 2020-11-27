import React, { useState, createContext } from 'react';

// Create Context Object
export const ToastContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const ToastContextProvider = (props) => {
  const [toastState, setToastState] = useState({ open: false, msg: '' });
  const { children } = props;

  return (
    <ToastContext.Provider value={[toastState, setToastState]}>
      {children}
    </ToastContext.Provider>
  );
};
