import { PropsWithChildren, useState } from "react";
import Loading from "../components/Loading";
import { LoadingContext } from "./LoadingContext";

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <Loading onComplete={() => setIsLoading(false)} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};
