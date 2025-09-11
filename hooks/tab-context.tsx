"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface TabContextType {
  mainTab: string;
  setMainTab: Dispatch<SetStateAction<string>>;
  subTab: string;
  setSubTab: Dispatch<SetStateAction<string>>;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

interface TabProviderProps {
  children: ReactNode;
}

export function TabProvider({ children }: TabProviderProps) {
  const [mainTab, setMainTab] = useState<string>("Dashboard");
  const [subTab, setSubTab] = useState<string>("");

  return (
    <TabContext.Provider value={{ mainTab, setMainTab, subTab, setSubTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
}
