import { createContext, useContext } from "react";

export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
