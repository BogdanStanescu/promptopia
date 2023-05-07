import { useState, useEffect, createContext, useContext } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";

const Container = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="flex-between w-full mb-16 pt-3">{children}</div>
    </NavContext.Provider>
  );
};

const useInitializeProviders = () => {
  const [providers, setProviders] = useState<ClientSafeProvider[]>();

  useEffect(() => {
    const initializeProviders = async () => {
      const response = await getProviders();

      if (response) {
        setProviders(Object.values(response));
      }
    };

    initializeProviders();
  }, []);

  return providers;
};

type State = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const NavContext = createContext({} as State);
