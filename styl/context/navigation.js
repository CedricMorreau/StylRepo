import {createContext, useState} from 'react';

const NavigationContext = createContext();

function NavigationProvider({children}) {
  const [state, setState] = useState({
    isOpen: false,
    colorTheme: 'light',
  });

  return <NavigationContext.Provider value={[state, setState]}>{children}</NavigationContext.Provider>
}

export {NavigationContext, NavigationProvider};