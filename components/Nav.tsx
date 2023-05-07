"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-between w-full mb-16 pt-3">{children}</div>;
};

const Nav = () => {
  return (
    <Container>
      <Logo />
      <DesktopNavigation />
      <MobileNavigation />
    </Container>
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

const DesktopNavigation = () => {
  const { data } = useSession();
  const providers = useInitializeProviders();

  return (
    <div className="sm:flex hidden">
      {data?.user ? (
        <div className="flex gap-3 md:gap-5">
          <Link className="black_btn" href="/create-prompt">
            Create Post
          </Link>

          <button type="button" className="outline_btn">
            Sign Out
          </button>

          <Link href="/profile">
            <Image
              className="rounded-full"
              src={data?.user.image || "/assets/images/profile.svg"}
              alt="Profile"
              height={37}
              width={37}
            />
          </Link>
        </div>
      ) : (
        <>
          {providers?.map((provider) => (
            <button
              key={provider.name}
              type="button"
              className="black_btn"
              onClick={() => signIn(provider.id)}
            >
              Sign In
            </button>
          ))}
        </>
      )}
    </div>
  );
};

const MobileNavigation = () => {
  const { data } = useSession();
  const providers = useInitializeProviders();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div className="sm:hidden flex relative">
      {data?.user ? (
        <div className="flex">
          <Image
            className="rounded-full cursor-pointer"
            src={data?.user.image || "/assets/images/profile.svg"}
            alt="Profile"
            height={37}
            width={37}
            onClick={() => setToggleDropdown(!toggleDropdown)}
          />

          {toggleDropdown && (
            <div className="dropdown">
              <Link
                href="/profile"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                My Profile
              </Link>

              <Link
                href="/create-prompt"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Create Prompt
              </Link>

              <button
                type="button"
                className="mt-5 w-full black_btn"
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        providers?.map((provider) => (
          <button
            key={provider.name}
            type="button"
            className="black_btn"
            onClick={() => signIn(provider.id)}
          >
            Sign In
          </button>
        ))
      )}
    </div>
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

export default Nav;
