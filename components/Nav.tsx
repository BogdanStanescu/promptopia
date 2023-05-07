import { useState, useEffect, createContext, useContext } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";
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

