// AuthorizationProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import clsx from "clsx";
import { createSiweMessage } from "viem/siwe";
import { GetChain } from "@/cdp/getchain";

interface AuthorizationContextProps {
  address: string | null;
  token: string | null;
  setToken: (token: string | null) => void;
  checkAuth: () => void;
  disconnect: () => void;
}

const AuthorizationContext = createContext<AuthorizationContextProps>({
  address: null,
  token: null,
  setToken: () => {},
  checkAuth: () => {},
  disconnect: () => {},
});

const AuthorizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [needLogin, setNeedLogin] = useState(false);
  const [nonce, setNonce] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const checkAuth = async () => {
    if (address && !needLogin) {
      const storedToken = localStorage.getItem(`token`);
      if (!storedToken) {
        setNeedLogin(true);
        setIsLoading(true);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/nonce/${address}`
          );
          if (!res.ok) throw new Error("Failed to retrieve nonce");

          const { data } = await res.json();
          if (data?.nonce) setNonce(data.nonce);
          else throw new Error("Nonce retrieval failed");
        } catch (error) {
          //@ts-ignore
          alert(error.message);
          disconnect();
        } finally {
          setIsLoading(false);
        }
        return;
      }

      // put token in state
      setToken(storedToken);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/test-middleware`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        if (res.ok) setToken(storedToken);
        else throw new Error("Invalid session");
      } catch (error) {
        //@ts-ignore
        alert(error.message);
        disconnect();
      }
    }
  };

  const disconnect = () => {
    if (address) localStorage.removeItem(`token`);
    setToken(null);
    setNonce(null);
    setNeedLogin(false);
    wagmiDisconnect();
  };

  const loginProcess = async () => {
    if (address && nonce) {
      setIsLoading(true);
      try {
        //try siwe
        const message = createSiweMessage({
          address: address,
          chainId: 10,
          domain: "orangtulus.com",
          nonce: nonce,
          uri: window.location.href,
          version: "1",
          issuedAt: new Date("2024-11-11T00:00:00.000Z"),
        });

        const signature = await signMessageAsync({
          message: message,
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/authenticate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address, signature }),
          }
        );
        if (res.ok) {
          const { data } = await res.json();
          setToken(data.token);
          localStorage.setItem(`token`, data.token);
          setNeedLogin(false);
        } else throw new Error("Authentication failed");
      } catch (error) {
        console.error(error);
        //@ts-ignore
        alert(error.message);
        disconnect();
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log("isConnected and address", isConnected, address);
    if (isConnected && address) checkAuth();
  }, [address, isConnected]);

  return (
    <AuthorizationContext.Provider
      value={{
        address: address ?? null,
        token,
        setToken,
        checkAuth,
        disconnect,
      }}
    >
      {needLogin ? (
        <div className="absolute z-50 w-full fixed inset-0 flex items-center justify-center bg-black backdrop-blur">
          <div className="py-10">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-lg font-semibold mb-4">
                Authentication Required
              </h2>
              <p className="mb-4">
                Please sign the message to authenticate or logout to cancel.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className={clsx(
                    "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600",
                    { "opacity-50 cursor-not-allowed": isLoading }
                  )}
                  onClick={loginProcess}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Continue Login"}
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                  onClick={disconnect}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthorizationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthorizationContext);

export { AuthorizationProvider, AuthorizationContext };
