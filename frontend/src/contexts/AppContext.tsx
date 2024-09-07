import { createContext, useState } from "react";

type AppContextType = {
  data: Record<string, any>[];
  setData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext({} as AppContextType);

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <AppContext.Provider value={{ data, setData, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  )
}
