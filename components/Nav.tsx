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

const Logo = () => {
  return (
    <Link href="/" className="flex gap-2 flex-center">
      <Image
        className="object-contain"
        src="/assets/images/logo.svg"
        alt="Promptopia Logo"
        height={30}
        width={30}
      />

      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
        Promptopia
      </p>
    </Link>
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
