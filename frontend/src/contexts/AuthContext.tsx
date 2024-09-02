import React, { createContext, ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/User";
import useLocalStorage from "@/hooks/useLocalStorage";

export interface AuthContextType {
  user: User | null;
  login: (data: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useLocalStorage<string | null>("auth_token", null);  
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchUserData = async (token: string) => {
    try {
      // TODO: Replace with a real call to the backend
      const response = await new Promise<Response>((resolve) => {
        setTimeout(() => {
          resolve(
            new Response(
              JSON.stringify({
                id: '1',
                name: "Usuário fake",
                birthdate: "12/12/2000",
                email: "user@gmail.com",
              })
            )
          );
        }, 1000);
      });
  
      console.log(token);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
  
      const userData: User = (await response.json()) as User;
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  };
  
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
  
    const fetchData = async () => {
      try {
        await fetchUserData(token);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchData();
  }, [token]);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      console.log(email, password);
      const token = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(`mocked_token`);
        }, 1000);
      });
  
      setToken(token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

